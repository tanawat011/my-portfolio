import { Privacy } from "@/components/Privacy";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("th", "/privacy", "ความเป็นส่วนตัว");

export default function Page() {
  return <Privacy lang="th" />;
}
