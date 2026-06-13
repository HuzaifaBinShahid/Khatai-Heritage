const fs = require('fs');
const path = require('path');

const dir = '/Users/huzaifabinshahid/Documents/Projects/Khatai-Heritage';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    if (file === 'node_modules' || file === '.next' || file === '.git') return;
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.ts') || filepath.endsWith('.tsx') || filepath.endsWith('.js') || filepath.endsWith('.jsx')) {
        filelist.push(filepath);
      }
    }
  });
  return filelist;
};

const files = walkSync(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replacements for dash
  content = content.replace(/ /g, ' ');
  content = content.replace(/ /g, ' ');
  content = content.replace(/ /g, ' ');

  // Replacements for ghee
  content = content.replace(//gi, '');
  content = content.replace(//gi, '');
  content = content.replace(//gi, '');
  content = content.replace(//gi, '');
  content = content.replace(//gi, '');
  content = content.replace(//gi, '');
  content = content.replace(/, /gi, ', ');
  content = content.replace(//gi, '');
  content = content.replace(/the /gi, 'the ');
  content = content.replace(//gi, '');
  content = content.replace(/sweet , followed by /gi, '');
  content = content.replace(/"", /g, '');
  content = content.replace(/" cookies",\n/g, '');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
