# Tarefas para o Claude Code — Portugal Expat Home

**Data:** Maio 2026
**Versão actual do site:** com 13 prioridades (River beaches, Nightlife, Family-friendly, etc.)

---

## 📋 Resumo

Há **três substituições** a fazer no `Assistente-Onde-Morar-Portugal.html`:

1. **Array de concelhos** → trocar pelo conteúdo de `concelhos-corrigido.js` (94 concelhos, climates já reclassificados)
2. **Array de escolas** → trocar pela lista de `Lista-Escolas-Internacionais-Atualizada.md` (~80 entradas)
3. **Função `scorePlace()`** → trocar pelo conteúdo de `scorePlace-corrigido.js` (5 alterações no algoritmo)

---

## ✅ TAREFA 1 — Substituir array de concelhos

### Porquê
A versão actual tem:
- 4 duplicados (Castelo Branco, Portalegre, Viseu, Évora)
- Typo "Monchaique" em vez de "Monchique"
- ~45 concelhos costeiros/insulares com `praiasFluviais` mal pontuado (4-5 estrelas onde deveria ser 0-1)
- 13 concelhos do interior com praias fluviais reais EM FALTA (Arganil, Góis, Pampilhosa da Serra, Oleiros, Proença-a-Nova, Mação, Sertã, Vila Velha de Ródão, Belmonte, Fundão, Penacova, Tábua, Castanheira de Pera)
- Guarda mal classificada como `oceanic` em vez de `continental`
- 28 concelhos com climate inválido `"temperate"` — agora reclassificados em `oceanic`/`continental`/`mediterranean`/`mild`

### Como fazer

```bash
# 1. Localizar o array no HTML — começa na linha ~605 (procurar "const places = [" ou "var places = [")
# 2. Substituir pelo conteúdo completo de concelhos-corrigido.js (94 entradas)
# 3. Verificar que o nome da variável bate certo no resto do código
```

### Validação
- Procurar 1 sítio onde se faça `Sítio não muito quente + Tenho carro + Praias fluviais`
- Top 3 deverá mostrar concelhos do interior (Arganil, Góis, Pampilhosa, etc.) — **NÃO** Faro/Setúbal/Aveiro/Odivelas
- Confirmar 94 concelhos no total
- Confirmar Monchique (não Monchaique)
- Climates só podem ser: `mediterranean`, `mild`, `oceanic`, `continental`, `mountain`, `subtropical` (não `temperate`)

---

## ✅ TAREFA 2 — Substituir array de escolas

### Porquê
A versão actual tem 30 escolas. Faltam muitas escolas internacionais e bilingues, e a Aljezur International School foi encerrada em Outubro 2025 e tem de ser **REMOVIDA**.

### Cobertura nova (~80 entradas)
- **Lisboa:** 8 escolas internacionais + 5 hubs BGA
- **Cascais/Sintra/Oeiras:** 13 escolas + 5 hubs BGA
- **Sul de Lisboa (Setúbal/Palmela/Seixal/Comporta):** 3 escolas + hubs BGA
- **Porto/Norte (Braga/Esposende):** 5 escolas + hubs BGA
- **Algarve:** 8 escolas + hub BGA Lagos
- **Madeira:** 2 escolas
- **Centro (Coimbra):** 1 escola + hubs BGA
- **BGA hubs por todo o país:** 24 (Setúbal, Ericeira, Óbidos, Leiria, Aveiro, Fundão, etc.)

### Estrutura de cada entrada (manter o mesmo formato do array actual)
```javascript
{
  name: "Nome da Escola",
  district: "Distrito",
  concelho: "Concelho",
  lat: 38.xxxx, lon: -9.xxxx,
  curriculum: "Cambridge | IB | British | American | French | German | Bilingual",
  ages: "3-18",
  fees: "€X.XXX-Y.YYY"  // pode ser null
}
```

### ⚠️ IMPORTANTE
- **REMOVER:** Aljezur International School (encerrada 24 Out 2025 por IGEC/DGEstE)
- **NÃO incluir:** International House Aveiro (encerrada), Colégio de Calvão (não é internacional)
- **BGA:** todos os 24 hubs ficam como entradas separadas por enquanto (a rever se enviesa o rating "schools" do concelho)

### Fonte completa
Ver `Lista-Escolas-Internacionais-Atualizada.md` neste mesmo directório — tem todas as escolas com morada, currículo, propinas e idades.

---

## ✅ TAREFA 3 (NOVA) — Substituir a função `scorePlace()`

### Porquê
Após testes funcionais com 15 cenários, identificámos 5 problemas no algoritmo actual e desenhámos correcções aprovadas pelo Nuno:

1. **Orçamento:** filtro DURO acima de 1.5× (concelho desaparece do ranking, em vez de ficar com pontuação reduzida)
2. **Clima:** matriz fuzzy 4 opções UI (`hot` / `mild` / `oceanic` / `subtropical` / `any`) × 6 climates dos dados (em vez do binário 10/2 anterior)
3. **Healthcare residual:** deixa de entrar automaticamente para `couple`/`single` — só conta para `family`/`retired` ou se for prioridade explícita
4. **Escolas internacionais:** pontuação considera as 3 escolas mais próximas com utilidade decrescente (1.0 / 0.6 / 0.3) em vez de só a mais próxima
5. **Surf:** entra na lista de revisão (pendente — não há tag `surf` ainda)

### Como fazer

```bash
# 1. Localizar a função scorePlace() no HTML — começa na linha ~1171 (procurar "function scorePlace(p)")
# 2. Substituir TODA a função (até ao "}" final, linha ~1272) pelo conteúdo de scorePlace-corrigido.js
# 3. ATENÇÃO: o ficheiro corrigido inclui TAMBÉM um helper "scoreInternationalSchools(p, hasCar)"
#    que tem de ser inserido logo a seguir à função scorePlace()
# 4. Preservar comentários e indentação do ficheiro corrigido
```

### Validação (3 cenários no browser)

**Cenário A — Pensionista britânico Algarve:**
- Inputs: `Reformado` + `Carro` + `Clima quente` + prioridades `Saúde`, `Comunidade expat`, `Tranquilidade`, orçamento €1200
- Top 3 esperado: **Faro / Setúbal / Cascais** (mediterrânicos com hospital próximo)
- Porto e Covilhã NÃO devem aparecer no top 5

**Cenário B — Orçamento muito apertado:**
- Inputs: `Solteiro` + `Sem carro` + qualquer clima + orçamento €450
- Top 3 esperado: **só interior** (Águeda/Évora/Beja). Cascais/Lisboa/Porto NÃO devem aparecer (são >1.5× €450 → filtrados)

**Cenário C — Clima fresco:**
- Inputs: `Casal` + `Carro` + `Clima oceânico` + prioridades `Natureza`, `Tranquilidade`, orçamento €1500
- Top 5 esperado: concelhos do norte litoral / Açores / serra (Horta, Ponte de Lima, Guarda, etc.)
- Faro / Lagos NÃO devem aparecer no top 5

---

## 🧪 Testes finais (após as 3 substituições)

1. Abrir HTML no browser
2. DevTools Console: confirmar `places.length === 94` (ou nome correcto da variável)
3. Confirmar `schools.length` ~80
4. Correr os 3 cenários A/B/C acima
5. Confirmar que Aljezur já não aparece como escola

---

## 📂 Ficheiros nesta pasta

- `concelhos-corrigido.js` — usar este (NÃO o Excel) — 94 concelhos sem typos, sem `temperate`
- `Lista-Escolas-Internacionais-Atualizada.md` — fonte para o array de escolas
- `scorePlace-corrigido.js` — 🆕 nova função de scoring + helper
- `correccao-concelhos.py` — apenas referência (já foi corrido)
- `Assistente-Onde-Morar-Portugal.html` — ficheiro a modificar
- `Features-Funcionais-Concelhos.md` — referência das features
- `Base-Dados-Concelhos-Completa.xlsx` — apenas histórico
- `PROMPT-CLAUDE-CODE.md` — 🆕 prompt copy-paste para o Claude Code

---

## 📞 Em caso de dúvida

- Antes de substituir, fazer backup do HTML (`cp Assistente-Onde-Morar-Portugal.html Assistente-Onde-Morar-Portugal.bak.html`)
- Tudo deve passar pelo Nuno antes de publicar no Vercel
- **NÃO publicar no Vercel automaticamente.** Esperar revisão.
