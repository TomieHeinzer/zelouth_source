import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { BlobNotFoundError, del, get, put } from "@vercel/blob";
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
  resumeName: string;
  resumeType: string;
  resumeFile: string;
  emailed: boolean;
  inbox: string;
  emailError: string;
};

export type ResumeUpload = {
  name: string;
  type: string;
  bytes: Buffer;
};

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const RESUME_TYPES = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DIRECTORIES = process.env.VERCEL
  ? [path.join("/tmp", "zelouth-applications")]
  : [path.join(process.cwd(), "data", "applications"), path.join("/tmp", "zelouth-applications")];

function blobReady() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function blobPath(id: string) {
  return `applications/${id}.json`;
}

function resumeExtension(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".docx")) return ".docx" as const;
  if (lower.endsWith(".doc")) return ".doc" as const;
  if (lower.endsWith(".pdf")) return ".pdf" as const;
  return "";
}

function looksLikeResume(ext: ".pdf" | ".doc" | ".docx", bytes: Buffer) {
  if (ext === ".pdf") return bytes.subarray(0, 4).toString("latin1") === "%PDF";
  if (ext === ".doc") return bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  return bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
}

export function validateResume(name: string, bytes: Buffer): ResumeUpload {
  const ext = resumeExtension(name);
  if (!ext) throw new ApplicationInputError("Use a PDF, DOC, or DOCX file.");
  if (bytes.length === 0) throw new ApplicationInputError("That document is empty.");
  if (bytes.length > MAX_RESUME_BYTES) throw new ApplicationInputError("The document must be 4 MB or smaller.");
  if (!looksLikeResume(ext, bytes)) throw new ApplicationInputError("That file is not a valid PDF or Word document.");
  const base = path.basename(name).replace(/[^\w.\- ()]+/g, "").slice(0, 80);
  return { name: base.toLowerCase().endsWith(ext) ? base : `resume${ext}`, type: RESUME_TYPES[ext], bytes };
}

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
): Omit<StoredApplication, "savedAt" | "file" | "resumeName" | "resumeType" | "resumeFile" | "emailed" | "inbox" | "emailError"> {
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

async function readBlob(id: string): Promise<StoredApplication | null> {
  try {
    const result = await get(blobPath(id), { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const parsed = JSON.parse(await new Response(result.stream).text()) as StoredApplication;
    if (!parsed || parsed.id !== id || !parsed.email) return null;
    return withResumeDefaults({ ...parsed, file: blobPath(id) });
  } catch (error) {
    if (error instanceof BlobNotFoundError) return null;
    throw error;
  }
}

async function writeBlob(record: StoredApplication) {
  record.file = blobPath(record.id);
  await put(blobPath(record.id), `${JSON.stringify(record, null, 2)}\n`, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function readApplication(id: string): Promise<StoredApplication | null> {
  assertId(id);
  if (blobReady()) return readBlob(id);
  for (const directory of DIRECTORIES) {
    try {
      const raw = await readFile(fileIn(directory, id), "utf8");
      const parsed = JSON.parse(raw) as StoredApplication;
      if (!parsed || parsed.id !== id || !parsed.email) return null;
      return withResumeDefaults({ ...parsed, file: labelFor(directory, id) });
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      if (code === "ENOENT" || code === "ENOTDIR") continue;
      if (error instanceof ApplicationInputError) throw error;
    }
  }
  return null;
}

function withResumeDefaults(record: StoredApplication): StoredApplication {
  return {
    ...record,
    resumeName: record.resumeName ?? "",
    resumeType: record.resumeType ?? "",
    resumeFile: record.resumeFile ?? "",
  };
}

function resumeBlobPath(id: string, ext: string) {
  return `applications/${id}${ext}`;
}

async function removeOtherResumes(id: string, keep: string) {
  for (const ext of Object.keys(RESUME_TYPES)) {
    if (ext === keep) continue;
    if (blobReady()) {
      try {
        await del(resumeBlobPath(id, ext));
      } catch (error) {
        if (!(error instanceof BlobNotFoundError)) throw error;
      }
      continue;
    }
    for (const directory of DIRECTORIES) {
      try {
        await unlink(path.join(directory, `${id}${ext}`));
      } catch (error) {
        const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
        if (code === "ENOENT" || code === "ENOTDIR") continue;
      }
    }
  }
}

async function writeResume(id: string, resume: ResumeUpload) {
  const ext = resumeExtension(resume.name);
  if (blobReady()) {
    const pathname = resumeBlobPath(id, ext);
    await put(pathname, resume.bytes, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: resume.type,
    });
    await removeOtherResumes(id, ext);
    return pathname;
  }
  const directory = await directoryForWrite();
  const target = path.join(directory, `${id}${ext}`);
  if (!target.startsWith(directory + path.sep)) throw new ApplicationInputError("That document could not be saved.");
  await mkdir(directory, { recursive: true });
  await writeFile(target, resume.bytes);
  await removeOtherResumes(id, ext);
  const folder = directory.startsWith("/tmp") ? "tmp/zelouth-applications" : "data/applications";
  return `${folder}/${id}${ext}`;
}

export async function readResume(record: StoredApplication) {
  if (!record.resumeFile || !record.resumeName) return null;
  if (blobReady()) {
    const result = await get(record.resumeFile, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    return {
      filename: record.resumeName,
      contentType: record.resumeType || "application/octet-stream",
      content: Buffer.from(await new Response(result.stream).arrayBuffer()),
    };
  }
  const ext = resumeExtension(record.resumeFile);
  for (const directory of DIRECTORIES) {
    try {
      const content = await readFile(path.join(directory, `${record.id}${ext}`));
      return { filename: record.resumeName, contentType: record.resumeType || "application/octet-stream", content };
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      if (code === "ENOENT" || code === "ENOTDIR") continue;
    }
  }
  return null;
}

export async function saveApplication(body: unknown, resume?: ResumeUpload | null): Promise<StoredApplication> {
  const draft = parseApplication(body);
  const existing = await readApplication(draft.id);
  if (!resume && !existing?.resumeName) throw new ApplicationInputError("Add a PDF or Word document.");
  const record: StoredApplication = {
    ...draft,
    savedAt: new Date().toISOString(),
    file: blobReady() ? blobPath(draft.id) : "",
    resumeName: resume?.name || existing?.resumeName || "",
    resumeType: resume?.type || existing?.resumeType || "",
    resumeFile: existing?.resumeFile || "",
    emailed: false,
    inbox: companyInbox,
    emailError: "",
  };
  if (resume) record.resumeFile = await writeResume(draft.id, resume);
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
  if (blobReady()) {
    await writeBlob(record);
    return;
  }
  const directory = await directoryForWrite();
  record.file = labelFor(directory, record.id);
  await mkdir(directory, { recursive: true });
  await writeFile(fileIn(directory, record.id), `${JSON.stringify(record, null, 2)}\n`, "utf8");
}

export async function deleteApplication(id: string) {
  assertId(id);
  if (blobReady()) {
    try {
      await del(blobPath(id));
    } catch (error) {
      if (!(error instanceof BlobNotFoundError)) throw error;
    }
    await removeOtherResumes(id, "");
    return;
  }
  for (const directory of DIRECTORIES) {
    try {
      await unlink(fileIn(directory, id));
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      if (code === "ENOENT" || code === "ENOTDIR") continue;
      if (error instanceof ApplicationInputError) throw error;
    }
  }
  await removeOtherResumes(id, "");
}
