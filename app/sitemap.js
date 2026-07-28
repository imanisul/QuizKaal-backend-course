import { allLessons } from "@/data/roadmap";

export default function sitemap() {
  const baseUrl = "https://quizkaal.in";

  // Static routes
  const staticRoutes = [
    "",
    "/roadmap",
    "/cicd",
    "/ai-integration",
    "/interview",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic lesson routes
  const dynamicRoutes = allLessons.map((lesson) => ({
    url: `${baseUrl}/lessons/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
