import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
