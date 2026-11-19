import { RootShell } from "@/components/RootShell";
import { rootMeta } from "@/lib/meta";

export { viewport } from "@/lib/meta";
export const metadata = rootMeta("th");

/** The Thai root layout (under /th): <html lang="th">. */
export default function ThaiRoot({ children }: { children: React.ReactNode }) {
  return <RootShell lang="th">{children}</RootShell>;
}
