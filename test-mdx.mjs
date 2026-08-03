import fs from 'fs';
import { compile } from '@mdx-js/mdx';

const mdx = fs.readFileSync('content/mobile/module-0-orientation/1-what-is-mobile-engineering.mdx', 'utf8');

compile(mdx, {
  development: true
}).then(res => console.log("Success!"))
.catch(err => console.error("MDX Error:", err));
