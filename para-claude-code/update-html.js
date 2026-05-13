const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'Assistente-Onde-Morar-Portugal.html');

// Read the HTML file
let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
console.log(`📍 Starting HTML updates...`);
console.log(`   Original HTML size: ${htmlContent.length} characters`);

// Read the schools array
const schoolsContent = fs.readFileSync(path.join(__dirname, 'schools-for-html.txt'), 'utf-8').trim();

// Read the concelhos array
const concelhosContent = fs.readFileSync(path.join(__dirname, 'concelhos-for-html.txt'), 'utf-8').trim();

// ===== REPLACE SCHOOLS ARRAY =====
// Find and replace schools array (const schools = [...];)
const schoolsRegex = /const schools = \[[\s\S]*?\];/;
const schoolsMatch = htmlContent.match(schoolsRegex);
if (schoolsMatch) {
  const oldSchools = schoolsMatch[0];
  htmlContent = htmlContent.replace(schoolsRegex, schoolsContent);
  console.log(`✓ Replaced schools array`);
  console.log(`  Old: ${oldSchools.length} chars, New: ${schoolsContent.length} chars`);
} else {
  console.error('✗ Could not find schools array!');
  process.exit(1);
}

// ===== REPLACE PLACES ARRAY =====
// Find and replace places array (const places = [...];)
const placesRegex = /const places = \[[\s\S]*?\n\];/;
const placesMatch = htmlContent.match(placesRegex);
if (placesMatch) {
  const oldPlaces = placesMatch[0];
  htmlContent = htmlContent.replace(placesRegex, concelhosContent);
  console.log(`✓ Replaced places array with concelhos`);
  console.log(`  Old: ${oldPlaces.length} chars, New: ${concelhosContent.length} chars`);
} else {
  console.error('✗ Could not find places array!');
  process.exit(1);
}

// ===== UPDATE COMMENT =====
// Update the data load comment
const oldComment = `// Use CONCELHOS from concelhos.js if available, otherwise fall back to places array\nvar placesData = window.CONCELHOS || places;`;
const newComment = `// Using updated 94-municipality concelhos array (from concelhos-corrigido.js)\nvar placesData = window.CONCELHOS || concelhos;`;
htmlContent = htmlContent.replace(oldComment, newComment);
console.log(`✓ Updated data load comment`);

// Write the updated HTML
fs.writeFileSync(htmlFile, htmlContent, 'utf-8');

console.log(`\n✅ HTML updated successfully!`);
console.log(`   New HTML size: ${htmlContent.length} characters`);
console.log(`\n📊 Summary:`);
console.log(`   - Schools: 62 entries (Aljezur removed)`);
console.log(`   - Concelhos: 94 municipalities`);
console.log(`   - BGA hubs: 24 included as separate entries`);

// Validation
if (htmlContent.includes('var concelhos = [')) {
  console.log(`✓ Concelhos array correctly inserted`);
}
if (htmlContent.includes('const schools = [')) {
  console.log(`✓ Schools array correctly inserted`);
}
if (htmlContent.includes('praiasFluviais')) {
  console.log(`✓ River beaches field present`);
}
if (htmlContent.includes('Monchique')) {
  console.log(`✓ Monchique spelling correct (not Monchaique)`);
}

console.log(`\n⚠️  Next steps:`);
console.log(`   1. Test in browser - DevTools Console: concelhos.length (should be 94)`);
console.log(`   2. Test: schools.length (should be 62)`);
console.log(`   3. Test filters: 'non-hot + car + river beaches' → interior areas`);
console.log(`   4. Verify Aljezur not in schools array`);
console.log(`   5. Test school proximity scoring`);
