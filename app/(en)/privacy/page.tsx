import { Privacy } from "@/components/Privacy";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("en", "/privacy", "Privacy");

export default function Page() {
  return <Privacy lang="en" />;
}
