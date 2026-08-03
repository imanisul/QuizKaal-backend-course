#!/bin/bash

function make_layout() {
  local dir=$1
  local title=$2
  local desc=$3
  local keywords=$4
  local url="https://quizkaal.in/${dir}"

  cat << INNER_EOF > "app/${dir}/layout.js"
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "${title}",
  description: "${desc}",
  url: "${url}",
  keywords: [${keywords}]
});

export default function Layout({ children }) {
  return children;
}
INNER_EOF
}

make_layout "about" "About QuizKaal | Our Mission & Curriculum Team" "Learn about QuizKaal, our mission to transform software engineering education, and the team behind the interactive courses." '"about quizkaal", "quizkaal team", "software engineering education"'
make_layout "contact" "Contact Us | QuizKaal Support & Inquiries" "Get in touch with the QuizKaal team for support, enterprise licensing, or general inquiries." '"contact quizkaal", "quizkaal support", "enterprise training"'
make_layout "ai-integration" "AI Integration Engineering | Build with LLMs | QuizKaal" "Learn how to integrate AI models into your applications. Master APIs, embeddings, and deployment on QuizKaal." '"ai integration", "llm integration", "openai api"'

chmod +x generate_layouts_2.sh
./generate_layouts_2.sh
