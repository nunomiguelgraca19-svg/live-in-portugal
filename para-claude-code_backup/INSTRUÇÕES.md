# Tarefas para o Claude Code — Portugal Expat Home

**Data:** Maio 2026
**Versão actual do site:** com 13 prioridades (River beaches, Nightlife, Family-friendly, etc.)

---

## 📋 Resumo

Há **duas substituições** a fazer no `Assistente-Onde-Morar-Portugal.html`:

1. **Array de concelhos** → trocar pelo conteúdo de `concelhos-corrigido.js` (94 concelhos)
2. **Array de escolas** → trocar pela lista de `Lista-Escolas-Internacionais-Atualizada.md` (~80 entradas)

---

## ✅ TAREFA 1 — Substituir array de concelhos

### Porquê
A versão actual tem:
- 4 duplicados (Castelo Branco, Portalegre, Viseu, Évora)
- Typo "Monchaique" em vez de "Monchique"
- ~45 concelhos costeiros/insulares com `praiasFluviais` mal pontuado (4-5 estrelas onde deveria ser 0-1)
- 13 concelhos do interior com praias fluviais reais EM FALTA (Arganil, Góis, Pampilhosa da Serra, Oleiros, Proença-a-Nova, Mação, Sertã, Vila Velha de Ródão, Belmonte, Fundão, Penacova, Tábua, Castanheira de Pera)
- Guarda mal classificada como `oceanic` em vez de `continental`

### Como fazer

```bash
# 1. Localizar o array no HTML — começa na linha ~600 (procurar "var concelhos = [" ou similar)
# 2. Substituir pelo conteúdo completo de concelhos-corrigido.js
# 3. Verificar que o nome da variável bate certo no resto do código
```

### Validação
- Procurar 1 sítio onde se faça `Sítio não muito quente + Tenho carro + Praias fluviais`
- Top 3 deverá mostrar concelhos do interior (Arganil, Góis, Pampilhosa, etc.) — **NÃO** Faro/Setúbal/Aveiro/Odivelas
- Confirmar 94 concelhos no total
- Confirmar Monchique (não Monchaique)

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

## 🧪 Testes finais

1. Abrir HTML no browser
2. DevTools Console: confirmar `concelhos.length === 94`
3. Confirmar `schools.length` ~80
4. Testar 3 perfis:
   - Praias fluviais + Carro → top deve ser interior (Arganil/Góis/Pampilhosa)
   - Família com filhos + Schools alta prioridade → Cascais/Oeiras/Lisboa
   - Sem orçamento limite + Praia → Cascais/Setúbal/Algarve
5. Confirmar que Aljezur já não aparece como escola

---

## 📂 Ficheiros nesta pasta

- `concelhos-corrigido.js` — usar este (NÃO o Excel)
- `correccao-concelhos.py` — apenas referência (já foi corrido)
- `Lista-Escolas-Internacionais-Atualizada.md` — fonte para o array de escolas
- `Assistente-Onde-Morar-Portugal.html` — ficheiro a modificar
- `Features-Funcionais-Concelhos.md` — referência das features
- `Base-Dados-Concelhos-Completa.xlsx` — apenas histórico

---

## 📞 Em caso de dúvida

- Antes de substituir, fazer backup do HTML (`cp Assistente-Onde-Morar-Portugal.html Assistente-Onde-Morar-Portugal.bak.html`)
- Tudo deve passar pelo Nuno antes de publicar no Vercel
