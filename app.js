let ARTIKEL = []

let ansicht = "start"
let kategorie = ladeSpeicher("kassenTrainerKategorie", "Backwaren")
let anzahl = ladeSpeicher("kassenTrainerAnzahl", "Alle")
let fragen = []
let index = 0
let eingabe = ""
let feedback = null
let ergebnisse = []
let alleErgebnisse = ladeSpeicher("kassenTrainerStatistik", [])
let startzeit = null
let dunkelmodus = ladeSpeicher("kassenTrainerDunkelmodus", true)
let suchbegriff = ""
let aktiveSuche = ""

function ladeSpeicher(key, fallback) {
  try {
    const wert = localStorage.getItem(key)
    return wert ? JSON.parse(wert) : fallback
  } catch {
    return fallback
  }
}

function speichere(key, wert) {
  try {
    localStorage.setItem(key, JSON.stringify(wert))
  } catch {}
}

function speichern() {
  speichere("kassenTrainerKategorie", kategorie)
  speichere("kassenTrainerAnzahl", anzahl)
  speichere("kassenTrainerStatistik", alleErgebnisse)
  speichere("kassenTrainerDunkelmodus", dunkelmodus)
}

function mischen(liste) {
  return [...liste].sort(() => Math.random() - 0.5)
}

function setTheme() {
  document.body.className = dunkelmodus ? "dark" : "light"
}

async function start() {
  try {
    const res = await fetch("artikel.json?stand=" + Date.now())
    ARTIKEL = await res.json()
  } catch (e) {
    document.getElementById("app").innerHTML = "<p>artikel.json konnte nicht geladen werden.</p>"
    return
  }
  setTheme()
  render()
}

function kategorien() {
  return ["Alle", ...new Set(ARTIKEL.map(a => a.kategorie))]
}

function aktuelleFrage() {
  return fragen[index]
}

function statistik() {
  const gesamt = alleErgebnisse.length
  const richtigGesamt = alleErgebnisse.filter(e => e.richtig).length
  const falschGesamt = alleErgebnisse.filter(e => !e.richtig).length
  const quote = gesamt ? Math.round((richtigGesamt / gesamt) * 100) : 0

  const fehler = {}
  alleErgebnisse.filter(e => !e.richtig).forEach(e => {
    const key = e.artikel.name
    fehler[key] = fehler[key] || { artikel: e.artikel, count: 0 }
    fehler[key].count += 1
  })

  const problemArtikel = Object.values(fehler)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return { gesamt, richtigGesamt, falschGesamt, quote, problemArtikel }
}

function quizStarten(nurFehler = false) {
  let basis = nurFehler
    ? ergebnisse.filter(e => !e.richtig).map(e => e.artikel)
    : ARTIKEL.filter(a => kategorie === "Alle" || a.kategorie === kategorie)

  let gemischt = mischen(basis)

  if (anzahl !== "Alle") {
    gemischt = gemischt.slice(0, Number(anzahl))
  }

  fragen = gemischt
  index = 0
  eingabe = ""
  feedback = null
  ergebnisse = []
  startzeit = Date.now()
  ansicht = "quiz"
  render()
}

function pruefen() {
  const frage = aktuelleFrage()
  if (!frage || !eingabe.trim()) return

  const richtig = eingabe.trim() === frage.nummer
  const neu = {
    artikel: frage,
    eingabe: eingabe.trim(),
    richtig,
    zeitpunkt: new Date().toISOString()
  }

  feedback = neu
  ergebnisse.push(neu)
  alleErgebnisse.push(neu)
  speichern()
  render()
}

function weiter() {
  if (index + 1 >= fragen.length) {
    ansicht = "ergebnis"
  } else {
    index += 1
    eingabe = ""
    feedback = null
  }
  render()
}

function zahlEingeben(zahl) {
  if (feedback) return
  if (eingabe.length >= 4) return
  eingabe += String(zahl)
  render()
}

function doppelteNullEingeben() {
  if (feedback) return
  eingabe = (eingabe + "00").slice(0, 4)
  render()
}

function letzteZahlLoeschen() {
  if (feedback) return
  eingabe = eingabe.slice(0, -1)
  render()
}

function zeitText() {
  if (!startzeit) return "0:00"
  const sekunden = Math.round((Date.now() - startzeit) / 1000)
  const minuten = Math.floor(sekunden / 60)
  const rest = String(sekunden % 60).padStart(2, "0")
  return `${minuten}:${rest}`
}

function wrapper(content) {
  return `
    <div class="page">
      <div class="card">
        <div class="topbar">
          <button class="btn btn-secondary" onclick="toggleDarkmode()">${dunkelmodus ? "☀️ Hell" : "🌙 Dunkel"}</button>
        </div>
        ${content}
      </div>
    </div>
  `
}

function toggleDarkmode() {
  dunkelmodus = !dunkelmodus
  speichern()
  setTheme()
  render()
}

function renderStats() {
  const stats = statistik()
  const problem = stats.problemArtikel.length
    ? `<div class="mt">
        <h3>Häufigste Fehler</h3>
        ${stats.problemArtikel.map(e => `
          <div class="article-row surface">
            <span>${escapeHtml(e.artikel.name)}</span>
            <strong>${e.count}×</strong>
          </div>
        `).join("")}
      </div>`
    : `<p class="muted">Noch keine Fehler gespeichert.</p>`

  return `
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <h3>Statistik</h3>
        <button class="btn btn-secondary" onclick="resetStats()">Zurücksetzen</button>
      </div>
      <div class="grid3 mt">
        <div class="stat surface"><strong>${stats.gesamt}</strong><span class="muted">Gesamt</span></div>
        <div class="stat green-panel"><strong class="green">${stats.quote}%</strong><span class="muted">Treffer</span></div>
        <div class="stat red-panel"><strong class="red">${stats.falschGesamt}</strong><span class="muted">Fehler</span></div>
      </div>
      ${problem}
    </section>
  `
}

function resetStats() {
  alleErgebnisse = []
  speichern()
  render()
}

function renderStart() {
  const kats = kategorien()
  const gefiltert = ARTIKEL.filter(a => {
    const text = `${a.name} ${a.nummer} ${a.kategorie}`.toLowerCase()
    return text.includes(aktiveSuche.toLowerCase())
  })

  return wrapper(`
    <h1 class="title">Kassen-Trainer</h1>
    <p class="subtitle muted">Artikelnummern durch Eintippen lernen</p>

    <label>Kategorie</label>
    <select id="kategorie">
      ${kats.map(k => `<option value="${escapeAttr(k)}" ${k === kategorie ? "selected" : ""}>${escapeHtml(k)}</option>`).join("")}
    </select>

    <label>Anzahl Fragen</label>
    <div class="grid4">
      ${["5", "10", "20", "Alle"].map(w => `
        <button class="btn ${anzahl === w ? "btn-primary" : "btn-secondary"}" onclick="setAnzahl('${w}')">${w}</button>
      `).join("")}
    </div>

    <button class="btn btn-primary full mt" onclick="quizStarten(false)">Quiz starten</button>

    <div class="panel surface">
      Aktuell gespeichert: <strong>${ARTIKEL.length}</strong> Artikel
    </div>

    ${renderStats()}

    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <h3>Artikelliste</h3>
        <span class="muted">${gefiltert.length} Artikel</span>
      </div>

      <input id="suche" class="field mt" type="text" placeholder="Artikel suchen..." value="${escapeAttr(suchbegriff)}" />
      <div class="grid2 mt">
        <button class="btn btn-primary" onclick="suchen()">Suchen</button>
        <button class="btn btn-secondary" onclick="sucheZuruecksetzen()">Zurücksetzen</button>
      </div>

      <div class="article-list mt">
        ${gefiltert.map(a => `
          <div class="article-row surface">
            <div>
              <div class="article-name">${escapeHtml(a.name)}</div>
              <div class="muted">${escapeHtml(a.kategorie)}</div>
            </div>
            <div class="article-number">${escapeHtml(a.nummer)}</div>
          </div>
        `).join("")}
      </div>
    </section>
  `)
}

function setAnzahl(wert) {
  anzahl = wert
  speichern()
  render()
}

function suchen() {
  const input = document.getElementById("suche")
  suchbegriff = input ? input.value : ""
  aktiveSuche = suchbegriff
  render()
}

function sucheZuruecksetzen() {
  suchbegriff = ""
  aktiveSuche = ""
  render()
}

function renderQuiz() {
  const frage = aktuelleFrage()
  if (!frage) {
    ansicht = "start"
    return renderStart()
  }

  return wrapper(`
    <div class="quiz-meta muted">
      <span>Frage ${index + 1} von ${fragen.length}</span>
      <span>${escapeHtml(frage.kategorie)}</span>
    </div>

    <div style="text-align:center;margin-bottom:28px">
      <h2 class="quiz-title">${escapeHtml(frage.name)}</h2>
      <p class="muted">Welche Artikelnummer?</p>
    </div>

    <div class="display">${eingabe || `<span class="muted">---</span>`}</div>

    ${!feedback ? `
      <div class="grid3 keypad">
        ${[7,8,9,4,5,6,1,2,3].map(n => `<button class="btn btn-secondary key" onclick="zahlEingeben(${n})">${n}</button>`).join("")}
        <button class="btn btn-secondary key" onclick="zahlEingeben(0)">0</button>
        <button class="btn btn-secondary key" onclick="doppelteNullEingeben()">00</button>
        <button class="btn btn-secondary key" onclick="letzteZahlLoeschen()">Löschen</button>
      </div>
      <button class="btn btn-primary full mt" onclick="pruefen()">Prüfen</button>
    ` : `
      <div class="feedback ${feedback.richtig ? "green-panel" : "red-panel"}">
        <div class="feedback-title ${feedback.richtig ? "green" : "red"}">${feedback.richtig ? "✅ Richtig!" : "❌ Falsch"}</div>
        <p>Richtige Nummer: <strong>${escapeHtml(frage.nummer)}</strong></p>
        ${!feedback.richtig ? `<p class="muted">Deine Eingabe: ${escapeHtml(feedback.eingabe)}</p>` : ""}
      </div>
      <button class="btn btn-primary full mt" onclick="weiter()">${index + 1 >= fragen.length ? "Ergebnis anzeigen" : "Nächste Frage"}</button>
    `}
  `)
}

function renderErgebnis() {
  const richtig = ergebnisse.filter(e => e.richtig).length
  const falsch = ergebnisse.filter(e => !e.richtig).length
  const falsche = ergebnisse.filter(e => !e.richtig)

  return wrapper(`
    <h1 class="title">Ergebnis</h1>
    <p class="subtitle muted">Zeit: ${zeitText()}</p>

    <div class="grid2">
      <div class="stat green-panel"><strong class="green">${richtig}</strong><span>Richtig</span></div>
      <div class="stat red-panel"><strong class="red">${falsch}</strong><span>Falsch</span></div>
    </div>

    ${falsche.length ? `
      <section class="mt">
        <h3>Falsch beantwortet</h3>
        ${falsche.map(e => `
          <div class="result-row surface">
            <div style="display:flex;justify-content:space-between;gap:12px">
              <span>${escapeHtml(e.artikel.name)}</span>
              <strong>${escapeHtml(e.artikel.nummer)}</strong>
            </div>
            <div class="muted">Deine Eingabe: ${escapeHtml(e.eingabe)}</div>
          </div>
        `).join("")}
      </section>
      <button class="btn btn-orange full mt" onclick="quizStarten(true)">Fehler erneut üben</button>
    ` : ""}

    <button class="btn btn-primary full mt" onclick="ansicht='start';render()">Neues Quiz starten</button>
    ${renderStats()}
  `)
}

function render() {
  speichern()
  setTheme()

  const app = document.getElementById("app")

  if (ansicht === "start") app.innerHTML = renderStart()
  if (ansicht === "quiz") app.innerHTML = renderQuiz()
  if (ansicht === "ergebnis") app.innerHTML = renderErgebnis()

  const katSelect = document.getElementById("kategorie")
  if (katSelect) {
    katSelect.addEventListener("change", e => {
      kategorie = e.target.value
      speichern()
    })
  }

  const suche = document.getElementById("suche")
  if (suche) {
    suche.addEventListener("keydown", e => {
      if (e.key === "Enter") suchen()
    })
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function escapeAttr(value) {
  return escapeHtml(value)
}

start()
