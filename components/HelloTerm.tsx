"use client";

import { useEffect, useId, useRef, useState } from "react";

/** One line in the terminal. "cmd" is what was typed; the rest is what came back. */
type Line = { id: number; k: "cmd" | "out" | "dim" | "a"; t: string; href?: string; download?: boolean; close?: boolean; i: number };

export interface TermWords {
  open: string; title: string; input: string; close: string; hello: string; help: string[]; whoami: string[]; resume: string;
  pages: string; hire: string[]; hireCard: string; noSudo: string; coffee: string; sleep: string; rmrf: string; vim: string; notFound: string;
}

/**
 * Round 3b, X2: "> hello_world_" in the hero is a button. Click it (or focus it and start typing) and a small terminal
 * opens over the hero, so nothing on the page moves. Everything it prints is real: his name and years, the eleven apps,
 * the resume PDFs, his email. Esc, "exit", the close button or a click elsewhere closes it; focus goes back to the button.
 * Under Reduce motion the replies appear at once instead of typing out.
 */
export function HelloTerm({ w, years, apps, cvs, email }: { w: TermWords; years: number; apps: { name: string; job: string }[]; cvs: { label: string; pdf: string; pages: number }[]; email: string }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [val, setVal] = useState("");
  const seq = useRef(0);
  const hist = useRef<string[]>([]);
  const at = useRef(-1);
  const btn = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const out = (rows: Omit<Line, "id" | "i">[]) => rows.map((r, i) => ({ ...r, id: ++seq.current, i }));
  const show = (first = "") => {
    setOpen(true);
    setVal(first);
    setLines((l) => (l.length ? l : out([{ k: "dim", t: w.hello }])));
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) btn.current?.focus();
  };

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [lines]);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!box.current?.contains(t) && !btn.current?.contains(t)) close(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const reply = (c: string): Omit<Line, "id" | "i">[] | "clear" | "exit" => {
    const s = c.toLowerCase();
    if (s === "help") return w.help.map((t) => ({ k: "out", t }));
    if (s === "whoami") return w.whoami.map((t, i) => ({ k: i ? "out" : "a", t: t.replace("{y}", String(years)).replace("{n}", String(apps.length)), href: i ? undefined : "#about", close: true }));
    if (s === "ls apps" || s === "ls" || s === "ls ~/vtx") {
      const pad = Math.max(...apps.map((a) => a.name.length)) + 3;
      return apps.map((a) => ({ k: "out", t: `${a.name.toLowerCase()}/`.padEnd(pad) + a.job }));
    }
    if (s === "cat resume" || s === "cat resume.pdf" || s === "resume") return [{ k: "dim", t: w.resume }, ...cvs.map((cv) => ({ k: "a" as const, t: `${cv.label} · ${cv.pages} ${w.pages}`, href: encodeURI(cv.pdf), download: true }))];
    if (s === "sudo hire-me" || s === "sudo hire me") return [...w.hire.map((t) => ({ k: "out" as const, t })), { k: "a", t: email, href: `mailto:${email}` }, { k: "a", t: `→ ${w.hireCard}`, href: "#hire", close: true }];
    if (s === "hire-me" || s === "hire me") return [{ k: "out", t: w.noSudo }];
    if (s === "clear" || s === "cls") return "clear";
    if (s === "exit" || s === "quit" || s === ":q" || s === ":wq") return "exit";
    if (s === "coffee" || s === "brew coffee") return [{ k: "out", t: w.coffee }];
    if (s === "sleep") return [{ k: "out", t: w.sleep }];
    if (/^(sudo )?rm -rf/.test(s)) return [{ k: "out", t: w.rmrf }];
    if (s === "vim" || s === "vi" || s === "nano" || s === "emacs") return [{ k: "out", t: w.vim }];
    return [{ k: "out", t: w.notFound.replace("{c}", c.split(" ")[0]) }];
  };

  const run = (raw: string) => {
    const c = raw.trim().replace(/\s+/g, " ");
    setVal("");
    at.current = -1;
    if (!c) return setLines((l) => [...l, ...out([{ k: "cmd", t: "" }])]);
    hist.current = [c, ...hist.current.filter((h) => h !== c)].slice(0, 20);
    const r = reply(c);
    if (r === "exit") return close();
    if (r === "clear") return setLines([]);
    setLines((l) => [...l, ...out([{ k: "cmd", t: c }]), ...out(r)].slice(-80));
  };

  return (
    <div className="o-hello o-rise" style={{ "--d": "0s" } as React.CSSProperties}>
      <button
        ref={btn}
        type="button"
        className="o-hello-btn"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => (open ? close() : show())}
        onKeyDown={(e) => {
          if (!open && e.key.length === 1 && e.key !== " " && !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            show(e.key);
          }
        }}
      >
        {"> "}
        <span className="typ">hello_world</span>
        <span className="car" aria-hidden="true">
          _
        </span>
        <span className="sr"> · {w.open}</span>
      </button>
      {open && (
        <div
          ref={box}
          id={id}
          className="hterm"
          role="dialog"
          aria-label={w.title}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              close();
            }
          }}
        >
          <div className="hterm-bar">
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <span>guest@tanawat.dev: ~</span>
            <button type="button" className="hterm-x" aria-label={w.close} onClick={() => close()}>
              ×
            </button>
          </div>
          <div className="hterm-log" ref={log} role="log" aria-live="polite">
            {lines.map((l) =>
              l.k === "cmd" ? (
                <p key={l.id} className="tl tl-cmd">
                  <span aria-hidden="true">$ </span>
                  {l.t}
                </p>
              ) : l.k === "a" ? (
                <p key={l.id} className="tl tl-a" style={{ "--i": l.i } as React.CSSProperties}>
                  <a href={l.href} download={l.download || undefined} onClick={l.close ? () => close(false) : undefined}>
                    {l.t}
                  </a>
                </p>
              ) : (
                <p key={l.id} className={`tl tl-${l.k}`} style={{ "--i": l.i } as React.CSSProperties}>
                  {l.t}
                </p>
              ),
            )}
          </div>
          <form
            className="hterm-in"
            onSubmit={(e) => {
              e.preventDefault();
              run(val);
            }}
          >
            <span aria-hidden="true">$</span>
            <input
              ref={input}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => {
                const h = hist.current;
                if (e.key === "ArrowUp" && h.length) {
                  e.preventDefault();
                  at.current = Math.min(at.current + 1, h.length - 1);
                  setVal(h[at.current]);
                } else if (e.key === "ArrowDown" && at.current >= 0) {
                  e.preventDefault();
                  at.current -= 1;
                  setVal(at.current >= 0 ? h[at.current] : "");
                }
              }}
              aria-label={w.input}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
            />
          </form>
        </div>
      )}
    </div>
  );
}
