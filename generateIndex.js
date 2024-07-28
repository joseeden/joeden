const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getCategoryLabel(directoryPath) {
  const categoryFilePath = path.join(directoryPath, '_category_.json');
  if (fs.existsSync(categoryFilePath)) {
    const categoryContent = fs.readFileSync(categoryFilePath, 'utf-8');
    const categoryJson = JSON.parse(categoryContent);
    return categoryJson.label || path.basename(directoryPath);
  }
  return path.basename(directoryPath);
}

function generateIndex(directoryPath, basePath = '') {
  let content = '';
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(directoryPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const categoryLabel = getCategoryLabel(fullPath);
      content += `- ${categoryLabel}\n${generateIndex(fullPath, relativePath)}`;
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(fileContent);
      const title = data.title || entry.name;
      content += `  - [${title}](./${relativePath.replace(/\\/g, '/')})\n`;
    }
  });

  return content;
}

function createIndexMd(directoryPath, outputPath) {
  const categoryLabel = getCategoryLabel(directoryPath);
  const content = `# ${categoryLabel}\n\n${generateIndex(directoryPath)}`;
  fs.writeFileSync(outputPath, content, 'utf-8');
}

const categoryFolderPath = path.join(__dirname, 'docs', '003-Linux');
const outputPath = path.join(categoryFolderPath, 'index.md');

createIndexMd(categoryFolderPath, outputPath);
