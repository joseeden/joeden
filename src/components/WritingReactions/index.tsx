import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./styles.module.scss";

const reactions = [
  { id: "like", label: "Like", icon: "👍" },
  { id: "celebrate", label: "Celebrate", icon: "🎉" },
  { id: "hype", label: "Hype", icon: "🔥" },
  { id: "love", label: "Love", icon: "♥" },
  { id: "applaud", label: "Applaud", icon: "👏" },
  { id: "admire", label: "Admire", icon: "★" },
  { id: "boost", label: "Boost", icon: "🚀" },
  { id: "smile", label: "Smile", icon: "☺" },
] as const;
type Kind = (typeof reactions)[number]["id"];
type Snapshot = { counts: Record<Kind, number>; selected: Kind[] };
const visitorKey = "joeden.reactions.visitor.v1";
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let sessionVisitor: string | undefined;

function visitor(): { id: string; temporary: boolean } {
  try {
    const saved = localStorage.getItem(visitorKey);
    if (saved && uuidPattern.test(saved))
      return { id: saved, temporary: false };
    const id = sessionVisitor ?? crypto.randomUUID();
    localStorage.setItem(visitorKey, id);
    return { id, temporary: false };
  } catch {
    sessionVisitor ??= crypto.randomUUID();
    return { id: sessionVisitor, temporary: true };
  }
}

function parseSnapshot(value: unknown, postId: string): Snapshot {
  const data = value as Snapshot & { postId: string };
  if (
    !data ||
    data.postId !== postId ||
    !Array.isArray(data.selected) ||
    data.selected.some((id) => !reactions.some((item) => item.id === id)) ||
    reactions.some(
      ({ id }) =>
        !Number.isSafeInteger(data.counts?.[id]) || data.counts[id] < 0,
    )
  ) {
    throw new Error("Unexpected reaction response");
  }
  return data;
}

export default function WritingReactions({
  postId,
  apiUrl,
}: {
  postId: string;
  apiUrl: string;
}) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const [temporary, setTemporary] = useState(false);
  const [retryAt, setRetryAt] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const visitorId = useRef("");
  const request = useRef<AbortController | null>(null);
  const locked = useRef(false);
  const mounted = useRef(false);
  const statusId = useId();

  async function sync(method: "GET" | "PUT" | "DELETE" = "GET", kind?: Kind) {
    if (locked.current || !visitorId.current || Date.now() < retryAt) return;
    locked.current = true;
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    setBusy(true);
    setError("");
    try {
      const url = new URL("/reactions", apiUrl);
      url.searchParams.set("postId", postId);
      const headers: Record<string, string> = {
        "X-Visitor-Id": visitorId.current,
      };
      if (method !== "GET") headers["Content-Type"] = "application/json";
      const response = await fetch(url, {
        method,
        headers,
        credentials: "omit",
        signal: controller.signal,
        body: method === "GET" ? undefined : JSON.stringify({ reaction: kind }),
      });
      if (!mounted.current || request.current !== controller) return;
      if (response.status === 404) {
        setUnavailable(true);
        return;
      }
      if (response.status === 429) {
        const seconds = Number(response.headers.get("Retry-After"));
        setRetryAt(
          Date.now() +
            (Number.isFinite(seconds) && seconds > 0 ? seconds : 60) * 1000,
        );
        throw new Error("rate-limit");
      }
      if (!response.ok) throw new Error("request-failed");
      const next = parseSnapshot(await response.json(), postId);
      if (!mounted.current || request.current !== controller) return;
      setSnapshot(next);
      setAnnouncement(method === "GET" ? "" : "Reaction saved.");
    } catch (failure) {
      if (!mounted.current || request.current !== controller) return;
      setError(
        failure instanceof Error && failure.message === "rate-limit"
          ? "Too many requests. Please wait before trying again."
          : "Could not confirm your reactions. Retry to reload the saved counts.",
      );
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) {
        locked.current = false;
        if (mounted.current) setBusy(false);
      }
    }
  }

  useEffect(() => {
    mounted.current = true;
    try {
      const identity = visitor();
      visitorId.current = identity.id;
      setTemporary(identity.temporary);
      void sync();
    } catch {
      setError("Your browser cannot initialize anonymous reactions.");
      setBusy(false);
    }
    return () => {
      mounted.current = false;
      request.current?.abort();
      request.current = null;
      locked.current = false;
    };
  }, [postId, apiUrl]);

  useEffect(() => {
    if (!retryAt) return;
    const timer = window.setTimeout(
      () => setRetryAt(0),
      Math.max(0, retryAt - Date.now()),
    );
    return () => window.clearTimeout(timer);
  }, [retryAt]);

  if (unavailable) return null;
  const disabled = busy || !!error || !!retryAt || !snapshot;
  const toggle = (kind: Kind) => {
    if (disabled) return;
    void sync(snapshot?.selected.includes(kind) ? "DELETE" : "PUT", kind);
  };

  return (
    <section
      className={styles.reactions}
      aria-label="Reactions"
      aria-describedby={statusId}
    >
      <div className={styles.row} aria-busy={busy}>
        {reactions.map((item) => {
          const selected = snapshot?.selected.includes(item.id) ?? false;
          return (
            <button
              key={item.id}
              className={styles.pill}
              type="button"
              aria-pressed={selected}
              aria-label={`${selected ? "Remove" : "Add"} ${item.label.toLowerCase()}`}
              title={item.label}
              disabled={disabled}
              onClick={() => toggle(item.id)}
            >
              <span aria-hidden="true" className={styles.icon}>
                {item.icon}
              </span>
              <span className={styles.count}>
                {snapshot ? snapshot.counts[item.id] : "\u2013"}
              </span>
            </button>
          );
        })}
      </div>
      <div id={statusId} className={styles.status} role="status">
        {busy && !snapshot ? "Loading reactions…" : error || announcement}
      </div>
      {error && visitorId.current && (
        <button
          type="button"
          className={styles.retry}
          disabled={busy || !!retryAt}
          onClick={() => void sync()}
        >
          Retry
        </button>
      )}
      {temporary && (
        <p className={styles.status}>
          Selections are remembered only for this session.
        </p>
      )}
    </section>
  );
}
