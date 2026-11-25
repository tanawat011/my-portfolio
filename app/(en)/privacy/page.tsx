import { Privacy } from "@/components/Privacy";
import { pageMeta, PRIVACY_DESC } from "@/lib/meta";

export const metadata = pageMeta("en", "/privacy", "Privacy", PRIVACY_DESC.en);

export default function Page() {
  return <Privacy lang="en" />;
}
