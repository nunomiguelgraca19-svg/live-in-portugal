// ============ SCORING (versão corrigida — Maio 2026) ============
// 5 alterações face à versão anterior:
//   1. Orçamento: filtro DURO acima de 1.5× — concelho desaparece do ranking
//   2. Clima: matriz fuzzy 4 opções UI × 6 climas dos dados (já não é 10/2)
//   3. Healthcare: deixa de entrar automaticamente para couple/single — só
//      se for prioridade explícita ou se household = family/retired
//   4. Escolas internacionais: pontua as 3 mais próximas com utilidade
//      decrescente (1.0 / 0.6 / 0.3) em vez de só a 1ª
//   5. Surf: pendente — entra na lista de revisão
//
// Componentes: Budget (20%), Climate (10%), Household (10%), Work (10%),
// Schools (0–25% conforme household), Healthcare (0–25% conforme household),
// Priorities (15%)

function scorePlace(p) {
  p = normalizePlace(p);
  var score = 0, max = 0;
  var avgRent = (p.rentT2[0] + p.rentT2[1]) / 2;

  // -------- 1. BUDGET (20%) — HARD FILTER acima de 1.5× --------
  if (answers.mode === 'rent') {
    if (avgRent > answers.rentBudget * 1.5) return 0; // descartar
    max += 20;
    if (avgRent <= answers.rentBudget) score += 20;
    else if (avgRent <= answers.rentBudget * 1.15) score += 12;
    else if (avgRent <= answers.rentBudget * 1.3) score += 4;
    else score += 1;
  } else {
    var canAffordM2 = answers.buyBudget / 80;
    if (p.buyM2 > canAffordM2 * 1.5) return 0; // descartar
    max += 20;
    if (p.buyM2 <= canAffordM2) score += 20;
    else if (p.buyM2 <= canAffordM2 * 1.2) score += 12;
    else if (p.buyM2 <= canAffordM2 * 1.5) score += 4;
  }

  // -------- 2. CLIMATE (10%) — matriz fuzzy --------
  // Linhas = escolha do utilizador, Colunas = clima do concelho
  var CLIMATE_MATRIX = {
    hot:         { mediterranean: 10, mild:  7, oceanic:  2, continental: 6, mountain: 1, subtropical:  4 },
    mild:        { mediterranean:  7, mild: 10, oceanic:  6, continental: 5, mountain: 3, subtropical:  7 },
    oceanic:     { mediterranean:  2, mild:  5, oceanic: 10, continental: 7, mountain: 8, subtropical:  4 },
    subtropical: { mediterranean:  4, mild:  5, oceanic:  3, continental: 2, mountain: 2, subtropical: 10 },
    any:         { mediterranean: 10, mild: 10, oceanic: 10, continental:10, mountain:10, subtropical: 10 }
  };
  max += 10;
  var climateRow = CLIMATE_MATRIX[answers.climate] || CLIMATE_MATRIX.any;
  score += (climateRow[p.climate] !== undefined) ? climateRow[p.climate] : 5;

  // -------- 3. HOUSEHOLD (10%) --------
  max += 10;
  if (answers.household === 'family') {
    score += (p.schools >= 4 ? 4 : p.schools >= 3 ? 2 : 0)
           + (p.healthcare >= 4 ? 3 : p.healthcare >= 3 ? 1 : 0)
           + (p.quiet >= 3 ? 3 : 1);
  } else if (answers.household === 'retired') {
    score += (p.healthcare >= 4 ? 4 : p.healthcare >= 3 ? 2 : 0)
           + (p.quiet >= 4 ? 3 : p.quiet >= 3 ? 2 : 0)
           + (p.nature >= 4 ? 3 : p.nature >= 3 ? 1 : 0);
  } else if (answers.household === 'couple') {
    score += (p.culture >= 3 ? 3 : 1) + (p.quiet >= 3 ? 4 : 2) + (p.transport >= 3 ? 3 : 0);
  } else {
    score += (p.transport >= 3 ? 4 : 2) + (p.culture >= 3 ? 3 : 1) + (p.expat >= 3 ? 3 : 0);
  }

  // -------- 4. WORK (10%) --------
  max += 10;
  if (answers.work === 'remote' || answers.work === 'entrepreneur') {
    score += (p.expat >= 3 ? 3 : 1) + 4 + (p.transport >= 3 ? 3 : 0);
  } else if (answers.work === 'local_job') {
    score += (p.transport >= 4 ? 4 : p.transport >= 3 ? 2 : 0)
           + (p.tags.indexOf('urban') >= 0 ? 3 : 0)
           + (['Lisboa','Norte','Centro'].indexOf(p.region) >= 0 ? 3 : 0);
  } else if (answers.work === 'pension') {
    score += (p.quiet >= 3 ? 3 : 1) + (p.nature >= 3 ? 4 : 2) + (p.healthcare >= 3 ? 3 : 0);
  } else if (answers.work === 'student') {
    score += (p.transport >= 3 ? 3 : 1)
           + (p.tags.indexOf('urban') >= 0 ? 4 : 0)
           + (['Lisboa','Norte','Centro'].indexOf(p.region) >= 0 ? 3 : 1);
  }

  // -------- 5. SCHOOLS (0–25% se household=family) — top 3 com utilidade decrescente --------
  if (answers.household === 'family') {
    max += 25;
    var hasCarS = answers.mobility === 'car';
    if (answers.schoolPref === 'international') {
      score += scoreInternationalSchools(p, hasCarS);
    } else if (answers.schoolPref === 'portuguese') {
      score += 8 + (p.schools >= 3 ? 5 : 0) + (p.quiet >= 3 ? 5 : 3) + (p.transport >= 3 ? 7 : 2);
    } else {
      var intl = scoreInternationalSchools(p, hasCarS);
      var pt   = 8 + (p.schools >= 3 ? 5 : 0) + (p.quiet >= 3 ? 5 : 3) + (p.transport >= 3 ? 7 : 2);
      score += Math.round((intl + pt) / 2);
    }
  } else if (answers.priorities.indexOf('schools') >= 0) {
    max += 5;
    score += (p.schools >= 4 ? 3 : p.schools >= 3 ? 1 : 0);
  }

  // -------- 6. HEALTHCARE — só conta se for relevante --------
  if (answers.household === 'retired') {
    max += 25;
    var pubHosp  = findClosest(p, hospitalsPublic,  1);
    var privHosp = findClosest(p, hospitalsPrivate, 1);
    var pubDist  = pubHosp.length  > 0 ? pubHosp[0].dist  : 100;
    var privDist = privHosp.length > 0 ? privHosp[0].dist : 100;
    var hasCarH  = answers.mobility === 'car';
    score += Math.round((proximityScore(pubDist, hasCarH) + proximityScore(privDist, hasCarH)) * 1.25);
  } else if (answers.household === 'family' || answers.priorities.indexOf('healthcare') >= 0) {
    max += 10;
    var pubH = findClosest(p, hospitalsPublic, 1);
    score += pubH.length > 0
      ? Math.max(1, Math.round(proximityScore(pubH[0].dist, answers.mobility === 'car')))
      : 2;
  }
  // else (couple/single sem healthcare como prioridade): healthcare não pontua

  // -------- 7. PRIORITIES (15%) --------
  if (answers.priorities.length > 0) {
    var ptsEach = Math.round(15 / answers.priorities.length);
    max += ptsEach * answers.priorities.length;
    answers.priorities.forEach(function(pr) {
      var val = p[pr] || 0;
      if      (val >= 5) score += ptsEach;
      else if (val >= 4) score += Math.round(ptsEach * 0.75);
      else if (val >= 3) score += Math.round(ptsEach * 0.5);
      else if (val >= 2) score += Math.round(ptsEach * 0.25);
    });
  }

  return max > 0 ? Math.round(100 * score / max) : 50;
}

// Helper: pontua escolas internacionais usando as 3 mais próximas com utilidade decrescente
// proximityScore devolve 0–10 → soma ponderada normalizada ∈ [0, 10] → escalada para 0–25
function scoreInternationalSchools(p, hasCar) {
  var top3 = findClosest(p, schools, 3);
  if (top3.length === 0) return 1;
  var weights = [1.0, 0.6, 0.3];
  var weightSum = 1.9;
  var raw = 0;
  for (var i = 0; i < Math.min(3, top3.length); i++) {
    raw += proximityScore(top3[i].dist, hasCar) * weights[i];
  }
  return Math.max(1, Math.round((raw / weightSum) * 2.5));
}
