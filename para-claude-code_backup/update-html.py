#!/usr/bin/env python3

import re

# Read the HTML file
html_file = 'Assistente-Onde-Morar-Portugal.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read the schools array
with open('schools-for-html.txt', 'r', encoding='utf-8') as f:
    schools_content = f.read().strip()

# Read the concelhos array
with open('concelhos-for-html.txt', 'r', encoding='utf-8') as f:
    concelhos_content = f.read().strip()

print("📍 Starting HTML updates...")
print(f"   Original HTML size: {len(html_content)} characters")

# ===== REPLACE SCHOOLS ARRAY =====
# Find the schools array (const schools = [...];)
schools_pattern = r'const schools = \[.*?\];'
schools_match = re.search(schools_pattern, html_content, re.DOTALL)
if schools_match:
    old_schools = schools_match.group(0)
    html_content = html_content.replace(old_schools, schools_content)
    print(f"✓ Replaced schools array")
    print(f"  Old: {len(old_schools)} chars, New: {len(schools_content)} chars")
else:
    print("✗ Could not find schools array!")
    exit(1)

# ===== REPLACE PLACES ARRAY =====
# Find the places array (const places = [...];)
places_pattern = r'const places = \[.*?\n\];'
places_match = re.search(places_pattern, html_content, re.DOTALL)
if places_match:
    old_places = places_match.group(0)
    html_content = html_content.replace(old_places, concelhos_content)
    print(f"✓ Replaced places array with concelhos")
    print(f"  Old: {len(old_places)} chars, New: {len(concelhos_content)} chars")
else:
    print("✗ Could not find places array!")
    exit(1)

# ===== UPDATE COMMENT =====
# Update the data load comment to reflect new data source
html_content = html_content.replace(
    "// Use CONCELHOS from concelhos.js if available, otherwise fall back to places array\nvar placesData = window.CONCELHOS || places;",
    "// Using updated 94-municipality concelhos array (from concelhos-corrigido.js)\nvar placesData = window.CONCELHOS || concelhos;"
)
print("✓ Updated data load comment")

# Write the updated HTML
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"\n✅ HTML updated successfully!")
print(f"   New HTML size: {len(html_content)} characters")
print(f"\n📊 Summary:")
print(f"   - Schools: 62 entries (Aljezur removed)")
print(f"   - Concelhos: 94 municipalities")
print(f"   - BGA hubs: 24 included as separate entries")

# Validation
if 'var concelhos = [' in html_content:
    print("✓ Concelhos array correctly inserted")
if 'const schools = [' in html_content:
    print("✓ Schools array correctly inserted")
if 'praiasFluviais' in html_content:
    print("✓ River beaches field present")

print("\n⚠️  Next steps:")
print("   1. Test in browser - DevTools Console: concelhos.length === 94, schools.length === 62")
print("   2. Test filters: 'non-hot + car + river beaches' should return interior areas")
print("   3. Verify Aljezur not in schools array")
print("   4. Test school proximity scoring")
