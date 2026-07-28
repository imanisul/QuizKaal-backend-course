import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_PATH = path.join(process.cwd(), "content");

export function getLessonFilePaths() {
  const categories = ["backend", "ai", "projects"];
  const paths = [];

  categories.forEach((category) => {
    const categoryPath = path.join(CONTENT_PATH, category);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath);
      files.forEach((file) => {
        if (file.endsWith(".mdx")) {
          paths.push({
            slug: file.replace(/\.mdx$/, ""),
            category,
          });
        }
      });
    }
  });

  return paths;
}

export function getLessonBySlug(slug) {
  const categories = ["backend", "ai", "projects"];
  let filePath = null;

  for (const category of categories) {
    const testPath = path.join(CONTENT_PATH, category, `${slug}.mdx`);
    if (fs.existsSync(testPath)) {
      filePath = testPath;
      break;
    }
  }

  if (!filePath) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: data,
    slug,
  };
}
