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
  console.log('1. Updating file references across codebase...');

  const codeFiles = [
    ...getFiles(path.resolve('src')),
    path.resolve('team-guide.html'),
    path.resolve('public/team-guide.html')
  ].filter(f => /\.(jsx?|tsx?|css|html)$/i.test(f));

  let replacedFilesCount = 0;

  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    const original = content;

    // Replace any occurrence of (assets/images/...).(jpg|jpeg|png) with $1.webp
    content = content.replace(/(assets\/images\/[^'"\s]+?)\.(jpe?g|png)/gi, '$1.webp');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf-8');
      replacedFilesCount++;
      console.log(`Updated: ${path.relative(path.resolve('.'), file)}`);
    }
  }

  console.log(`Total files updated: ${replacedFilesCount}`);

  console.log('\n2. Regenerating assets-manifest.json with new WebP files...');
  const allImageFiles = getFiles(IMAGES_ROOT).filter(f => !f.endsWith('assets-manifest.json'));

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalAssets: allImageFiles.length,
    compression: 'WebP (Quality 82, Perceptual Lossless, Max width 1920px for heroes, 1000px for products)',
    stats: {},
    members: {
      amirkhon: [],
      kibriyo: [],
      tolibov: []
    }
  };

  let totalBytes = 0;

  for (const filePath of allImageFiles) {
    const stat = fs.statSync(filePath);
    totalBytes += stat.size;
    const relPath = path.relative(path.resolve('.'), filePath).replace(/\\/g, '/');
    const ext = path.extname(filePath).toLowerCase();

    let meta = {};
    if (ext === '.webp' || ext === '.png' || ext === '.jpg') {
      try {
        meta = await sharp(filePath).metadata();
      } catch (e) {}
    }

    const item = {
      filename: path.basename(filePath),
      path: relPath,
      sizeBytes: stat.size,
      sizeKB: (stat.size / 1024).toFixed(1) + ' KB',
      format: ext.replace('.', ''),
      width: meta.width || null,
      height: meta.height || null
    };

    if (relPath.includes('/amirkhon/')) {
      manifest.members.amirkhon.push(item);
    } else if (relPath.includes('/kibriyo/')) {
      manifest.members.kibriyo.push(item);
    } else if (relPath.includes('/tolibov/')) {
      manifest.members.tolibov.push(item);
    }
  }

  manifest.stats = {
    totalBytes,
    totalMB: (totalBytes / (1024 * 1024)).toFixed(2) + ' MB',
    amirkhonCount: manifest.members.amirkhon.length,
    kibriyoCount: manifest.members.kibriyo.length,
    tolibovCount: manifest.members.tolibov.length
  };

  const manifestPath = path.resolve('src/assets/images/assets-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Updated manifest saved. Total assets: ${allImageFiles.length}, Total size: ${manifest.stats.totalMB}`);
}

run().catch(console.error);
