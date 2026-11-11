"use client";

import { useEffect, useMemo, useState } from "react";
import { roles, teams, type Role } from "@/lib/content";
import { companyInbox } from "@/lib/inbox";

const STORAGE_KEY = "zelouth-career-applications";

type Application = {
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
  emailed?: boolean;
  inbox?: string;
  emailError?: string;
};

const fieldClass =
  "mt-1 w-full rounded-md border border-ink/20 bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent";

export function CareersBoard() {
  const [team, setTeam] = useState<(typeof teams)[number]>("All");
  const [roleId, setRoleId] = useState(roles[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Application | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const visible = useMemo(
    () => roles.filter((role) => team === "All" || role.team === team),
    [team],
  );

  const active: Role = visible.find((role) => role.id === roleId) ?? visible[0] ?? roles[0];

  useEffect(() => {
    const id = window.localStorage.getItem(STORAGE_KEY);
    if (!id || id.startsWith("{")) {
      if (id) window.localStorage.removeItem(STORAGE_KEY);
      setReady(true);
      return;
    }

    let cancelled = false;
    fetch(`/api/applications?id=${encodeURIComponent(id)}`)
      .then(async (response) => {
        if (!response.ok) {
          window.localStorage.removeItem(STORAGE_KEY);
          return;
        }
        const parsed = (await response.json()) as Application;
        if (cancelled || !parsed?.roleId || !parsed?.email) return;
        setSaved(parsed);
        const role = roles.find((item) => item.id === parsed.roleId);
        if (role) {
          setTeam(role.team);
          setRoleId(role.id);
        }
        setName(parsed.name ?? "");
        setEmail(parsed.email ?? "");
        setPlace(parsed.place ?? "");
        setNote(parsed.note ?? "");
      })
      .catch(() => {
        if (!cancelled) setSaveError("The saved application could not be loaded from the server.");
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function selectTeam(next: (typeof teams)[number]) {
    setTeam(next);
    const nextRoles = roles.filter((role) => next === "All" || role.team === next);
    if (!nextRoles.some((role) => role.id === roleId) && nextRoles[0]) {
      setRoleId(nextRoles[0].id);
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) nextErrors.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Add a real email.";
    setErrors(nextErrors);
    setSaveError("");
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: saved?.id,
          roleId: active.id,
          name,
          email,
          place,
          note,
        }),
      });
      const body = (await response.json()) as Application & { error?: string };
      if (!response.ok || !body.id) {
        setSaveError(body.error || "Could not save the application.");
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, body.id);
      setSaved(body);
      setName(body.name);
      setEmail(body.email);
      setPlace(body.place);
      setNote(body.note);
    } catch {
      setSaveError("Could not reach the server. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function clearApplication() {
    const id = saved?.id;
    setSaveError("");
    if (id) {
      try {
        await fetch(`/api/applications?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      } catch {
        setSaveError("Could not remove the saved file. Try again.");
        return;
      }
    }
    window.localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setName("");
    setEmail("");
    setPlace("");
    setNote("");
  }

  if (!ready) {
    return <p className="px-6 py-16 text-sm text-neutral-600">Loading applications…</p>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div>
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Teams">
          {teams.map((item) => {
            const selected = item === team;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => selectTeam(item)}
                className={`border px-4 py-2 text-sm transition ${
                  selected ? "border-ink bg-ink text-cream" : "border-ink/15 bg-cream hover:border-accent"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="rounded-lg border border-ink/10 bg-cream px-5 py-8 text-sm">No open roles on this team right now.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {visible.map((role) => {
              const selected = role.id === active.id;
              return (
                <li key={role.id}>
                  <button
                    type="button"
                    onClick={() => setRoleId(role.id)}
                    className={`w-full border px-5 py-4 text-left transition ${
                      selected ? "border-accent bg-cream" : "border-transparent bg-cream/70 hover:border-accent/40"
                    }`}
                  >
                    <span className="block font-display text-lg font-medium tracking-tight">{role.title}</span>
                    <span className="mt-1 block text-sm text-neutral-600">
                      {role.team} · {role.location} · {role.type}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <article className="rounded-lg border border-ink/10 bg-cream p-6 md:p-8">
        <p className="text-sm font-medium text-neutral-500">{active.team}</p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">{active.title}</h2>
        <p className="mt-2 text-sm text-neutral-600">
          {active.location} · {active.type}
        </p>
        <p className="mt-4 font-medium">{active.summary}</p>
        <p className="mt-3 text-sm leading-6 text-neutral-700">{active.about}</p>
        <h3 className="mt-6 text-sm font-semibold">The work</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
          {active.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="mt-8 border-t border-ink/10 pt-6">
          {saved ? (
            <div className="mb-6 rounded-lg border border-ink/10 bg-sand p-4" role="status">
              <h3 className="font-display text-lg font-medium">Application saved on the server</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                {saved.name} · {saved.email}
                {saved.place ? ` · ${saved.place}` : ""}. Saved for {saved.role}.
              </p>
              <p className="mt-2 text-sm text-neutral-600">File: {saved.file}</p>
              <p className="mt-2 text-sm text-neutral-700">
                {saved.emailed
                  ? `Sent to ${saved.inbox || companyInbox}.`
                  : saved.emailError || `Not sent to ${companyInbox} yet.`}
              </p>
              {saved.note ? <p className="mt-3 text-sm text-neutral-600">{saved.note}</p> : null}
              <button
                type="button"
                onClick={clearApplication}
                className="mt-4 rounded-md border border-ink px-4 py-2 text-sm font-semibold hover:border-transparent hover:bg-accent hover:text-cream"
              >
                Clear this note
              </button>
            </div>
          ) : null}
          <form onSubmit={submit} noValidate>
              <h3 className="font-display text-xl font-medium">Apply for {active.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Tell us who you are. Save application stores your role, name, email, city, and note, then emails that file to {companyInbox}.
                {saved ? ` You already applied for ${saved.role}. Saving again updates that file.` : ""}
              </p>
              <label className="mt-4 block text-sm font-medium" htmlFor="applicant-name">
                Name
              </label>
              <input
                id="applicant-name"
                className={fieldClass}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "applicant-name-error" : undefined}
              />
              {errors.name ? (
                <p id="applicant-name-error" className="mt-1 text-xs text-red-700">
                  {errors.name}
                </p>
              ) : null}

              <label className="mt-4 block text-sm font-medium" htmlFor="applicant-email">
                Email
              </label>
              <input
                id="applicant-email"
                className={fieldClass}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                inputMode="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "applicant-email-error" : undefined}
              />
              {errors.email ? (
                <p id="applicant-email-error" className="mt-1 text-xs text-red-700">
                  {errors.email}
                </p>
              ) : null}

              <label className="mt-4 block text-sm font-medium" htmlFor="applicant-place">
                City <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <input
                id="applicant-place"
                className={fieldClass}
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                placeholder="Where you work from"
              />

              <label className="mt-4 block text-sm font-medium" htmlFor="applicant-note">
                Note <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <textarea
                id="applicant-note"
                className={`${fieldClass} min-h-28`}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="A contract, a model, or a product you have shipped"
              />

              {saveError ? (
                <p className="mt-4 text-sm text-red-700" role="alert">
                  {saveError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={saving}
                className="mt-5 rounded-md border border-ink bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-accent disabled:cursor-wait disabled:opacity-70"
              >
                {saving ? "Saving…" : "Save application"}
              </button>
            </form>
        </div>
      </article>
    </div>
  );
}
