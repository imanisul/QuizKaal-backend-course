const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'content/backend');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

const replacements = {
  'apache-kafka.mdx': '<MessageQueueVisualizer />',
  'api-security.mdx': '<AuthVisualizer />',
  'crag-self-rag.mdx': '<AIVisualizer />',
  'docker-k8s.mdx': '<DockerVisualizer />',
  'event-loop.mdx': '<ArchitectureVisualizer />',
  'graph-rag.mdx': '<AIVisualizer />',
  'graphql.mdx': '<RestApiVisualizer />',
  'hybrid-search.mdx': '<AIVisualizer />',
  'indexing-transactions.mdx': '<DatabaseVisualizer />',
  'load-balancing-scaling.mdx': '<ArchitectureVisualizer />',
  'multimodal-rag.mdx': '<AIVisualizer />',
  'naive-rag.mdx': '<AIVisualizer />',
  'oauth-sso.mdx': '<AuthVisualizer />',
  'rabbitmq.mdx': '<MessageQueueVisualizer />',
  'streams-buffers.mdx': '<BackendFlowVisualizer />',
  'websockets-grpc.mdx': '<ArchitectureVisualizer />',
  'worker-threads.mdx': '<ArchitectureVisualizer />'
};

files.forEach(file => {
  if (replacements[file]) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the Callout block
    const calloutRegex = /<Callout type="info" title="Content Coming Soon">[\s\S]*?<\/Callout>/g;
    
    if (content.match(calloutRegex)) {
      content = content.replace(calloutRegex, replacements[file]);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
