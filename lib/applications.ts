import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { roles } from "@/lib/content";
import { companyInbox } from "@/lib/inbox";

export type StoredApplication = {
  id: string;
  savedAt: string;
  roleId: string;
  role: string;
  team: string;
  name: string;
  email: string;
  place: string;
  note: string;
  file: string;
  emailed: boolean;
  inbox: string;
  emailError: string;
};

const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DIRECTORIES = [
  path.join(process.cwd(), "data", "applications"),
  path.join("/tmp", "zelouth-applications"),
];

export class ApplicationInputError extends Error {}

let writableDirectory: string | null = null;

function assertId(id: string) {
  if (!ID_PATTERN.test(id)) throw new ApplicationInputError("That application could not be found.");
}

function fileIn(directory: string, id: string) {
  const file = path.join(directory, `${id}.json`);
  if (!file.startsWith(directory + path.sep)) throw new ApplicationInputError("That application could not be found.");
  return file;
}

function labelFor(directory: string, id: string) {
  if (directory.startsWith("/tmp")) return `tmp/zelouth-applications/${id}.json`;
  return `data/applications/${id}.json`;
}

async function directoryForWrite() {
  if (writableDirectory) return writableDirectory;
  let lastError: unknown;
  for (const directory of DIRECTORIES) {
    try {
      await mkdir(directory, { recursive: true });
      const probe = path.join(directory, ".write-probe");
      await writeFile(probe, "ok");
      await unlink(probe);
      writableDirectory = directory;
      return directory;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("No writable folder for applications.");
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseApplication(
  body: unknown,
  existingId?: string,
): Omit<StoredApplication, "savedAt" | "file" | "emailed" | "inbox" | "emailError"> {
  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const roleId = clean(input.roleId, 80);
  const role = roles.find((item) => item.id === roleId);
  if (!role) throw new ApplicationInputError("Choose an open role.");

  const name = clean(input.name, 120);
  const email = clean(input.email, 200);
  const place = clean(input.place, 120);
  const note = clean(input.note, 4000);

  if (name.length < 2) throw new ApplicationInputError("Add your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ApplicationInputError("Add a real email.");

  const requestedId = clean(existingId ?? input.id, 80);
  const id = ID_PATTERN.test(requestedId) ? requestedId : randomUUID();

  return {
    id,
    roleId: role.id,
    role: role.title,
    team: role.team,
    name,
    email,
    place,
    note,
  };
}

export async function readApplication(id: string): Promise<StoredApplication | null> {
  assertId(id);
  for (const directory of DIRECTORIES) {
    try {
      const raw = await readFile(fileIn(directory, id), "utf8");
      const parsed = JSON.parse(raw) as StoredApplication;
      if (!parsed || parsed.id !== id || !parsed.email) return null;
      return { ...parsed, file: labelFor(directory, id) };
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      if (code === "ENOENT" || code === "ENOTDIR") continue;
      if (error instanceof ApplicationInputError) throw error;
    }
  }
  return null;
}

export async function saveApplication(body: unknown): Promise<StoredApplication> {
  const draft = parseApplication(body);
  const directory = await directoryForWrite();
  const record: StoredApplication = {
    ...draft,
    savedAt: new Date().toISOString(),
    file: labelFor(directory, draft.id),
    emailed: false,
    inbox: companyInbox,
    emailError: "",
  };
  await writeRecord(record);
  return record;
}

export async function recordDelivery(
  id: string,
  delivery: Pick<StoredApplication, "emailed" | "inbox" | "emailError">,
): Promise<StoredApplication> {
  const current = await readApplication(id);
  if (!current) throw new ApplicationInputError("That application could not be found.");
  const next: StoredApplication = { ...current, ...delivery };
  await writeRecord(next);
  return next;
}

async function writeRecord(record: StoredApplication) {
  const directory = await directoryForWrite();
  record.file = labelFor(directory, record.id);
  await mkdir(directory, { recursive: true });
  await writeFile(fileIn(directory, record.id), `${JSON.stringify(record, null, 2)}\n`, "utf8");
}

export async function deleteApplication(id: string) {
  assertId(id);
  for (const directory of DIRECTORIES) {
    try {
      await unlink(fileIn(directory, id));
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      if (code === "ENOENT" || code === "ENOTDIR") continue;
      if (error instanceof ApplicationInputError) throw error;
    }
  }
}
