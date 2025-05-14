import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""].map((route) => ({
    url: `https://sylketech.com${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
