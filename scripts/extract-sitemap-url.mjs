import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Inspired by the following article, with modifications:
// https://medium.com/@SkorekM/from-theory-to-automation-wcag-compliance-using-axe-core-next-js-and-github-actions-b9f63af8e155
const sitemapPath = resolve(import.meta.dirname, "../.next/server/app/sitemap.xml.body");

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

  const baseUrl = new URL(urls.find((u) => u.startsWith("http")));
  const paths = urls.map((url) => {
    try {
      const fullUrl = url.startsWith("http") ? url : new URL(url, baseUrl).toString();
      return new URL(fullUrl).pathname;
    } catch {
      console.warn(`Fallback for invalid URL "${url}"`);
      return url.startsWith("/") ? url : `/${url}`;
    }
  });

  const outputPath = resolve(process.cwd(), "./scripts/sitemap-urls.txt");
  writeFileSync(outputPath, paths.join("\n"));

  console.log(`Found ${paths.length} URLs to test:`);
  for (const path of paths) {
    console.log(`  ${path}`);
  }
} catch (err) {
  console.error("Error processing sitemap:", err);
  process.exit(1);
}
