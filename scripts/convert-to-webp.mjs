import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_ROOT = path.resolve('src/assets/images');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

async function run() {
  const allFiles = getFiles(IMAGES_ROOT);
  const targetFiles = allFiles.filter(f => /\.(jpe?g|png)$/i.test(f));

  console.log(`Found ${targetFiles.length} images to convert to WebP...`);

  let totalOldBytes = 0;
  let totalNewBytes = 0;
  const mapping = {};

  for (const filePath of targetFiles) {
    const oldSize = fs.statSync(filePath).size;
    totalOldBytes += oldSize;

    const baseName = path.basename(filePath);
    const dir = path.dirname(filePath);
    const newFileName = baseName.replace(/\.(jpe?g|png)$/i, '.webp');
    const newFilePath = path.join(dir, newFileName);

    const isHeroOrBanner = /hero|banner|saving-hawaiian|promo/i.test(baseName);
    const isSmall = /brand|avatar|icon/i.test(baseName);
    const maxWidth = isHeroOrBanner ? 1920 : (isSmall ? 500 : 1000);

    const image = sharp(filePath);
    const meta = await image.metadata();

    let pipeline = sharp(filePath);
    if (meta.width && meta.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }

    pipeline = pipeline.webp({
      quality: 82,
      effort: 6,
      alphaQuality: 90
    });

    await pipeline.toFile(newFilePath);

    const newSize = fs.statSync(newFilePath).size;
    totalNewBytes += newSize;

    // Delete old file
    fs.unlinkSync(filePath);

    const relOld = path.relative(path.resolve('.'), filePath).replace(/\\/g, '/');
    const relNew = path.relative(path.resolve('.'), newFilePath).replace(/\\/g, '/');
    mapping[relOld] = relNew;

    const savedPercent = (((oldSize - newSize) / oldSize) * 100).toFixed(1);
    console.log(`[OK] ${baseName} -> ${newFileName} | ${(oldSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${savedPercent}%)`);
  }

  const oldMB = (totalOldBytes / (1024 * 1024)).toFixed(2);
  const newMB = (totalNewBytes / (1024 * 1024)).toFixed(2);
  const totalSavedPercent = (((totalOldBytes - totalNewBytes) / totalOldBytes) * 100).toFixed(1);

  console.log('\n=======================================');
  console.log(`Total Old Size: ${oldMB} MB`);
  console.log(`Total New Size: ${newMB} MB`);
  console.log(`Total Reduction: -${totalSavedPercent}% (saved ${(oldMB - newMB).toFixed(2)} MB!)`);
  console.log('=======================================\n');

  fs.writeFileSync('scripts/webp-mapping.json', JSON.stringify(mapping, null, 2), 'utf-8');
  console.log('Mapping saved to scripts/webp-mapping.json');
}

run().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
