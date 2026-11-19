/** A Labs screenshot, dark and light: CSS shows the one for the page's theme. 800 and 1600 wide, 16:10. */
export function Shot({ k, alt, sizes, className }: { k: string; alt: string; sizes: string; className?: string }) {
  const set = (m: string) => `/apps/shots/${k}-${m}-800.webp 800w, /apps/shots/${k}-${m}-1600.webp 1600w`;
  return (
    <>
      {(["dark", "light"] as const).map((m) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={m} className={`tw-${m[0]}${className ? ` ${className}` : ""}`} src={`/apps/shots/${k}-${m}-800.webp`} srcSet={set(m)} sizes={sizes} width={1600} height={1000} alt={alt} loading="lazy" decoding="async" />
      ))}
    </>
  );
}
