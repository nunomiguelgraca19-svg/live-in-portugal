# Dados Reais Necessários - Portugal Expat Guide

## Estado Actual
Os scores de escolas, saúde, transportes e outros critérios no questionário são **estimativas manuais** (1-5) baseadas em conhecimento geral. Para o site ser credível e útil, precisamos de dados reais extraídos de fontes oficiais.

## Fontes de Dados Prioritárias

### 1. Saúde / Healthcare (score actual: estimativa)
- **SNS (Serviço Nacional de Saúde)** - sns.gov.pt
  - Lista de hospitais públicos por distrito/concelho
  - Centros de saúde e USF por freguesia
  - Tempos de espera por região
- **ACSS** - acss.min-saude.pt
  - Rede hospitalar completa
  - Indicadores de desempenho por unidade
- **Entidade Reguladora da Saúde (ERS)** - ers.pt
  - Clínicas e hospitais privados registados

### 2. Escolas / Schools (score actual: estimativa)
- **DGEEC (Direcção-Geral de Estatísticas da Educação e Ciência)** - dgeec.mec.pt
  - Rankings de escolas públicas
  - Número de estabelecimentos por concelho
- **Escolas internacionais**
  - COBIS (Council of British International Schools)
  - Lista de escolas americanas, francesas, alemãs em Portugal
  - International Schools Database - internationalschoolsdatabase.com
- **InfoEscolas** - infoescolas.pt
  - Resultados de exames por escola
  - Dados públicos por estabelecimento

### 3. Transportes / Transport (score actual: estimativa)
- **Metropolitano de Lisboa** - metrolisboa.pt - Mapa de estações
- **Metro do Porto** - metrodoporto.pt - Mapa de estações
- **CP (Comboios de Portugal)** - cp.pt - Linhas suburbanas e regionais
- **Carris/Carris Metropolitana** - Rede de autocarros AML
- **STCP** - Rede de autocarros Porto
- **Fertagus** - Linha ferroviária Lisboa-Setúbal

### 4. Segurança / Safety
- **RASI (Relatório Anual de Segurança Interna)** - Criminalidade por distrito
- **Pordata** - pordata.pt - Indicadores de segurança por município

### 5. Preços Imobiliários (melhorar granularidade)
- **Idealista** - idealista.pt - Preços por freguesia (scraping mensal)
- **INE** - ine.pt - Valores medianos de avaliação bancária por concelho
- **Confidencial Imobiliário** - ci-iberica.com - Índice de preços detalhado

### 6. Aeroportos / Airport proximity
- Dados simples: distância em km + tempo de condução a aeroporto mais próximo
- Aeroportos: Lisboa (LIS), Porto (OPO), Faro (FAR), Funchal (FNC), Ponta Delgada (PDL)
- Pode ser calculado via Google Maps API ou similar

## Plano de Implementação
1. **Fase imediata**: Extrair listas de hospitais SNS e escolas internacionais (dados públicos, fáceis de obter)
2. **Fase seguinte**: Calcular distâncias reais a aeroportos e estações de transporte
3. **Fase contínua**: Actualizar preços mensalmente do Idealista/INE
4. **Futuro**: API de dados em tempo real (quando o projecto crescer)

## Notas Técnicas
- Para já, o site é estático (HTML+JS). Os dados ficam embebidos no JavaScript.
- Quando tivermos volume suficiente de dados, vale a pena migrar para um backend com base de dados.
- A extracção de dados do Idealista pode requerer autorização ou parceria comercial.
