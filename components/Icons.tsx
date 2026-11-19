/** Line icons for the four abilities (the old site used Font Awesome files; these are drawn in the same spirit). */
const P: Record<string, React.ReactNode> = {
  learn: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5.5" />
    </>
  ),
  lead: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="10" r="2.2" />
      <circle cx="19" cy="10" r="2.2" />
      <path d="M6.5 20v-1.5a5.5 5.5 0 0 1 11 0V20M1.5 19.5v-1a3.5 3.5 0 0 1 3.5-3.5M22.5 19.5v-1a3.5 3.5 0 0 0-3.5-3.5" />
    </>
  ),
  team: (
    <>
      <rect x="7" y="9" width="10" height="7" rx="1.5" />
      <circle cx="4.5" cy="6" r="2" />
      <circle cx="19.5" cy="6" r="2" />
      <path d="M4.5 8.5V20M19.5 8.5V20M4.5 11.5 7 12M19.5 11.5 17 12" />
    </>
  ),
  bug: (
    <>
      <path d="M8 7.5a4 4 0 0 1 8 0" />
      <rect x="6.5" y="8" width="11" height="12" rx="5.5" />
      <path d="M12 12v8M3 12h3.5M17.5 12H21M4 18l2.8-1.6M20 18l-2.8-1.6M4 6.5l2.8 1.8M20 6.5l-2.8 1.8" />
    </>
  ),
};

export function Icon({ name, size = 26 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  );
}
