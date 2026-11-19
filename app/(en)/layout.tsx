import { RootShell } from "@/components/RootShell";
import { rootMeta } from "@/lib/meta";

export { viewport } from "@/lib/meta";
export const metadata = rootMeta("en");

/** The English root layout (at /): <html lang="en">. */
export default function EnglishRoot({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
