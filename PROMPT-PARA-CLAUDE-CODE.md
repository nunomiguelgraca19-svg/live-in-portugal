# Prompt para Claude Code — Portugal Expat Home

## Contexto

Estou a construir um site chamado **Portugal Expat Home** — um site estático (HTML/CSS/JS puro, sem framework) para ajudar expatriados a encontrar onde viver em Portugal. O site já tem uma versão funcional que precisa de ser revista, melhorada e publicada.

Nesta pasta tens **todo o código-fonte actual** e **toda a documentação técnica**. Usa esta informação como base, revendo e melhorando onde necessário.

---

## Estrutura da pasta

```
para-claude-code/
├── PROMPT-PARA-CLAUDE-CODE.md    ← ESTE FICHEIRO (lê primeiro)
├── site-actual/                   ← Código-fonte actual do site (5 ficheiros HTML)
│   ├── index.html                 ← Landing page com slideshow (imagens Unsplash)
│   ├── Assistente-Onde-Morar-Portugal.html  ← FICHEIRO PRINCIPAL (~1547 linhas)
│   │                                         Questionário 8 perguntas + motor scoring + resultados
│   ├── servicos.html              ← Página de serviços e preços
│   ├── sobre-nos.html             ← Sobre nós + formulário contacto (Formspree)
│   └── blog-nif-portugal.html     ← Artigo blog: como obter NIF em Portugal
└── documentacao/                  ← Documentação técnica e dados
    ├── Documentacao-Scoring-Questionario.md  ← Fórmulas detalhadas do motor de scoring
    ├── NOTAS-dados-reais-necessarios.md      ← Lista de fontes de dados por integrar
    ├── TAREFAS-NUNO.md                       ← Lista completa de tarefas pendentes
    ├── Pesquisa-Dificuldades-Expats-Habitacao.md ← Research sobre dificuldades dos expats
    ├── Base-Dados-Saude-Educacao-Portugal.xlsx    ← Coordenadas GPS: hospitais + escolas
    └── Fontes-Dados-Publicos-Portugal.xlsx        ← Fontes públicas de dados imobiliários
```

---

## Especificação técnica do site

### Stack
- **HTML5 + CSS3 + JavaScript vanilla** (ES5 compatível, sem transpiler)
- **Sem framework**, sem npm, sem build system
- Cada ficheiro é self-contained (CSS e JS inline no HTML)
- Site 100% estático (sem backend, sem base de dados)
- Responsivo (mobile-first com CSS grid auto-fill)

### Design system
- Cores: `--blue: #1F4E79`, `--mid-blue: #2E75B6`, `--accent: #ED7D31`, `--green: #70AD47`, `--bg: #F8FAFB`
- Font: `'Segoe UI', system-ui, -apple-system, sans-serif`
- Cards com `border-radius: 12px`, sombras suaves `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- Animações `fadeIn` suaves (opacity + translateY)

### Internacionalização (i18n)
- 3 idiomas: EN (default), FR, PT
- Barra de língua no topo (`.lang-bar`)
- Todas as strings no objecto `i18n = { en: {...}, fr: {...}, pt: {...} }`
- Função `t(key)` retorna string na língua activa
- Elementos HTML usam `data-t="key"` para auto-tradução

---

## Ficheiro principal: Assistente-Onde-Morar-Portugal.html

### Questionário — 8 passos sequenciais

| Passo | Pergunta | Variável | Valores possíveis |
|-------|----------|----------|-------------------|
| 1 | Comprar ou arrendar? | `answers.mode` | `'rent'` \| `'buy'` |
| 2 | Orçamento? | `answers.rentBudget` ou `answers.buyBudget` | Renda: 300-3000€/mês. Compra: 50k-1M€ |
| 3 | Agregado familiar? | `answers.household` | `'solo'` \| `'couple'` \| `'family'` \| `'retired'` |
| 4 | Tipo de escola? (só family) | `answers.schoolPref` | `'international'` \| `'portuguese'` \| `'undecided'` |
| 5 | Tem carro? | `answers.mobility` | `'car'` \| `'public'` \| `'maybe'` |
| 6 | Situação de trabalho? | `answers.work` | `'remote'` \| `'local_job'` \| `'pension'` \| `'entrepreneur'` \| `'student'` |
| 7 | Clima preferido? | `answers.climate` | `'hot'` \| `'mild'` \| `'oceanic'` \| `'subtropical'` \| `'any'` |
| 8 | Prioridades? (multi-select, até 5) | `answers.priorities` | Array de: `beach, culture, schools, healthcare, airport, transport, nature, quiet, expat` |

### Bases de dados embebidas no JS

**47 zonas** (`const places = [...]`), cada uma com:
```javascript
{
  name: "Arroios",
  region: "Lisboa",
  district: "Lisboa",
  lat: 38.7310, lon: -9.1370,        // Coordenadas GPS
  buyM2: 5245,                         // Preço compra €/m²
  rentM2: 20,                          // Renda €/m²
  rentT2: [1200, 1800],               // Renda T2 [mín, máx] €/mês
  trend: "+6.3%",                      // Tendência de preço
  climate: ["mild"],                   // Clima(s) aplicáveis
  tags: ["urban"],                     // Tags (urban, quiet, nightlife, coastal, rural, etc.)
  expat: 4,                            // Rating 1-5: comunidade expat
  transport: 5,                        // Rating 1-5: transportes públicos
  nature: 1,                           // Rating 1-5: natureza
  beach: 0,                            // Rating 1-5: litoral (0 = interior)
  healthcare: 5,                       // Rating 1-5: saúde
  airport: 5,                          // Rating 1-5: aeroporto
  schools: 3,                          // Rating 1-5: escolas
  quiet: 2,                            // Rating 1-5: sossego
  culture: 5,                          // Rating 1-5: cultura
  pros: ["Diverse", "Central", "Metro"], // Pontos fortes
  cons: ["Noisy", "Gentrifying"],       // Pontos fracos
  notes: "Multicultural. Budget-friendly in Lisbon." // Notas
}
```

**30 escolas internacionais** (`const schools = [...]`):
```javascript
{ name: "St. Julian's School", lat: 38.6850, lon: -9.3310, curriculum: "British/IB", lang: "EN", bilingual: false, ages: "3-18", fees: "€8k-€18k" }
```

**21+ hospitais públicos** (`const hospitalsPublic = [...]`):
```javascript
{ name: "Hospital de Santa Maria", lat: 38.7490, lon: -9.1600 }
```

**15+ hospitais privados** (`const hospitalsPrivate = [...]`):
```javascript
{ name: "Hospital da Luz (Lisboa)", lat: 38.7480, lon: -9.1830 }
```

### Motor de scoring (`function scorePlace(p)`)

**Score = (pontos obtidos / pontos máximos) × 100%**

Os pontos máximos variam por perfil (família tem mais escolas, reformado tem mais saúde).

| Componente | Pontos máx. | Lógica resumida |
|---|---|---|
| **Orçamento** | 20 | 20pts se dentro do budget, 12pts se até +15%, 4pts se até +30%, 0 acima |
| **Clima** | 10 | 10pts se match ou "any", 2pts se diferente |
| **Agregado** | 10 | Varia por tipo: família avalia escolas+saúde+sossego; reformado avalia saúde+sossego+natureza; casal avalia cultura+sossego+transportes; solo avalia transportes+cultura+expat |
| **Trabalho** | 10 | Remote: expat+base+transporte. Local: transporte+urban+cidade grande. Pensão: sossego+natureza+saúde. Estudante: transporte+urban+cidade universitária |
| **Escolas** | 5-25 | Família=25pts (GPS proximidade escola internacional OU rating escolas portuguesas). Não-família=5pts só se seleccionou "schools" nas prioridades |
| **Saúde** | 10-25 | Reformado=25pts (GPS hospital público+privado). Outros=10pts (GPS hospital público) |
| **Prioridades** | 15 | 15pts divididos igualmente pelas prioridades escolhidas. Cada prioridade avaliada pelo rating 1-5 da zona |

### Filtro rígido de orçamento (aplicado ANTES do scoring)

```javascript
var budgetCeiling = answers.mode === 'rent' ? answers.rentBudget * 1.25 : answers.buyBudget * 1.25;
var affordable = scored.filter(function(p) {
    if (answers.mode === 'rent') {
        var avgRent = (p.rentT2[0] + p.rentT2[1]) / 2;
        return avgRent <= budgetCeiling;
    } else {
        return (p.buyM2 * 80) <= budgetCeiling;
    }
});
```
Zona só aparece nos resultados se preço ≤ orçamento × 1.25.

### Função proximidade GPS

```javascript
function haversine(lat1, lon1, lat2, lon2) { /* distância em km */ }
function proximityScore(distKm, hasCar) {
    var ref = hasCar ? 10 : 3;  // 10km referência com carro, 3km sem
    return 10 / (1 + distKm / ref);
}
function findClosest(place, facilities, count) { /* encontra N facilities mais próximas */ }
```

### Sistema mismatch (quando resultados fracos)

Activa quando: (a) 0 zonas passam filtro de orçamento, ou (b) melhor score < 55%.

Testa 4 cenários por ordem:
1. **Aumentar orçamento** — testa budgets predefinidos até score ≥ 55%
2. **Remover prioridade** — testa remover cada uma, escolhe a que mais desbloqueia
3. **Considerar arrendar** (só se modo=compra) — equivalente mensal ≈ orçamento × 0.004
4. **Aceitar qualquer clima** — testa sem restrição climática

Cada cenário mostra: título, descrição, preview do melhor resultado, e botão que aplica a alteração e recalcula.

### Resultados

- Top 3 por defeito, botão "Show more" para ver todos
- Cada card mostra: match %, nome, região, preço (verde se dentro do budget, vermelho se acima), pros/cons, notas
- Secção de proximidade: hospital público mais próximo + privado + escola (se família)
- Dois caminhos de saída:
  - "Quero ajuda" → WhatsApp (+351936655954) + email
  - "Explorar sozinho" → links Idealista/Imovirtual/Casa Sapo filtrados pela zona

---

## Outros ficheiros do site

### index.html (Landing page)
- Slideshow com 5 imagens Unsplash
- Call-to-action para o questionário
- Secções: Hero, Benefits, How it works, CTA
- Links para todas as páginas

### servicos.html (Serviços)
- Lista de serviços com preços indicativos:
  - Visita acompanhada: €75
  - NIF: €120
  - Conta bancária: €90
  - Revisão contrato: €150
  - Procuração: €250
  - Pacote completo: €650

### sobre-nos.html (Sobre nós)
- Formulário de contacto configurado para Formspree
- `action="https://formspree.io/f/TEUFORMID"` (ID por substituir)
- WhatsApp: +351936655954

### blog-nif-portugal.html (Blog)
- Artigo: "Como obter o NIF em Portugal (2026)"
- Estrutura de blog post com SEO meta tags

---

## Contactos configurados
- WhatsApp: `+351936655954`
- Email: `info@portugalexpathome.com` (provisório, será alterado com domínio)
- Formspree: `TEUFORMID` (Nuno precisa criar conta e substituir)

## Hosting planeado
- **Netlify** (deploy drag-and-drop)
- **Domínio**: `portugaldreamhome.com` ou `.pt` (por comprar)

---

## O que falta / Melhorias pendentes

### Prioridade alta
- [ ] Rever todo o código e melhorar qualidade/organização
- [ ] Formspree: configurar com ID real
- [ ] Google Analytics: adicionar snippet
- [ ] Favicon
- [ ] Verificar que todos os links entre páginas funcionam
- [ ] SEO: melhorar meta tags, structured data
- [ ] Performance: optimizar CSS/JS se necessário

### Prioridade média
- [ ] Mais artigos de blog (SEO): "D7 visa", "Cost of living Lisbon vs Porto", "IFICI tax regime"
- [ ] Expandir base de dados: de 47 zonas para mais (quando houver dados)
- [ ] Estimativa custo total por localização: renda + utilidades + alimentação + transporte + escola + saúde
- [ ] Separadores no site por categoria de custos

### Nice to have
- [ ] Botão "Indeciso" no passo 1 (comprar vs arrendar) que corra ambos cenários
- [ ] Filtro estado conservação nos preços
- [ ] Newsletter signup (Mailchimp ou similar)
- [ ] Testemunhos de clientes

---

## Notas importantes

1. **Os ratings (1-5) das zonas são estimativas manuais**, não dados extraídos. Ver `documentacao/NOTAS-dados-reais-necessarios.md` para fontes que podem melhorar isto.
2. **O site destina-se a expatriados** (público internacional). O idioma principal é inglês.
3. **Não somos mediadores imobiliários (AMI)**. Fazemos acompanhamento e burocracia.
4. **Todos os ficheiros devem ficar self-contained** (CSS+JS inline) a menos que haja razão forte para separar.
5. **Os dados de preços** vêm maioritariamente do Idealista (consulta manual) e podem não estar actualizados.
