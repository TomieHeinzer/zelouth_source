"use client";

import { useEffect, useMemo, useState } from "react";
import { roles, teams, type Role } from "@/lib/content";

const STORAGE_KEY = "zelouth-career-applications";

type Application = {
  roleId: string;
  role: string;
  name: string;
  email: string;
  place: string;
  note: string;
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

  const visible = useMemo(
    () => roles.filter((role) => team === "All" || role.team === team),
    [team],
  );

  const active: Role = visible.find((role) => role.id === roleId) ?? visible[0] ?? roles[0];

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setReady(true);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Application;
      if (parsed?.roleId && parsed?.email) {
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
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  function selectTeam(next: (typeof teams)[number]) {
    setTeam(next);
    const nextRoles = roles.filter((role) => next === "All" || role.team === next);
    if (!nextRoles.some((role) => role.id === roleId) && nextRoles[0]) {
      setRoleId(nextRoles[0].id);
    }
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) nextErrors.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Add a real email.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const application: Application = {
      roleId: active.id,
      role: active.title,
      name: name.trim(),
      email: email.trim(),
      place: place.trim(),
      note: note.trim(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(application));
    setSaved(application);
  }

  function clearApplication() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
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
              <h3 className="font-display text-lg font-medium">Note saved on this browser</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                {saved.name} · {saved.email}
                {saved.place ? ` · ${saved.place}` : ""}. Saved for {saved.role}. Nothing was sent to a server.
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
                Tell us who you are. The note stays in this browser.
                {saved ? ` You already applied for ${saved.role}. Submitting here replaces that note.` : ""}
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

              <button
                type="submit"
                className="mt-5 rounded-md border border-ink bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-accent"
              >
                Save application
              </button>
            </form>
        </div>
      </article>
    </div>
  );
}
