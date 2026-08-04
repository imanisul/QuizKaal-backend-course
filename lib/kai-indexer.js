import { Document } from 'flexsearch';
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import matter from 'gray-matter';

let index = null;
let documents = {};

export function initializeIndex() {
  if (index) return;
  
  console.log('[KAI] Building knowledge base index...');
  
  index = new Document({
    document: {
      id: 'id',
      index: ['title', 'content', 'keywords'],
      store: ['title', 'content', 'url']
    },
    tokenize: 'forward',
    cache: true
  });

  const contentDir = path.join(process.cwd(), 'content');
  const dataDir = path.join(process.cwd(), 'data');

  let idCounter = 1;
  
  // Index all MDX courses
  if (fs.existsSync(contentDir)) {
    const mdxFiles = globSync('**/*.{mdx,md}', { cwd: contentDir });
    
    mdxFiles.forEach(file => {
      const fullPath = path.join(contentDir, file);
      const rawText = fs.readFileSync(fullPath, 'utf8');
      
      const { data, content } = matter(rawText);
      const title = data.title || file;
      const url = '/' + file.replace(/\.mdx?$/, '');
      
      // Chunk content by H2 headers to keep context windows reasonable
      const chunks = content.split(/(?=\n## )/);
      
      chunks.forEach((chunk) => {
         const docId = idCounter++;
         const doc = {
           id: docId,
           title: title,
           content: chunk.trim(),
           url: url,
           keywords: data.tags?.join(' ') || ''
         };
         
         if (doc.content.length > 50) { // Only index meaningful chunks
           index.add(doc);
           documents[docId] = doc;
         }
      });
    });
  }
  
  // Index structured JS Data (Playgrounds, Roadmaps, etc.)
  if (fs.existsSync(dataDir)) {
    const jsFiles = globSync('**/*.js', { cwd: dataDir });
    jsFiles.forEach(file => {
      const fullPath = path.join(dataDir, file);
      const text = fs.readFileSync(fullPath, 'utf8');
      
      // Clean up raw JS slightly for the LLM
      const cleanText = text.replace(/export const \w+ = /g, '').replace(/import.*?['"];/g, '');
      
      const docId = idCounter++;
      const doc = {
        id: docId,
        title: `Data: ${file}`,
        content: cleanText.substring(0, 5000), // Prevent massive files from blowing up the context
        url: '/playground',
        keywords: file.replace('.js', '')
      };
      index.add(doc);
      documents[docId] = doc;
    });
  }

  console.log(`[KAI] Knowledge base indexed successfully with ${Object.keys(documents).length} chunks.`);
}

export function searchKnowledgeBase(query, limit = 4) {
  if (!index) initializeIndex();
  
  const results = index.search(query, {
    limit: limit,
    suggest: true
  });
  
  const uniqueIds = new Set();
  results.forEach(res => {
    res.result.forEach(id => uniqueIds.add(id));
  });
  
  return Array.from(uniqueIds).map(id => documents[id]);
}

export function getLocalContext(pathname) {
  if (!index) initializeIndex();
  
  // Search for chunks that exactly match the current URL path
  return Object.values(documents)
    .filter(doc => doc.url.includes(pathname) || pathname.includes(doc.url))
    .slice(0, 3); // Return top 3 chunks for this page
}
