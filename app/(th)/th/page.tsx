import { Home } from "@/components/Home";
import { pageMeta } from "@/lib/meta";

/** Rebuilt daily so the years and the 2026 band stay true as time passes. */
export const revalidate = 86400;
export const metadata = pageMeta("th", "/");

export default function Page() {
  return <Home lang="th" />;
}
