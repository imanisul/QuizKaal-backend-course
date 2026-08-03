import fs from 'fs';
import path from 'path';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Match the children format we just created:
      const regex = /<MultiLangCodeBlock>[\s\S]*?```jsx\n([\s\S]*?)\n```[\s\S]*?```dart\n([\s\S]*?)\n```[\s\S]*?```kotlin\n([\s\S]*?)\n```[\s\S]*?<\/MultiLangCodeBlock>/g;
      
      const newContent = content.replace(regex, (match, rn, flutter, android) => {
        const rnB64 = Buffer.from(rn).toString('base64');
        const flB64 = Buffer.from(flutter).toString('base64');
        const anB64 = Buffer.from(android).toString('base64');
        return `<MultiLangCodeBlock rnCodeBase64="${rnB64}" flutterCodeBase64="${flB64}" androidCodeBase64="${anB64}" />`;
      });

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

// First, restore the test file I messed up manually
const testFilePath = path.join(process.cwd(), 'content/mobile/module-0-orientation/1-what-is-mobile-engineering.mdx');
const testContent = fs.readFileSync(testFilePath, 'utf8');
if (testContent.includes('reactNative="import')) {
   fs.writeFileSync(testFilePath, testContent.replace(/<MultiLangCodeBlock.*? \/>/g, `<MultiLangCodeBlock>\n\n\`\`\`jsx\nimport { useEffect } from 'react';\nimport { AppState } from 'react-native';\n\nexport default function App() {\n  useEffect(() => {\n    const subscription = AppState.addEventListener('change', nextAppState => {\n      if (nextAppState === 'active') {\n        console.log('App is in foreground! (onResume)');\n      } else if (nextAppState === 'background') {\n        console.log('App is in background! (onPause)');\n      }\n    });\n\n    return () => subscription.remove();\n  }, []);\n}\n\`\`\`\n\n\`\`\`dart\nclass AppLifecycleObserver extends WidgetsBindingObserver {\n  @override\n  void didChangeAppLifecycleState(AppLifecycleState state) {\n    if (state == AppLifecycleState.resumed) {\n      print('App is in foreground! (onResume)');\n    } else if (state == AppLifecycleState.paused) {\n      print('App is in background! (onPause)');\n    }\n  }\n}\n\`\`\`\n\n\`\`\`kotlin\nclass MainActivity : AppCompatActivity() {\n    override fun onResume() {\n        super.onResume()\n        println("App is in foreground! (onResume)")\n    }\n\n    override fun onPause() {\n        super.onPause()\n        println("App is in background! (onPause)")\n    }\n}\n\`\`\`\n\n</MultiLangCodeBlock>`));
}

processDirectory(path.join(process.cwd(), 'content', 'mobile'));
