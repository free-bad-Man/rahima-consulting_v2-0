import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getAllServices } from "@/lib/services-data";
import { getAllSolutions } from "@/lib/solutions-data";
import { getAllAIAssistants } from "@/lib/ai-assistants-data";
import { getAllCases } from "@/lib/cases-data";

function mapSlugPages(
  basePath: string,
  items: Array<{ slug: string }>,
  priority = 0.8,
  changeFrequency: "monthly" | "weekly" = "monthly",
): MetadataRoute.Sitemap {
  return items.map((item) => ({
    url: absoluteUrl(`${basePath}/${item.slug}`),
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/services"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/solutions"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/ai-assistants"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/cases"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/calculator"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contacts"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const servicePages = mapSlugPages("/services", getAllServices(), 0.8, "monthly");
  const solutionPages = mapSlugPages("/solutions", getAllSolutions(), 0.8, "monthly");
  const aiAssistantPages = mapSlugPages("/ai-assistants", getAllAIAssistants(), 0.8, "monthly");
  const casePages = mapSlugPages("/cases", getAllCases(), 0.75, "monthly");

  return [
    ...staticPages,
    ...servicePages,
    ...solutionPages,
    ...aiAssistantPages,
    ...casePages,
  ];
}