const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, '..', 'site-actual', 'Assistente-Onde-Morar-Portugal.html');

// Read files
let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
const scorePlaceFile = fs.readFileSync(path.join(__dirname, 'scorePlace-corrigido.js'), 'utf-8');

console.log(`📍 Starting scorePlace function replacement...`);
console.log(`   Original HTML size: ${htmlContent.length} characters`);

// Extract the new scorePlace function and scoreInternationalSchools from the file
// Remove the comments at the beginning
const cleanScorePlaceContent = scorePlaceFile
  .split('\n')
  .slice(14) // Skip the header comments (lines 1-14)
  .join('\n')
  .trim();

// Find and replace the entire scorePlace function
const scorePlaceRegex = /function scorePlace\(p\) \{[\s\S]*?\n\}/;
const scoreMatch = htmlContent.match(scorePlaceRegex);

if (scoreMatch) {
  const oldScorePlace = scoreMatch[0];
  htmlContent = htmlContent.replace(scorePlaceRegex, cleanScorePlaceContent);
  console.log(`✓ Replaced scorePlace function`);
  console.log(`  Old: ${oldScorePlace.length} chars, New: ${cleanScorePlaceContent.length} chars`);
} else {
  console.error('✗ Could not find scorePlace function!');
  process.exit(1);
}

// Write the updated HTML
fs.writeFileSync(htmlFile, htmlContent, 'utf-8');

console.log(`\n✅ scorePlace function updated successfully!`);
console.log(`   New HTML size: ${htmlContent.length} characters`);
console.log(`\n📊 Changes in scorePlace function:`);
console.log(`   1. Budget: Hard filter at 1.5× (NOVO)`);
console.log(`   2. Climate: Fuzzy matrix 4×6 (antes era 2 opções)`);
console.log(`   3. Healthcare: Só para family/retired (antes era automático)`);
console.log(`   4. Escolas intl: Top 3 com pesos (1.0/0.6/0.3) em vez de só 1ª`);
console.log(`   5. scoreInternationalSchools helper adicionado`);

console.log(`\n✓ Verification:`);
if (htmlContent.includes('function scorePlace(p) {')) {
  console.log('✓ scorePlace function present');
}
if (htmlContent.includes('function scoreInternationalSchools(p, hasCar) {')) {
  console.log('✓ scoreInternationalSchools helper present');
}
if (htmlContent.includes('CLIMATE_MATRIX')) {
  console.log('✓ Climate fuzzy matrix present');
}
if (htmlContent.includes('Hard filter')) {
  console.log('✓ Budget hard filter comment present');
}

console.log('\n⚠️  Testing required:');
console.log('   - Open HTML in browser');
console.log('   - Run all 3 test profiles to verify scoring');
console.log('   - Check DevTools Console for errors');
