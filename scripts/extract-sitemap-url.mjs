import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Inspired by the following article, with modifications:
// https://medium.com/@SkorekM/from-theory-to-automation-wcag-compliance-using-axe-core-next-js-and-github-actions-b9f63af8e155
const sitemapPath = resolve(import.meta.dirname, "../.next/server/app/sitemap.xml.body");
const outputPath = resolve(process.cwd(), "./scripts/sitemap-urls.txt");
const basePath = "http://localhost:3000";

try {
  if (!existsSync(sitemapPath)) {
    console.error("Sitemap file not found at:", sitemapPath);
    process.exit(1);
  }

  const sitemapContent = readFileSync(sitemapPath, "utf8");
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const matches = [...sitemapContent.matchAll(urlRegex)];

  const urls = matches.map((match) => match[1]);

  if (urls.length === 0) {
    console.warn("No URLs found in the sitemap.xml file");
    process.exit(1);
  }

  const rewritten = urls
    .map((url) => {
      try {
        const { pathname, search, hash } = new URL(url);
        return `${basePath}${pathname}${search}${hash}`;
      } catch {
        console.warn(`Invalid URL in sitemap: "${url}"`);
        return null;
      }
    })
    .filter(Boolean);

  writeFileSync(outputPath, rewritten.join("\n"));

  console.log(`Found ${rewritten.length} URLs to test:`);
  for (const path of rewritten) {
    console.log(`  ${path}`);
  }
} catch (err) {
  console.error("Error processing sitemap:", err);
  process.exit(1);
}
