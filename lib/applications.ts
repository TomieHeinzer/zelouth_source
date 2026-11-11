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

const DIRECTORY = path.join(process.cwd(), "data", "applications");
const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ApplicationInputError extends Error {}

function relativeFile(id: string) {
  return `data/applications/${id}.json`;
}

function absoluteFile(id: string) {
  if (!ID_PATTERN.test(id)) throw new ApplicationInputError("That application could not be found.");
  const file = path.join(DIRECTORY, `${id}.json`);
  if (!file.startsWith(DIRECTORY + path.sep)) throw new ApplicationInputError("That application could not be found.");
  return file;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseApplication(body: unknown, existingId?: string): Omit<StoredApplication, "savedAt" | "file"> {
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
  try {
    const raw = await readFile(absoluteFile(id), "utf8");
    const parsed = JSON.parse(raw) as StoredApplication;
    if (!parsed || parsed.id !== id || !parsed.email) return null;
    return { ...parsed, file: relativeFile(id) };
  } catch (error) {
    if (error instanceof ApplicationInputError) throw error;
    return null;
  }
}

export async function saveApplication(body: unknown): Promise<StoredApplication> {
  const draft = parseApplication(body);
  const record: StoredApplication = {
    ...draft,
    savedAt: new Date().toISOString(),
    file: relativeFile(draft.id),
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
  const next: StoredApplication = { ...current, ...delivery, file: relativeFile(id) };
  await writeRecord(next);
  return next;
}

async function writeRecord(record: StoredApplication) {
  await mkdir(DIRECTORY, { recursive: true });
  await writeFile(absoluteFile(record.id), `${JSON.stringify(record, null, 2)}\n`, "utf8");
}

export async function deleteApplication(id: string) {
  try {
    await unlink(absoluteFile(id));
  } catch (error) {
    if (error instanceof ApplicationInputError) throw error;
  }
}
