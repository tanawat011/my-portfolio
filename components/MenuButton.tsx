"use client";

import { useEffect, useId, useRef, useState } from "react";

/** The phone menu: a button that opens the links under the nav pill. Escape, a tap outside or a link closes it. */
export function MenuButton({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!box.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <>
      <button ref={btn} className="p-menu" type="button" aria-label={label} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <i />
        <i />
      </button>
      <div
        ref={box}
        id={id}
        className="p-sheet"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as Element).closest("a")) setOpen(false);
        }}
      >
        {children}
      </div>
    </>
  );
}
