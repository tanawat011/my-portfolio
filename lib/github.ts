/**
 * Facts about a public repo, read from GitHub's API on the server while the page is built (and again when it
 * revalidates, once a day). Visitors' browsers never call GitHub. No token is needed; if GITHUB_TOKEN is set on the
 * server it is used only for a higher rate limit and never reaches the page. Anything that fails is left out.
 */
export interface RepoFacts {
  stars?: number;
  pushed?: string;
  langs?: { name: string; pct: number; color: string }[];
  tree?: string[];
}

/** GitHub's own language colours (linguist), so the bar reads like the one on GitHub. */
const LANG_COLOR: Record<string, string> = { Go: "#00ADD8", TypeScript: "#3178c6", JavaScript: "#f1e05a", Dockerfile: "#384d54", Shell: "#89e051", Makefile: "#427819", Swift: "#F05138", HTML: "#e34c26" };

async function get<T>(path: string): Promise<T | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com${path}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "tanawat.dev (build)", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function repoFacts(owner: string, repo: string): Promise<RepoFacts> {
  const [info, langs, tree] = await Promise.all([
    get<{ stargazers_count: number; pushed_at: string; default_branch: string }>(`/repos/${owner}/${repo}`),
    get<Record<string, number>>(`/repos/${owner}/${repo}/languages`),
    get<{ tree: { path: string; type: string }[] }>(`/repos/${owner}/${repo}/git/trees/HEAD`),
  ]);
  const out: RepoFacts = {};
  if (info && typeof info.stargazers_count === "number") out.stars = info.stargazers_count;
  if (info?.pushed_at) out.pushed = info.pushed_at.slice(0, 10);
  if (langs && Object.keys(langs).length) {
    const total = Object.values(langs).reduce((a, b) => a + b, 0);
    out.langs = Object.entries(langs)
      .sort((a, b) => b[1] - a[1])
      .map(([name, n]) => ({ name, pct: Math.round((n / total) * 1000) / 10, color: LANG_COLOR[name] ?? "#8d929b" }));
  }
  if (tree?.tree?.length) {
    const skip = /^(\.|LICENSE$|go\.sum$|package-lock\.json$|bun\.lock|yarn\.lock$|pnpm-lock)/;
    const dirs = tree.tree.filter((e) => e.type === "tree" && !skip.test(e.path)).map((e) => `${e.path}/`).sort();
    const files = tree.tree.filter((e) => e.type === "blob" && !skip.test(e.path)).map((e) => e.path).sort();
    out.tree = [...dirs, ...files];
  }
  return out;
}
