const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImagePath = path.join(__dirname, 'public', 'logo.png');
const outputDir = path.join(__dirname, 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateIcons() {
  if (!fs.existsSync(inputImagePath)) {
    console.error('Logo.png not found in public directory!');
    process.exit(1);
  }

  try {
    for (const { name, size } of sizes) {
      await sharp(inputImagePath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFile(path.join(outputDir, name));
      console.log(`Generated ${name}`);
    }
    
    // Create an .ico by simply resizing to 32x32 and copying as .ico (browsers support PNG in .ico extension)
    // A proper .ico has an icon directory structure, but a 32x32 PNG renamed to .ico works identically for all modern browsers.
    await sharp(inputImagePath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log(`Generated favicon.ico`);

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
