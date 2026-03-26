import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllServices } from "@/lib/services-data";
import { getAllSolutions } from "@/lib/solutions-data";
import { getAllAIAssistants } from "@/lib/ai-assistants-data";
import { getAllCases } from "@/lib/cases-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ai-assistants`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cases`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionPages: MetadataRoute.Sitemap = getAllSolutions().map((solution) => ({
    url: `${SITE_URL}/solutions/${solution.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const aiAssistantPages: MetadataRoute.Sitemap = getAllAIAssistants().map((assistant) => ({
    url: `${SITE_URL}/ai-assistants/${assistant.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const casePages: MetadataRoute.Sitemap = getAllCases().map((caseItem) => ({
    url: `${SITE_URL}/cases/${caseItem.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...solutionPages,
    ...aiAssistantPages,
    ...casePages,
  ];
}