#!/bin/bash

# Arguments:
# 1: Path to the page.jsx or page.js file
# 2: The base URL path (e.g. "mobile-course")
# 3: Course Title Prefix (e.g. "Mobile Engineering")

FILE_PATH=$1
BASE_URL=$2
COURSE_TITLE=$3

if [ ! -f "$FILE_PATH" ]; then
  echo "File not found: $FILE_PATH"
  exit 1
fi

DIR=$(dirname "$FILE_PATH")
EXT="${FILE_PATH##*.}"
CLIENT_FILE="$DIR/ClientComponent.$EXT"

# Rename the original client component
mv "$FILE_PATH" "$CLIENT_FILE"

# Create the new Server Component wrapper
cat << INNER_EOF > "$FILE_PATH"
import { generateSEOMetadata, generateSchema } from "@/lib/seo";
import Script from "next/script";
import ClientComponent from "./ClientComponent";

export function generateMetadata({ params }) {
  const lessonTitle = params.lesson ? params.lesson.replace(/-/g, ' ') : (params.slug || params.id || params.courseId || "Lesson");
  const formatted = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);
  const title = \`\${formatted} - ${COURSE_TITLE} | QuizKaal\`;
  const url = \`https://quizkaal.in/${BASE_URL}/\${params.lesson || params.slug || params.id || params.courseId}\`;

  return generateSEOMetadata({
    title,
    description: \`Master \${formatted} in the ${COURSE_TITLE} course on QuizKaal Learn.\`,
    url,
    type: "article",
    keywords: ["\${formatted}", "${COURSE_TITLE}", "quizkaal learn"]
  });
}

export default function DynamicPageWrapper({ params }) {
  const lessonTitle = params.lesson ? params.lesson.replace(/-/g, ' ') : (params.slug || params.id || params.courseId || "Lesson");
  const formatted = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);

  const articleSchema = generateSchema("TechArticle", {
    title: \`\${formatted} - ${COURSE_TITLE}\`,
    description: \`Learn \${formatted} on QuizKaal\`,
    url: \`https://quizkaal.in/${BASE_URL}/\${params.lesson || params.slug || params.id || params.courseId}\`
  });

  return (
    <>
      <Script id={\`schema-article-\${params.lesson || params.slug || params.id || params.courseId}\`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ClientComponent params={params} />
    </>
  );
}
INNER_EOF
echo "Wrapped $FILE_PATH"
