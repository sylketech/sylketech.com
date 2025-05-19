import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Inspired by the following article, with modifications:
// https://medium.com/@SkorekM/from-theory-to-automation-wcag-compliance-using-axe-core-next-js-and-github-actions-b9f63af8e155
try {
  const urls = readFileSync("./scripts/sitemap-urls.txt", "utf8")
    .split("\n")
    .filter((path) => path.trim() !== "");

  let hasFailures = false;

  for (const url of urls) {
    console.log(`Testing: ${url}`);

    try {
      execSync(`axe "${url}" --exit`, { stdio: "inherit" });
    } catch (error) {
      console.log("Accessibility issues found on this page");
      hasFailures = true;
    }
  }

  console.log("Accessibility testing complete.");
  process.exit(hasFailures ? 1 : 0);
} catch (err) {
  console.error("Error during accessibility testing:", err);
  process.exit(1);
}
