// Generate search-index.json from Hugo content
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content/posts');
const outputFile = path.join(__dirname, '../public/search-index.json');

console.log('Generating search index...');

const items = [];

// Read all markdown files
if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract front matter (handle both \r\n and \n)
    const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!frontMatterMatch) {
      console.warn(`Skipping ${file}: No front matter found`);
      return;
    }
    
    const frontMatter = frontMatterMatch[1];
    const body = frontMatterMatch[2];
    
    // Parse front matter
    const titleMatch = frontMatter.match(/^title:\s*["']?(.*?)["']?$/m);
    const descMatch = frontMatter.match(/^description:\s*["']?(.*?)["']?$/m);
    const categoriesMatch = frontMatter.match(/^categories:\s*\n((?:\s*-\s*.*\n?)+)/m) || frontMatter.match(/^categories:\s*\[(.*?)\]/s);
    const tagsMatch = frontMatter.match(/^tags:\s*\n((?:\s*-\s*.*\n?)+)/m) || frontMatter.match(/^tags:\s*\[(.*?)\]/s);
    const dateMatch = frontMatter.match(/^date:\s*(.*?)$/m);
    
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');
    const description = descMatch ? descMatch[1].trim() : '';
    const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0];
    
    let categories = [];
    if (categoriesMatch) {
      if (categoriesMatch[1].includes('\n')) {
        // YAML list format
        categories = categoriesMatch[1]
          .split('\n')
          .filter(l => l.trim().startsWith('-'))
          .map(l => l.replace(/^-\s*["']?(.*?)["']?$/, '$1').trim())
          .filter(c => c);
      } else {
        // Array format
        categories = categoriesMatch[1]
          .split(',')
          .map(c => c.replace(/["']/g, '').trim())
          .filter(c => c);
      }
    }
    
    let tags = [];
    if (tagsMatch) {
      if (tagsMatch[1].includes('\n')) {
        // YAML list format
        tags = tagsMatch[1]
          .split('\n')
          .filter(l => l.trim().startsWith('-'))
          .map(l => l.replace(/^-\s*["']?(.*?)["']?$/, '$1').trim())
          .filter(t => t);
      } else {
        // Array format
        tags = tagsMatch[1]
          .split(',')
          .map(t => t.replace(/["']/g, '').trim())
          .filter(t => t);
      }
    }
    
    // Generate URL from filename (keep original format)
    const slug = file.replace('.md', '');
    const url = `/posts/${slug}/`;
    
    // Extract content preview (remove markdown)
    const contentPreview = body
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove code
      .replace(/\n+/g, ' ') // Replace newlines
      .trim()
      .substring(0, 500);
    
    const postItem = {
      type: 'post',
      title: title,
      url: url,
      description: description,
      content: contentPreview,
      categories: categories,
      tags: tags,
      date: date
    };
    items.push(postItem);
  });
  console.log(`Added ${files.length} posts, total items so far: ${items.length}`);
}

// Add categories
const categoriesDir = path.join(__dirname, '../public/categories');
if (fs.existsSync(categoriesDir)) {
  const categoryDirs = fs.readdirSync(categoriesDir).filter(f => {
    const fullPath = path.join(categoriesDir, f);
    return fs.statSync(fullPath).isDirectory();
  });
  
  categoryDirs.forEach(catName => {
    const catPath = path.join(categoriesDir, catName);
    const htmlFiles = [];
    
    function countFiles(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          countFiles(filePath);
        } else if (file === 'index.html') {
          htmlFiles.push(filePath);
        }
      });
    }
    
    countFiles(catPath);
    
    const catItem = {
      type: 'category',
      title: catName,
      url: `/categories/${catName}/`,
      count: htmlFiles.length,
      categories: [catName]
    };
    items.push(catItem);
  });
  console.log(`Added ${categoryDirs.length} categories, total items: ${items.length}`);
}

// Write JSON
const json = JSON.stringify(items, null, 2);
fs.writeFileSync(outputFile, json, 'utf8');

console.log(`Search index generated: ${outputFile}`);
console.log(`Total items: ${items.length}`);

