import { notFound } from "next/navigation";
import { CasePage } from "@/components/CasePage";
import { CASES, caseById } from "@/content/apps";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;
export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseById(slug);
  return c ? pageMeta("en", `/work/${slug}`, c.title.en, c.stand.en) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseById(slug);
  if (!c) notFound();
  return <CasePage lang="en" c={c} />;
}
