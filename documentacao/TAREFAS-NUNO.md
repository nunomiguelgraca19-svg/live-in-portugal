# Tarefas para o Nuno

## O que eu já fiz
- [x] Landing page com slideshow (index.html)
- [x] Questionário limpo + ecrã de saída com dois caminhos (Assistente-Onde-Morar-Portugal.html)
- [x] Página de serviços com preços indicativos (servicos.html)
- [x] Página "Sobre nós" com formulário de contacto (sobre-nos.html)
- [x] Primeiro artigo de blog — guia NIF 2026 (blog-nif-portugal.html)
- [x] Meta tags SEO e OpenGraph em todas as páginas
- [x] Navegação consistente entre todas as páginas
- [x] Documento com fontes de dados reais necessárias (NOTAS-dados-reais-necessarios.md)

---

## O que tu precisas de fazer

### Imediato (antes de publicar)

1. **Testar no browser** — Abre index.html directamente no Chrome/Firefox (duplo-clique no ficheiro). Navega entre todas as páginas e verifica se os links funcionam.

2. **Verificar imagens do slideshow** — Se alguma das 5 imagens do Unsplash não carregar, avisa-me e substituo. Podes também trocar por fotos tuas de Portugal.

3. **Preencher dados pessoais:**
   - `sobre-nos.html` — O teu nome, bio (2-3 frases), e idealmente uma foto (substitui o placeholder ícone)
   - `sobre-nos.html` — Número de WhatsApp real (substituir +351 000 000 000)
   - `Assistente-Onde-Morar-Portugal.html` — Mesmo WhatsApp no painel de ajuda
   - Email: verificar se queres manter info@portugalexpathome.com ou usar outro

4. **Validar preços dos serviços** — Os valores na página de serviços são sugestões minhas baseadas no mercado. Revê e ajusta conforme a tua realidade:
   - Visita: €75
   - NIF: €120
   - Conta bancária: €90
   - Revisão de contrato: €150
   - Procuração + assinatura: €250
   - Pacote completo: €650

5. **Apagar ficheiros obsoletos** — opcao-A-editorial.html e opcao-B-moderna.html já não são necessários.

### Curto prazo (primeiras semanas)

6. **Registar domínio** — Sugestão: portugalexpathome.com (ou .pt). Verificar disponibilidade.

7. **Hosting** — Opções simples e baratas para sites estáticos:
   - Netlify (grátis, deploy por drag-and-drop)
   - GitHub Pages (grátis)
   - Vercel (grátis)
   - Qualquer um destes suporta domínio próprio e HTTPS automático

8. **Formulário de contacto** — O formulário actual é só frontend (não envia emails). Precisa de um de:
   - Formspree.io (grátis até 50 submissões/mês) — basta mudar o action do form
   - Netlify Forms (grátis se usares Netlify para hosting)
   - EmailJS (grátis até 200 emails/mês)

9. **Google Analytics** — Criar conta e adicionar o snippet a todas as páginas. Importante para perceber de onde vem o tráfego.

### Médio prazo (1-3 meses)

10. **Questão AMI** — Confirmar com advogado se a tua actividade requer licença de Mediação Imobiliária (AMI). Se apenas fazes acompanhamento e burocracia (sem mediar vendas/arrendamentos), provavelmente não precisas. Mas convém ter isto clarificado antes de escalar.

11. **Estrutura jurídica** — Decidir se operas como empresário em nome individual ou se crias empresa (Unipessoal Lda é o mais comum). Falar com contabilista.

12. **CRM mínimo** — Para gerir contactos e pedidos. Pode ser um simples Google Sheet no início, ou algo como Notion/Trello. Quando crescer: HubSpot gratuito ou Pipedrive.

13. **Mais artigos de blog (SEO)** — Temas que os expats pesquisam muito:
    - "D7 visa Portugal 2026 requirements"
    - "Cost of living in Lisbon vs Porto"
    - "Best areas for expats in Algarve"
    - "How to open a bank account in Portugal"
    - "IFICI tax regime Portugal explained"
    - "Renting in Portugal: tenant rights"

14. **Redes sociais / comunidades** — Onde promover:
    - Grupos Facebook: "Americans/Brits/French in Portugal", "Expats in Lisbon/Porto/Algarve"
    - Reddit: r/portugal, r/expats, r/digitalnomad
    - Fóruns: ExpatForum.com, InterNations
    - Parcerias: advogados de imigração, contabilistas IFICI

### Longo prazo (3-6 meses)

15. **Dados reais** — Substituir estimativas por dados extraídos (ver NOTAS-dados-reais-necessarios.md): hospitais SNS, escolas internacionais, distâncias a aeroportos, etc.

16. **Base de dados ao nível de bairro/rua** — Expandir a cobertura de 47 áreas para mais, com detalhe de freguesia. Prioridade: Lisboa, Porto, Cascais, Setúbal.

17. **Newsletter** — Adicionar signup para newsletter (Mailchimp grátis ou similar). Enviar actualizações mensais de preços e novos artigos.

18. **Testemunhos** — Pedir a primeiros clientes ou conhecidos que escrevam um parágrafo sobre a experiência. Adicionar à landing page.

19. **Backend** — Quando o volume justificar, migrar de site estático para algo com base de dados (Next.js + Supabase, ou similar). Permitiria actualizações de preços automáticas e funcionalidades como alertas de preço.

### Nice to have (lista de desejos)

20. **Botão "Indeciso" no passo 1 (comprar vs arrendar)** — Para quem ainda não sabe se quer comprar ou arrendar, adicionar uma terceira opção que os direcione para um artigo explicativo com as diferenças (custos, compromisso, flexibilidade, IMT vs caução, etc.) e/ou que corra o questionário para ambos os cenários e compare os resultados lado a lado.

21. **Filtro de estado de conservação nos preços** — Os dados de preço/m² actuais incluem imóveis para renovar, o que puxa os valores para baixo. Numa próxima iteração de dados, filtrar apenas imóveis em bom estado ou usados-bom no Idealista/INE para ter preços mais realistas.

22. **Estimativa de custo total por localização** — Após os resultados, mostrar uma estimativa dos custos totais mensais para cada zona: renda + despesas (água, luz, gás, internet ~€150-200), alimentação (~€300-500 para casal), transporte, e custos específicos como escola privada (€400-1.800/mês) ou seguro de saúde. Ajudaria a pessoa a comparar o verdadeiro custo de vida.

23. **Separadores no site para cada categoria de custos** — Criar páginas/secções separadas para: (a) custos de habitação por zona, (b) custos de escolas privadas vs públicas, (c) custos de saúde (SNS vs seguro privado vs pay-as-you-go), (d) facilidade de integração por zona (comunidade expat, serviços em inglês, burocracia local).

---

## Estrutura actual do site

```
index.html                              ← Landing page (entrada principal)
Assistente-Onde-Morar-Portugal.html     ← Questionário + resultados
servicos.html                           ← Página de serviços e preços
sobre-nos.html                          ← Sobre nós + formulário de contacto
blog-nif-portugal.html                  ← Artigo: como obter NIF
NOTAS-dados-reais-necessarios.md        ← Documentação interna
Documentacao-Scoring-Questionario.md   ← Como funciona o scoring (fórmulas, pesos)
Pesquisa-Dificuldades-Expats-Habitacao.md ← Pesquisa sobre dificuldades dos expats
Base-Dados-Saude-Educacao-Portugal.xlsx ← Base de dados GPS: hospitais e escolas
TAREFAS-NUNO.md                         ← Este ficheiro
```
