import { MetadataRoute } from "next";
import { getAllCompanies } from "@/service/company";

const BASE_URL = "https://petronickholdings.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/companies`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/promotion-agent`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let companyRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await getAllCompanies({ isVisible: true, limit: 100 });
    const companies = res?.data ?? [];

    companyRoutes = companies.map(
      (c: { id: string; updatedAt?: string }): MetadataRoute.Sitemap[number] => ({
        url: `${BASE_URL}/companies/${c.id}`,
        lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    );
  } catch {
    companyRoutes = [];
  }

  return [...staticRoutes, ...companyRoutes];
}