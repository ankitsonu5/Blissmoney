import fs from 'node:fs';
import path from 'node:path';

const workspace = process.cwd();
const homePath = path.join(workspace, 'index.html');
const homeMarkup = fs.readFileSync(homePath, 'utf8');
const footerMatch = homeMarkup.match(/  <footer class="footer" id="footer">[\s\S]*?  <\/footer>/);

if (!footerMatch) {
  throw new Error('Canonical homepage footer was not found in index.html.');
}

const canonicalFooter = footerMatch[0];
const htmlFiles = [];

function collectHtmlFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(absolutePath);
    if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(absolutePath);
  }
}

function footerFor(relativePath) {
  const prefix = path.dirname(relativePath) === '.' ? '' : '../';
  return canonicalFooter
    .replaceAll('src="assets/', `src="${prefix}assets/`)
    .replaceAll('href="#hero"', `href="${prefix}index.html#hero"`)
    .replaceAll('href="#who-we-serve"', `href="${prefix}index.html#who-we-serve"`)
    .replaceAll('href="#nine-disciplines"', `href="${prefix}index.html#nine-disciplines"`)
    .replaceAll('href="#consultation"', `href="${prefix}index.html#consultation"`)
    .replaceAll('href="calculator.html"', `href="${prefix}calculator.html"`)
    .replaceAll('href="blog.html"', `href="${prefix}blog.html"`)
    .replaceAll('href="legal/', `href="${prefix}legal/`);
}

collectHtmlFiles(workspace);

let updated = 0;
for (const absolutePath of htmlFiles) {
  const relativePath = path.relative(workspace, absolutePath).replaceAll('\\', '/');
  if (relativePath === 'index.html') continue;

  const original = fs.readFileSync(absolutePath, 'utf8');
  const footerPattern = /\s*<footer class="(?:footer|legal-footer)"[^>]*>[\s\S]*?<\/footer>/;
  if (!footerPattern.test(original)) {
    throw new Error(`Footer not found: ${relativePath}`);
  }

  let next = original.replace(footerPattern, `\n${footerFor(relativePath)}`);
  const prefix = path.dirname(relativePath) === '.' ? '' : '../';
  const styleHref = `${prefix}assets/css/style.css?v=3.0`;

  if (/href="(?:\.\.\/)?assets\/css\/style\.css\?v=[^"]+"/.test(next)) {
    next = next.replace(/href="(?:\.\.\/)?assets\/css\/style\.css\?v=[^"]+"/, `href="${styleHref}"`);
  } else {
    next = next.replace(
      /(<link rel="stylesheet" href="(?:\.\.\/)?assets\/css\/legal\.css\?v=[^"]+">)/,
      `<link rel="stylesheet" href="${styleHref}">\n  $1`,
    );
  }

  if (next !== original) {
    fs.writeFileSync(absolutePath, next, 'utf8');
    updated += 1;
  }
}

console.log(`Synced homepage footer to ${updated} pages.`);
