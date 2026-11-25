// ESLint for the portfolio (flat config). `next lint` is deprecated since Next 15.5; `bun run lint` runs ESLint itself.
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  // docs/ holds design prototypes (plain scripts for the review pages), not the site.
  { ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts", "public/**", "docs/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
