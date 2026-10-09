import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

export const revalidate = 86400;

const BASE = "https://applenews.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...PRODUCTS.map((p) => ({ url: `${BASE}/product/${p.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 })),
  ];
}
