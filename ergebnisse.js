const time = ["19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45"]
const spiele = [
  // ===== SLOT 1 =====
  { zeit: time[0], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 1), ergebnis: "" },
  { zeit: time[0], tisch: 2, gruppe: "A", teamA: getTeam("A", 2), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[0], tisch: 3, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 1), ergebnis: "" },

  // ===== SLOT 2 =====
  { zeit: time[1], tisch: 1, gruppe: "A", teamA: getTeam("A", 4), teamB: getTeam("A", 0), ergebnis: "" },
  { zeit: time[1], tisch: 2, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 2), ergebnis: "" },
  { zeit: time[1], tisch: 3, gruppe: "B", teamA: getTeam("B", 2), teamB: getTeam("B", 3), ergebnis: "" },

  // ===== SLOT 3 =====
  { zeit: time[2], tisch: 1, gruppe: "A", teamA: getTeam("A", 3), teamB: getTeam("A", 4), ergebnis: "" },
  { zeit: time[2], tisch: 2, gruppe: "B", teamA: getTeam("B", 4), teamB: getTeam("B", 0), ergebnis: "" },
  { zeit: time[2], tisch: 3, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 2), ergebnis: "" },

  // ===== SLOT 4 =====
  { zeit: time[3], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 2), ergebnis: "" },
  { zeit: time[3], tisch: 2, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[3], tisch: 3, gruppe: "B", teamA: getTeam("B", 3), teamB: getTeam("B", 4), ergebnis: "" },

  // ===== SLOT 5 =====
  { zeit: time[4], tisch: 1, gruppe: "A", teamA: getTeam("A", 0), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[4], tisch: 2, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 2), ergebnis: "" },
  { zeit: time[4], tisch: 3, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 3), ergebnis: "" },

  // ===== SLOT 6 =====
  { zeit: time[5], tisch: 1, gruppe: "A", teamA: getTeam("A", 1), teamB: getTeam("A", 4), ergebnis: "" },
  { zeit: time[5], tisch: 2, gruppe: "A", teamA: getTeam("A", 2), teamB: getTeam("A", 3), ergebnis: "" },
  { zeit: time[5], tisch: 3, gruppe: "B", teamA: getTeam("B", 0), teamB: getTeam("B", 3), ergebnis: "" },

  // ===== SLOT 7 =====
  { zeit: time[6], tisch: 1, gruppe: "A", teamA: getTeam("A", 2), teamB: getTeam("A", 4), ergebnis: "" },
  { zeit: time[6], tisch: 2, gruppe: "B", teamA: getTeam("B", 1), teamB: getTeam("B", 4), ergebnis: "" },
  { zeit: time[6], tisch: 3, gruppe: "B", teamA: getTeam("B", 2), teamB: getTeam("B", 4), ergebnis: "" },
  
  // ===== SLOT 8 =====
  { game: "VF4", zeit: time[7], tisch: 1, gruppe: "", teamA: "Bester 2.", teamB: "Zweitbester 2.", ergebnis: "" },          //Game 22
  { game: "SP9", zeit: time[7], tisch: 2, gruppe: "", teamA: "Drittbester 3.", teamB: "Bester 4.", ergebnis: "" },
  { game: "SP11", zeit: time[7], tisch: 3, gruppe: "", teamA: "Zweitbester 4.", teamB: "Drittbester 4.", ergebnis: "" },
  
  // ===== SLOT 9 =====
  { game: "HF1", zeit: time[8], tisch: 1, gruppe: "", teamA: "Sieger VF1", teamB: "Sieger VF2", ergebnis: "" },          //Game 25
  { game: "HF1", zeit: time[8], tisch: 2, gruppe: "", teamA: "Sieger VF3", teamB: "Sieger VF4", ergebnis: "" },

  // ===== SLOT 10 =====
  {game: "SP5", zeit: time[9], tisch: 1, gruppe: "", teamA: "Bester Verlierer VF", teamB: "Zweitbester Verlierer VF", ergebnis: "" },    //Game 27
  {game: "SP7", zeit: time[9], tisch: 2, gruppe: "", teamA: "Drittbester Verlierer VF", teamB: "Viertbester Verlierer VF", ergebnis: "" },
  {game: "SP3", zeit: time[9], tisch: 3, gruppe: "", teamA: "Verlierer HF1", teamB: "Verlierer HF2", ergebnis: "" },

  // ===== SLOT 10 =====
  {game: "Finale", zeit: time[10], tisch: 2, gruppe: "", teamA: "Sieger HF1", teamB: "Sieger HF2", ergebnis: "" }    //Game 30
];

//Divide ergebnis in {a: , b:} if ergebnis is existing
function parseErgebnisString(s) {
  if (!s || typeof s !== "string") return null;
  const parts = s.split(":").map(p => p.trim());
  if (parts.length !== 2) return null;
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (Number.isFinite(a) && Number.isFinite(b)) return {a, b};
  return null;
}

// Create empty table for each group
function erstelleLeereTabelleFürGruppe(gruppe) {
  const tab = {};
  teams[gruppe].forEach(team => {
    tab[team.name] = {
      team: team.name,
      spiele: 0,
      punkte: 0,
      tore_plus: 0,
      tore_minus: 0
    };
  });
  return tab;
}

//Calculate table 
function verarbeiteErgebnisse(tabelle, gruppe) {
  spiele.forEach(spiel => {

    // nur diese Gruppe berücksichtigen
    if (spiel.gruppe !== gruppe) return;

    const result = parseErgebnisString(spiel.ergebnis);
    if (!result) return; // keine Wertung ohne Ergebnis

    const A = tabelle[spiel.teamA];
    const B = tabelle[spiel.teamB];

    if (!A || !B) return;

    A.spiele++;
    B.spiele++;

    A.tore_plus += result.a;
    A.tore_minus += result.b;

    B.tore_plus += result.b;
    B.tore_minus += result.a;

    if (result.a > result.b) {
      // A gewinnt
      A.punkte += 3;
    } else if (result.b > result.a) {
      // B gewinnt
      B.punkte += 3;
    } else {
      // Remis
      A.punkte += 1;
      B.punkte += 1;
    }
  });
}

//Sort table 
function sortierteTeamListe(tabelle) {
  return Object.values(tabelle).sort((a, b) => {

    // 1. Punkte
    if (b.punkte !== a.punkte) return b.punkte - a.punkte;

    // 2. Tordifferenz
    const diffA = a.tore_plus - a.tore_minus;
    const diffB = b.tore_plus - b.tore_minus;
    if (diffB !== diffA) return diffB - diffA;

    // 3. Tore plus
    if (b.tore_plus !== a.tore_plus) return b.tore_plus - a.tore_plus;

    // 4. Alphabetisch
    return a.team.localeCompare(b.team);
  });
}

const allTables = {};

Object.keys(teams).forEach(key => {
  allTables[key] = erstelleLeereTabelleFürGruppe(key);
  verarbeiteErgebnisse(allTables[key], key)
  allTables[key] = sortierteTeamListe(allTables[key])              //Sortet array of teams with keys team, spiele, punkte, tore_plus, tore_minus
});

function sortTeams(liste) {
  return liste.slice().sort((a, b) => {

    // 1. Punkte
    if (b.punkte !== a.punkte) return b.punkte - a.punkte;

    // 2. Tordifferenz
    const diffA = a.tore_plus - a.tore_minus;
    const diffB = b.tore_plus - b.tore_minus;
    if (diffB !== diffA) return diffB - diffA;

    // 3. Tore plus
    if (b.tore_plus !== a.tore_plus) return b.tore_plus - a.tore_plus;

    // 4. Zufall, falls alles gleich ist
    return Math.random() - 0.5;
  });
}
