import { Privacy } from "@/components/Privacy";
import { pageMeta, PRIVACY_DESC } from "@/lib/meta";

export const metadata = pageMeta("th", "/privacy", "ความเป็นส่วนตัว", PRIVACY_DESC.th);

export default function Page() {
  return <Privacy lang="th" />;
}
