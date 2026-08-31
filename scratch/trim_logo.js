import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/logo.webp');
const outputPath = path.join(__dirname, '../public/logo_trimmed_temp.webp');

async function trimLogo() {
  try {
    // Trim extra transparent whitespace around image boundaries
    const trimmedBuffer = await sharp(inputPath)
      .trim()
      .webp({ quality: 100 })
      .toBuffer();

    fs.writeFileSync(path.join(__dirname, '../public/nex_logo_clean.webp'), trimmedBuffer);

    console.log('Successfully trimmed extra whitespace from logo!');
  } catch (err) {
    console.error('Error trimming logo:', err);
  }
}

trimLogo();
