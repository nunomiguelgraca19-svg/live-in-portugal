# Portugal Expat Home — Integração de Dados

## 📁 Ficheiros

| Ficheiro | O que é |
|----------|---------|
| **PROMPT-CLAUDE-CODE.md** | 🆕 ⭐ **Prompt copy-paste para o Claude Code (em inglês)** |
| **INSTRUÇÕES.md** | Tarefas pendentes em detalhe — agora com 3 tarefas |
| **Assistente-Onde-Morar-Portugal.html** | Site HTML (a modificar) — versão com 13 prioridades |
| **concelhos-corrigido.js** | Base de dados corrigida (94 concelhos, climates já reclassificados — sem `temperate`) |
| **Lista-Escolas-Internacionais-Atualizada.md** | Lista de ~80 escolas + hubs BGA |
| **scorePlace-corrigido.js** | 🆕 Função de scoring corrigida + helper `scoreInternationalSchools` |
| **correccao-concelhos.py** | Script Python que gerou o `concelhos-corrigido.js` (referência) |
| **Base-Dados-Concelhos-Completa.xlsx** | Excel original (76 concelhos) — apenas referência histórica |
| **Features-Funcionais-Concelhos.md** | Descrições detalhadas (referência, opcional) |

## 🎯 Tarefas pendentes (no HTML)

1. **Substituir array de concelhos** pelo conteúdo de `concelhos-corrigido.js`
2. **Substituir array de escolas** pela lista de `Lista-Escolas-Internacionais-Atualizada.md`
3. **Substituir função `scorePlace()`** pelo conteúdo de `scorePlace-corrigido.js` (inclui também o helper `scoreInternationalSchools`)
4. Validar 3 cenários no browser (ver `INSTRUÇÕES.md`)
5. Aguardar revisão do Nuno antes de publicar no Vercel

**Tempo estimado: ~1.5–2h**

## 🚀 Como começar

1. Abrir `PROMPT-CLAUDE-CODE.md`
2. Copiar o conteúdo
3. Colar na sessão do Claude Code (na pasta do projecto)
4. Aguardar execução e validações

## 🔬 O que mudou no algoritmo (resumo)

A função `scorePlace()` foi reescrita com 5 alterações aprovadas após 15 cenários de teste:

| # | Alteração | Antes | Depois |
|---|-----------|-------|--------|
| 1 | Orçamento | escala suave até qualquer valor | filtro **duro** acima de 1.5× |
| 2 | Clima | binário 10/2 | matriz fuzzy 4×6 |
| 3 | Healthcare | conta sempre 10 pts | só `family`/`retired` ou se for prioridade |
| 4 | Escolas internacionais | só a mais próxima | top 3 com pesos 1.0/0.6/0.3 |
| 5 | Surf | n/a | pendente — lista de revisão |
