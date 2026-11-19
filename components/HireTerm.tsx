"use client";

import { useEffect, useRef } from "react";

/**
 * The hire card's window (owner, 19 Nov 2026, on the orb that was here: "ไม่เกี่ยวกับเว็บเราอ่ะ"). His hello_world
 * terminal types the easter egg's `sudo hire-me` and gets in.
 *
 * It is drawn finished. Only when script runs, Reduce motion is off and the card is still below the fold does it wait
 * (data-play="wait") and then type once as the card comes into view (data-play="go"). Without script, under Reduce
 * motion or once it's gone, it is the last frame, still. Every line keeps its place, so nothing moves around it.
 */
export function HireTerm({ title, cmd, pass, ok }: { title: string; cmd: string; pass: string; ok: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.play = "wait";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        el.dataset.play = "go";
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.play;
    };
  }, []);

  return (
    <div ref={ref} className="htw" aria-hidden="true" data-loop style={{ "--n": cmd.length } as React.CSSProperties}>
      <div className="htw-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="htw-body">
        <div className="htw-l htw-1">
          <span className="htw-ps">~ $</span> <span className="htw-cmd">{cmd}</span>
        </div>
        <div className="htw-l htw-2">
          {pass} <span className="htw-pw">********</span>
        </div>
        <div className="htw-l htw-3">{ok}</div>
        <div className="htw-l htw-4">
          <span className="htw-ps">~ $</span> <span className="htw-car" />
        </div>
      </div>
    </div>
  );
}
