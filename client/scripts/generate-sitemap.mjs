import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const baseUrl = "https://sylketech.com";
const routes = [""];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `<url><loc>${baseUrl}${route}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`).join("")}
</urlset>
`;

writeFileSync(resolve("public/sitemap.xml"), sitemap.trim());
