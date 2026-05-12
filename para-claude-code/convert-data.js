const fs = require('fs');
const path = require('path');

// Read concelhos file
const concelhosPath = path.join(__dirname, 'concelhos-corrigido.js');
let concelhosContent = fs.readFileSync(concelhosPath, 'utf-8');

// Convert export const to var format
concelhosContent = concelhosContent.replace('export const CONCELHOS = ', 'var concelhos = ');

// Extract just the array content (everything after 'var concelhos = ')
const concelhosMatch = concelhosContent.match(/var concelhos = \[([\s\S]*)\];/);
if (!concelhosMatch) {
  console.error('Could not extract concelhos array');
  process.exit(1);
}

const concelhosArray = 'var concelhos = [' + concelhosMatch[1] + '];';

// Write to output file
const outputPath = path.join(__dirname, 'concelhos-for-html.txt');
fs.writeFileSync(outputPath, concelhosArray);

console.log(`✓ Converted concelhos-corrigido.js to concelhos-for-html.txt`);
console.log(`  Array size: ${concelhosArray.length} characters`);

// Count entries
const entryCount = (concelhosArray.match(/\"name\"/g) || []).length;
console.log(`  Total entries: ${entryCount}`);
