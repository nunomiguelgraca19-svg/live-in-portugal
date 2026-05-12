"""
Correcção do concelhos.js do Portugal Expat Home.
Lê uploads/concelhos.js, aplica correcções, escreve concelhos-corrigido.js.
"""
import json, re, sys

SRC = '/sessions/serene-zealous-tesla/mnt/uploads/concelhos.js'
OUT = '/sessions/serene-zealous-tesla/mnt/Portugal Expat Home/concelhos-corrigido.js'

with open(SRC, 'r', encoding='utf-8') as f:
    txt = f.read()
data_str = re.sub(r'^export const CONCELHOS\s*=\s*', '', txt).rstrip().rstrip(';')
data = json.loads(data_str)

# --- 1. DEDUPLICAR (manter primeiro) ---
seen = set()
deduped = []
for c in data:
    key = (c['name'], c['district'])
    if key in seen:
        continue
    seen.add(key)
    deduped.append(c)
data = deduped

# --- 2. CORRIGIR TYPO ---
for c in data:
    if c['name'] == 'Monchaique':
        c['name'] = 'Monchique'

# --- 3. CORRIGIR RATINGS PRAIAS FLUVIAIS ---
# Mapa name -> novo PF (só onde alterar; outros mantêm-se)
pf_fix = {
    # Setúbal costeiro: 4 -> 0
    'Setúbal': 0, 'Almada': 0, 'Sesimbra': 0, 'Grândola': 0, 'Santiago do Cacém': 0,
    'Sines': 0, 'Odemira': 1,
    # Alentejo estuarino: 3 -> 1 (têm estuário do Tejo/Sado, sem praias fluviais conhecidas)
    'Alcochete': 1, 'Alcácer do Sal': 1, 'Palmela': 0,
    # Restantes em redor do Tejo: baixar para 1 (acesso a rio, não praias fluviais)
    'Barreiro': 1, 'Moita': 1, 'Montijo': 1, 'Seixal': 1,
    # Centro atlântico: 4 -> 1
    'Figueira da Foz': 1,
    # Algarve: 4/3 -> 0 (praticamente sem praias fluviais)
    'Faro': 0, 'Loulé': 1, 'Albufeira': 0, 'Lagos': 0, 'Lagoa': 0, 'Portimão': 0,
    # Norte costeiro: 4/3 -> 3 (Minho tem praias fluviais reais, Viana/Caminha/Ponte de Lima)
    'Viana do Castelo': 3, 'Caminha': 3, 'Ponte de Lima': 4, 'Monção': 3,
    # Madeira: 4/3 -> 0 (piscinas naturais, não praias fluviais clássicas)
    'Câmara de Lobos': 0, 'Machico': 0, 'Funchal': 0, 'Santana': 1,
    # Açores: 3 -> 1 (lagoas vulcânicas, não praias fluviais)
    'Ponta Delgada': 1, 'Angra do Heroísmo': 1, 'Horta': 1,
    # Porto/Grande Porto costeiros: 3 -> 1 (Douro no VN Gaia/Porto sim, mas sem praias)
    'Matosinhos': 0, 'Póvoa de Varzim': 0, 'Vila do Conde': 1,
    'Porto': 1, 'Vila Nova de Gaia': 1,
    # Aveiro atlântico: 3 -> 1
    'Espinho': 0, 'Ílhavo': 0, 'Ovar': 0, 'Águeda': 2,
    'Santa Maria da Feira': 1, 'São João da Madeira': 1,
    # Aveiro: tinha 4 -> 2 (Ria, não é praia fluvial)
    'Aveiro': 2,
    # Lisboa greater area costeiro: 3 -> 0
    'Cascais': 0, 'Mafra': 0, 'Oeiras': 0, 'Sintra': 1, 'Lisboa': 1,
    # Leiria costa: 3 -> 0
    'Peniche': 0, 'Nazaré': 0, 'Óbidos': 1, 'Caldas da Rainha': 2,
    'Leiria': 2,
    # Centro Braga: 3 -> 2 (tem Cávado/Homem mas poucas praias fluviais famosas)
    'Braga': 2, 'Guimarães': 2, 'Barcelos': 2, 'Vila Verde': 3,
    # Coimbra: 3 -> 3 (tem Mondego, mantém)
    'Coimbra': 3,
    # Serra da Estrela — SUBIR
    'Manteigas': 5,   # Covão d'Ametade, Loriga
    'Seia': 4,        # Loriga, rio Alva  (4->4 já é)
    'Gouveia': 4,     # rio Mondego
    # Guarda mantém 3
    # Beira Interior continental
    'Pinhel': 2, 'Trancoso': 2, 'Meda': 2, 'Sabugal': 3,  # Sabugal tem rio Côa
    'Almeida': 2, 'Figueira de Castelo Rodrigo': 2,
    'Fornos de Algodres': 2, 'Celorico da Beira': 2,
    'Vila Nova de Foz Côa': 3,  # Douro Internacional
    # Covilhã - tem acesso a praias fluviais da Serra da Estrela próximas
    'Covilhã': 4,
    # Evora/Portalegre/Castelo Branco/Viseu/Estremoz (interior) manter ou baixo
    'Évora': 1, 'Portalegre': 2, 'Castelo Branco': 3, 'Viseu': 3, 'Estremoz': 1,
    'Beja': 1, 'Chaves': 3,  # Chaves tem rio Tâmega
}
for c in data:
    if c['name'] in pf_fix:
        c['ratings']['praiasFluviais'] = pf_fix[c['name']]

# --- 4. ADICIONAR 13 CONCELHOS EM FALTA ---
# Todos da região centro-interior com praias fluviais reais (PF=5 excepto notados)
def make(name, region, district, lat, lon, buyM2, rentM2, rentT2_min, rentT2_max,
         climate, tags, ratings_custom, pros, cons, notes):
    # ratings base depois overridable
    r = {
        'expat': 1, 'transport': 1, 'nature': 5, 'beach': 0,
        'healthcare': 2, 'airport': 2, 'schools': 2, 'quiet': 5, 'culture': 2,
        'gastronomia': 3, 'vidaNocturna': 1, 'praiasFluviais': 5, 'infantil': 3,
    }
    r.update(ratings_custom)
    return {
        'name': name, 'region': region, 'district': district,
        'lat': lat, 'lon': lon,
        'buyM2': buyM2, 'rentM2': rentM2,
        'rentT2': {'min': rentT2_min, 'max': rentT2_max},
        'trend': '+2% ano',
        'climate': climate,
        'tags': tags,
        'ratings': r,
        'pros': pros, 'cons': cons,
        'notes': notes,
    }

novos = [
    make('Arganil', 'Centro', 'Coimbra', 40.2181, -8.0533,
         1250, 6.0, 350, 500, 'continental',
         ['mountain','nature','river','quiet','historic'],
         {'gastronomia': 4, 'praiasFluviais': 5},
         ['Piódão (aldeia histórica)','Côja (praia fluvial)','Serra do Açor'],
         ['Interior','Pouco transporte público'],
         'Piódão UNESCO. Côja tem praia fluvial bandeira azul no rio Alva.'),
    make('Góis', 'Centro', 'Coimbra', 40.1548, -8.1125,
         900, 5.0, 300, 450, 'continental',
         ['mountain','nature','river','quiet'],
         {'praiasFluviais': 5},
         ['Praia fluvial Peneda (Bandeira Azul)','Rio Ceira','Natureza'],
         ['Muito remoto','Inverno frio'],
         'Peneda é uma das praias fluviais mais premiadas do país.'),
    make('Pampilhosa da Serra', 'Centro', 'Coimbra', 40.0439, -7.9514,
         700, 4.0, 250, 400, 'mountain',
         ['mountain','nature','river','quiet','dark-sky'],
         {'praiasFluviais': 5, 'expat': 2},
         ['Janeiro de Baixo (praia fluvial)','Céu escuro (astroturismo)','Rio Zêzere'],
         ['Muito remoto','População envelhecida'],
         'Dark Sky Reserve. Janeiro de Baixo é praia fluvial de referência.'),
    make('Oleiros', 'Centro', 'Castelo Branco', 39.9167, -7.9167,
         750, 4.5, 250, 400, 'mountain',
         ['mountain','nature','river','quiet'],
         {'praiasFluviais': 5, 'gastronomia': 4},
         ['Praia fluvial Álvaro','Rio Zêzere','Caça e pesca'],
         ['Remoto','Poucos serviços'],
         'Praia fluvial de Álvaro. Beira Baixa profunda.'),
    make('Proença-a-Nova', 'Centro', 'Castelo Branco', 39.7517, -7.9128,
         850, 5.0, 300, 450, 'mountain',
         ['nature','river','quiet','unesco'],
         {'praiasFluviais': 5},
         ['Aldeia Ruiva (praia fluvial)','Fróia','Geopark Naturtejo'],
         ['Remoto','Inverno frio'],
         'Aldeia Ruiva e Fróia entre as melhores praias fluviais do país.'),
    make('Mação', 'Centro', 'Santarém', 39.5522, -7.9947,
         800, 5.0, 300, 450, 'mediterranean',
         ['nature','river','quiet','prehistoric'],
         {'praiasFluviais': 5, 'culture': 3},
         ['Carvoeiro (praia fluvial Bandeira Azul)','Rio Tejo','Arte rupestre'],
         ['Remoto','Estradas sinuosas'],
         'Carvoeiro tem praia fluvial premiada. Arte rupestre.'),
    make('Sertã', 'Centro', 'Castelo Branco', 39.8019, -8.0958,
         900, 5.0, 350, 500, 'mediterranean',
         ['nature','river','quiet','gastronomy'],
         {'praiasFluviais': 5, 'gastronomia': 5},
         ['Trízio (praia fluvial)','Pedrógão Pequeno','Maranho (prato típico)'],
         ['Interior','Verões quentes'],
         'Trízio no rio Zêzere. Gastronomia notável (maranho, bucho).'),
    make('Vila Velha de Ródão', 'Centro', 'Castelo Branco', 39.6569, -7.6739,
         650, 4.0, 250, 400, 'mediterranean',
         ['nature','river','quiet','unesco','rock-art'],
         {'praiasFluviais': 4},
         ['Portas de Ródão','Foz do Cobrão','Arte rupestre do Tejo'],
         ['Muito pequeno','Pouco serviços'],
         'Portas de Ródão geomonumento. Foz do Cobrão.'),
    make('Belmonte', 'Centro', 'Castelo Branco', 40.3581, -7.3494,
         950, 5.0, 300, 450, 'continental',
         ['historic','river','culture','nature'],
         {'praiasFluviais': 4, 'culture': 4, 'healthcare': 3},
         ['Berço Pedro Álvares Cabral','Comunidade judaica histórica','Rio Zêzere'],
         ['Inverno frio','Pequena cidade'],
         'Terra natal de Pedro Álvares Cabral. Herança judaica.'),
    make('Fundão', 'Centro', 'Castelo Branco', 40.1397, -7.5006,
         1100, 5.5, 350, 550, 'continental',
         ['agriculture','river','nature','tech'],
         {'praiasFluviais': 4, 'expat': 2, 'healthcare': 3, 'gastronomia': 4, 'transport': 2},
         ['Cerejas','Serra da Gardunha','Fundão Tech'],
         ['Inverno frio','Verão muito quente'],
         'Capital da cereja. Startups e teletrabalho.'),
    make('Penacova', 'Centro', 'Coimbra', 40.2717, -8.2847,
         1100, 5.5, 350, 550, 'mediterranean',
         ['river','nature','quiet'],
         {'praiasFluviais': 4, 'transport': 2, 'healthcare': 3},
         ['Rio Mondego','Penedos de Góis a 30min','Lampreia'],
         ['Pequeno','Sem vida nocturna'],
         'Vista de S. Pedro de Alva. Desportos no Mondego.'),
    make('Tábua', 'Centro', 'Coimbra', 40.3575, -8.0281,
         900, 5.0, 300, 450, 'mediterranean',
         ['river','nature','quiet'],
         {'praiasFluviais': 4},
         ['Rio Alva/Mondego','Verdes paisagens'],
         ['Pequeno','Serviços limitados'],
         'Confluência Alva-Mondego. Paisagem rural.'),
    make('Castanheira de Pera', 'Centro', 'Leiria', 40.0083, -8.2111,
         750, 4.5, 250, 400, 'mediterranean',
         ['river','nature','quiet','leisure'],
         {'praiasFluviais': 5, 'infantil': 4},
         ['Praia das Rocas (praia fluvial artificial)','Poço Corga','Fátima perto'],
         ['Muito pequeno','Inverno solitário'],
         'Praia das Rocas é piscina fluvial com bandeira azul — óptimo com crianças.'),
]

data.extend(novos)

# Ordenar alfabeticamente
data.sort(key=lambda c: c['name'])

# --- 5. ESCREVER FICHEIRO ---
out = 'export const CONCELHOS = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(out)

print(f"✓ Total final: {len(data)} concelhos")
print(f"✓ Ficheiro: {OUT}")

# Verificação
print("\n=== VERIFICAÇÃO Praias Fluviais (top 20) ===")
top = sorted(data, key=lambda c: (-c['ratings']['praiasFluviais'], c['name']))
for c in top[:20]:
    pf = c['ratings']['praiasFluviais']
    print(f"  PF={pf}  {c['name']:30s} ({c['district']})")

print("\n=== NENHUM DUPLICADO? ===")
from collections import Counter
dups = {n:k for n,k in Counter(c['name'] for c in data).items() if k>1}
print("Duplicados:", dups if dups else "nenhum")
