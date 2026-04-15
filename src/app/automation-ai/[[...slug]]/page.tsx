import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug?: string[] }> | { slug?: string[] };
}

const AUTOMATION_AI_REDIRECTS: Record<string, string> = {
  "": "/solutions",
  "crm": "/solutions/digital-transformation",
  "site-crm-integration": "/solutions/digital-transformation",
  "n8n": "/ai-assistants/n8n-automation-assistant",
  "integrations": "/solutions/digital-transformation",
  "ai-assistants": "/ai-assistants",
  "audit-plan": "/solutions/digital-transformation",

  "crm-ai-sales-assistant": "/ai-assistants/crm-ai-sales-assistant",
  "victoria-ai-consultant": "/ai-assistants/victoria-ai-consultant",
  "document-ai-generator": "/ai-assistants/document-ai-generator",
};

function normalizeSegments(segments?: string[]) {
  return (segments || [])
    .map((segment) => decodeURIComponent(segment).trim().toLowerCase())
    .filter(Boolean);
}

function resolveAutomationAiRedirect(segments?: string[]) {
  const normalizedSegments = normalizeSegments(segments);
  const joined = normalizedSegments.join("/");

  if (AUTOMATION_AI_REDIRECTS[joined]) {
    return AUTOMATION_AI_REDIRECTS[joined];
  }

  if (normalizedSegments.length === 0) {
    return "/solutions";
  }

  return "/solutions";
}

export default async function AutomationAiLegacyPage({ params }: PageProps) {
  const resolved = await params;
  const target = resolveAutomationAiRedirect(resolved?.slug);

  permanentRedirect(target);
}