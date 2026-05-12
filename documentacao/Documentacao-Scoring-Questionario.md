# Documentação do Sistema de Scoring — Questionário "Onde Morar em Portugal"

Última actualização: 17 Março 2026

---

## 1. Visão geral

O questionário avalia 47 zonas de Portugal com base nas respostas do utilizador a 8 perguntas. Cada zona recebe uma pontuação de 0% a 100%. O resultado final é: **score = (pontos obtidos / pontos possíveis) × 100**.

Os pontos possíveis variam consoante o perfil (famílias têm mais pontos em escolas, reformados em saúde).

---

## 2. Filtro rígido de orçamento (NOVO)

**Antes** de calcular scores, as zonas são filtradas pelo orçamento. Uma zona só aparece nos resultados se:

- **Arrendamento**: renda média T2 ≤ orçamento × 1.25
- **Compra**: preço/m² × 80m² ≤ orçamento × 1.25

A renda média é calculada como: `(mínimo T2 + máximo T2) / 2`

**Se nenhuma zona passar o filtro**, o painel de mismatch ("champagne taste, beer budget") é activado automaticamente com sugestões de orçamento superior.

---

## 3. Componentes do score (por ordem)

### 3.1 Orçamento — 20 pontos (20%)

Mesmo após o filtro rígido, o orçamento continua a pesar no ranking (para diferenciar zonas "dentro do budget" das que estão "no limite").

**Arrendamento:**

| Condição | Pontos |
|---|---|
| Renda média ≤ orçamento | 20 |
| Renda média ≤ orçamento × 1.15 | 12 |
| Renda média ≤ orçamento × 1.30 | 4 |
| Acima (mas ≤ 1.25 pelo filtro) | 0 |

**Compra** (estimativa para apartamento de 80m²):

| Condição | Pontos |
|---|---|
| Preço/m² ≤ orçamento ÷ 80 | 20 |
| Preço/m² ≤ (orçamento ÷ 80) × 1.20 | 12 |
| Preço/m² ≤ (orçamento ÷ 80) × 1.50 | 4 |
| Acima (mas ≤ 1.25 pelo filtro) | 0 |

### 3.2 Clima — 10 pontos (10%)

| Condição | Pontos |
|---|---|
| Zona tem o clima escolhido, ou utilizador escolheu "any" | 10 |
| Clima diferente do escolhido | 2 |

Os climas disponíveis são: `hot` (Algarve, Alentejo), `mild` (Lisboa, costa central), `oceanic` (Porto, Norte), `subtropical` (Madeira, Açores).

### 3.3 Agregado familiar — 10 pontos (10%)

Depende do tipo de agregado:

**Família:**
- Escolas ≥ 4 → 4 pts, ≥ 3 → 2 pts, <3 → 0
- Saúde ≥ 4 → 3 pts, ≥ 3 → 1 pt, <3 → 0
- Sossego ≥ 3 → 3 pts, <3 → 1 pt

**Reformado:**
- Saúde ≥ 4 → 4 pts, ≥ 3 → 2 pts, <3 → 0
- Sossego ≥ 4 → 3 pts, ≥ 3 → 2 pts, <3 → 0
- Natureza ≥ 4 → 3 pts, ≥ 3 → 1 pt, <3 → 0

**Casal:**
- Cultura ≥ 3 → 3 pts, <3 → 1 pt
- Sossego ≥ 3 → 4 pts, <3 → 2 pts
- Transportes ≥ 3 → 3 pts, <3 → 0

**Solo:**
- Transportes ≥ 3 → 4 pts, <3 → 2 pts
- Cultura ≥ 3 → 3 pts, <3 → 1 pt
- Comunidade expat ≥ 3 → 3 pts, <3 → 0

### 3.4 Trabalho — 10 pontos (10%)

**Trabalho remoto / Empreendedor:**
- Comunidade expat ≥ 3 → 3 pts, <3 → 1 pt
- Base fixa → 4 pts (qualquer zona serve para remote)
- Transportes ≥ 3 → 3 pts, <3 → 0

**Emprego local:**
- Transportes ≥ 4 → 4 pts, ≥ 3 → 2 pts, <3 → 0
- Tag "urban" → 3 pts
- Região = Lisboa/Porto/Cascais/Oeiras/Braga/Coimbra → 3 pts

**Pensão/reforma:**
- Sossego ≥ 3 → 3 pts, <3 → 1 pt
- Natureza ≥ 3 → 4 pts, <3 → 2 pts
- Saúde ≥ 3 → 3 pts, <3 → 0

**Estudante:**
- Transportes ≥ 3 → 3 pts, <3 → 1 pt
- Tag "urban" → 4 pts
- Região = Lisboa/Porto/Coimbra/Aveiro/Braga → 3 pts, outra → 1 pt

### 3.5 Escolas — 5 a 25 pontos (variável)

**Se o agregado é família → 25 pontos possíveis:**

- **Escolas internacionais**: baseado em GPS. Calcula distância Haversine até a escola internacional mais próxima. Score = `proximityScore(dist, temCarro) × 2.5`, mínimo 1 ponto.
- **Escolas portuguesas**: 8 pts base + escolas≥3 → +5 + sossego≥3 → +5 + transportes≥3 → +7
- **Indeciso**: média dos dois cálculos acima

**Se o agregado NÃO é família → 5 pontos possíveis:**
- Escolas ≥ 4 → 3 pts, ≥ 3 → 1 pt, <3 → 0

### 3.6 Saúde — 10 a 25 pontos (variável)

**Se o agregado é reformado → 25 pontos possíveis:**
- Calcula distância GPS ao hospital público + hospital privado mais próximos
- Score = `(proximityScore(pubDist) + proximityScore(privDist)) × 1.25`, arredondado

**Outros agregados → 10 pontos possíveis:**
- Distância GPS ao hospital público mais próximo
- Score = `proximityScore(pubDist, temCarro)`, mínimo 1 pt

### 3.7 Prioridades — 15 pontos (15%)

O utilizador escolhe até 5 prioridades. Os 15 pontos são divididos igualmente entre as prioridades escolhidas.

Para cada prioridade, a zona é avaliada pelo seu rating (1-5):

| Rating da zona | % dos pontos atribuídos |
|---|---|
| 5 | 100% |
| 4 | 75% |
| 3 | 50% |
| 2 | 25% |
| 0-1 | 0% |

**Exemplo**: 3 prioridades → 5 pts cada. Se a zona tem rating 4 em "litoral", recebe 5 × 0.75 = 3.75 → arredondado para 4.

---

## 4. Função de proximidade (GPS)

Usada para escolas e hospitais:

```
proximityScore(distKm, temCarro) = 10 / (1 + distKm / referência)
```

- **Com carro**: referência = 10 km → a 10km o score é 5/10, a 20km é 3.3/10
- **Sem carro**: referência = 3 km → a 3km o score é 5/10, a 6km é 3.3/10

A distância é calculada pela **fórmula Haversine** (distância em linha recta entre coordenadas GPS).

---

## 5. Pontuação máxima por perfil

| Perfil | Orçamento | Clima | Agregado | Trabalho | Escolas | Saúde | Prioridades | **Total** |
|---|---|---|---|---|---|---|---|---|
| Família | 20 | 10 | 10 | 10 | **25** | 10 | 15 | **100** |
| Reformado | 20 | 10 | 10 | 10 | 5 | **25** | 15 | **95** |
| Casal | 20 | 10 | 10 | 10 | 5 | 10 | 15 | **80** |
| Solo | 20 | 10 | 10 | 10 | 5 | 10 | 15 | **80** |

(O total máximo varia, mas o score final é sempre convertido para percentagem.)

---

## 6. Sistema de mismatch

Activa-se quando:
1. **Nenhuma zona passa o filtro de orçamento** (budget demasiado baixo)
2. **A melhor zona pontuada tem score < 55%** (requisitos muito exigentes)

Testa 4 cenários por ordem:

1. **Aumentar orçamento** — testa valores predefinidos até encontrar um que dê score ≥ 55%
2. **Remover uma prioridade** — testa remover cada prioridade individualmente, escolhe a que mais desbloqueia
3. **Considerar arrendar** (só para modo compra) — calcula equivalente mensal e testa
4. **Aceitar qualquer clima** — testa sem restrição climática

---

## 7. Dados por zona

Cada zona tem estas propriedades (ratings de 1-5):

- `expat`: tamanho da comunidade expat
- `transport`: qualidade dos transportes públicos
- `nature`: acesso a natureza e espaços verdes
- `beach`: proximidade ao litoral (0 = interior)
- `healthcare`: qualidade geral dos serviços de saúde
- `airport`: proximidade a aeroporto
- `schools`: qualidade geral das escolas
- `quiet`: sossego e tranquilidade
- `culture`: oferta cultural e vida nocturna

Além dos ratings, cada zona tem coordenadas GPS (latitude, longitude) e dados de preço (compra/m², renda T2 mín-máx, renda/m²).

---

## 8. Resultado dos testes (17 Março 2026)

| Budget | Modo | Zonas no filtro | Exemplo de zonas |
|---|---|---|---|
| €300/mês | Renda | 0 → mismatch | - |
| €500/mês | Renda | 5 | Beja, Castelo Branco, Guarda, Bragança, Évora |
| €800/mês | Renda | 18 | + Sintra, Braga, Viana, Aveiro, Coimbra, etc. |
| €1.200/mês | Renda | 32 | + Arroios, Benfica, Almada, Lagos, Funchal, etc. |
| €100k | Compra | 4 | Guarda, Castelo Branco, Bragança, Beja |
| €200k | Compra | 22 | + Sintra, Braga, Faro, Coimbra, Peniche, etc. |
