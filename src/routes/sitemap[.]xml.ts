import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { TOPICS } from "@/data/topics";
import { TOOLS } from "@/data/tools";

const BASE_URL = process.env.SITE_URL || "https://example.com";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "daily" | "monthly";
  priority?: string;
}

function buildEntries(): SitemapEntry[] {
  return [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/tools", changefreq: "weekly", priority: "0.8" },
    ...TOOLS.map((tool) => ({
      path: `/tools/${tool.slug}`,
      changefreq: "monthly" as const,
      priority: "0.7",
    })),
    ...TOPICS.map((topic) => ({
      path: `/topic/${topic.slug}`,
      changefreq: "monthly" as const,
      priority: "0.8",
    })),
  ];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = buildEntries();
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
