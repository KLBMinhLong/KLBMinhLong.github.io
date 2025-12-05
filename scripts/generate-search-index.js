// Generate search-index.json from Hugo content
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content/posts');
const outputFile = path.join(__dirname, '../public/search-index.json');

console.log('Generating search index...');

const items = [];

// Read all markdown files (exclude _index)
let categoryCounter = {};
if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
  
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
    // Normalize category names
    categories = categories.map(c => c.replace(/^[-\s]+/, '').trim());
    
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

    // Count categories
    categories.forEach(cat => {
      if (!cat) return;
      categoryCounter[cat] = (categoryCounter[cat] || 0) + 1;
    });
  });
console.log(`Added ${files.length} posts, total items so far: ${items.length}`);
}

// Add categories aggregated from posts
Object.entries(categoryCounter).forEach(([cat, count]) => {
  const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
  items.push({
    type: 'category',
    title: cat,
    url: `/categories/${catSlug}/`,
    count: count,
    categories: [cat]
  });
});

// Write JSON
const json = JSON.stringify(items, null, 2);
fs.writeFileSync(outputFile, json, 'utf8');

console.log(`Search index generated: ${outputFile}`);
console.log(`Total items: ${items.length}`);

