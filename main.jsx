import { useEffect, useMemo, useRef, useState } from "react"

const ARTIKEL = [{ nummer: "97", name: "Strauchtomaten", kategorie: "Obst/Gemüse" },

  { kategorie: "Obst/Gemüse", name: "Ananas", nummer: "59" },
  { kategorie: "Obst/Gemüse", name: "Apfel grün", nummer: "15" },
  { kategorie: "Obst/Gemüse", name: "Pink Lady", nummer: "16" },
  { kategorie: "Obst/Gemüse", name: "Apfel rot", nummer: "47" },
  { kategorie: "Obst/Gemüse", name: "Aubergine", nummer: "90" },
  { kategorie: "Obst/Gemüse", name: "Avocado", nummer: "621" },
  { kategorie: "Obst/Gemüse", name: "Baby Melone Bio", nummer: "19" },
  { kategorie: "Obst/Gemüse", name: "Banane", nummer: "55" },
  { kategorie: "Obst/Gemüse", name: "Blumenkohl", nummer: "200" },
  { kategorie: "Obst/Gemüse", name: "Cantaloupmelone", nummer: "21" },
  { kategorie: "Obst/Gemüse", name: "Chinakohl", nummer: "80" },
  { kategorie: "Obst/Gemüse", name: "Cherry Tomaten", nummer: "99" },
  { kategorie: "Obst/Gemüse", name: "Birnen", nummer: "20" },
  { kategorie: "Obst/Gemüse", name: "Eisbergsalat", nummer: "101" },
  { kategorie: "Obst/Gemüse", name: "Baby Banane", nummer: "13" },
  { kategorie: "Obst/Gemüse", name: "Fairtrade Banane", nummer: "45" },
  { kategorie: "Obst/Gemüse", name: "Feigen", nummer: "634" },
  { kategorie: "Obst/Gemüse", name: "Fenchel", nummer: "83" },
  { kategorie: "Obst/Gemüse", name: "Granatapfel", nummer: "622" },
  { kategorie: "Obst/Gemüse", name: "Gurke", nummer: "310" },
  { kategorie: "Obst/Gemüse", name: "Honigmelone", nummer: "29" },
  { kategorie: "Obst/Gemüse", name: "Kiwi", nummer: "624" },
  { kategorie: "Obst/Gemüse", name: "Kiwi Gold", nummer: "626" },
  { kategorie: "Obst/Gemüse", name: "Kohlrabi", nummer: "202" },
  { kategorie: "Obst/Gemüse", name: "Lauchzwiebeln", nummer: "140" },
  { kategorie: "Obst/Gemüse", name: "Limette", nummer: "609" },
  { kategorie: "Obst/Gemüse", name: "Porree", nummer: "222" },
  { kategorie: "Obst/Gemüse", name: "Radieschen", nummer: "150" },
  { kategorie: "Obst/Gemüse", name: "Rettich", nummer: "160" },
  { kategorie: "Obst/Gemüse", name: "Rotkohl", nummer: "86" },
  { kategorie: "Obst/Gemüse", name: "Spitzkohl", nummer: "87" },
  { kategorie: "Obst/Gemüse", name: "Süßkartoffeln", nummer: "25" },
  { kategorie: "Obst/Gemüse", name: "Weißkohl", nummer: "84" },
  { kategorie: "Obst/Gemüse", name: "Wirsing", nummer: "85" },
  { kategorie: "Obst/Gemüse", name: "Zucchini", nummer: "93" },
  { kategorie: "Obst/Gemüse", name: "Zwiebeln", nummer: "95" },

  { kategorie: "Backwaren", name: "Apfeltasche", nummer: "572" },
  { kategorie: "Backwaren", name: "Schoko Donut", nummer: "937" },
  { kategorie: "Backwaren", name: "Pinky Donut", nummer: "951" },
  { kategorie: "Backwaren", name: "Spritzkuchen", nummer: "929" },
  { kategorie: "Backwaren", name: "Briocheknoten", nummer: "886" },
  { kategorie: "Backwaren", name: "Berliner", nummer: "861" },
  { kategorie: "Backwaren", name: "Schinken-Käse Croissant", nummer: "941" },
  { kategorie: "Backwaren", name: "Wienerle Croissant", nummer: "938" },
  { kategorie: "Backwaren", name: "Buttercroissant", nummer: "991" },
  { kategorie: "Backwaren", name: "Nuss Nougat Croissant", nummer: "928" },
  { kategorie: "Backwaren", name: "Croissant mit Kakaofüllung", nummer: "764" },
  { kategorie: "Backwaren", name: "Franzbrötchen", nummer: "693" },
  { kategorie: "Backwaren", name: "Schokobrötchen", nummer: "900" },
  { kategorie: "Backwaren", name: "Pizza Salami", nummer: "816" },
  { kategorie: "Backwaren", name: "Pizza Schinken", nummer: "969" },
  { kategorie: "Backwaren", name: "Hot Dog", nummer: "735" },
  { kategorie: "Backwaren", name: "Laugendog", nummer: "788" },
  { kategorie: "Backwaren", name: "Frikandel", nummer: "724" },
  { kategorie: "Backwaren", name: "Käseschnecke", nummer: "721" },
  { kategorie: "Backwaren", name: "Knusperstange Käse", nummer: "713" },
  { kategorie: "Backwaren", name: "Börek", nummer: "985" },
  { kategorie: "Backwaren", name: "Sonnenblumencrusti", nummer: "782" },
  { kategorie: "Backwaren", name: "Kürbiskernbrötchen", nummer: "989" },
  { kategorie: "Backwaren", name: "Käse Laugenstange", nummer: "934" },
  { kategorie: "Backwaren", name: "Käsebrezel", nummer: "718" },
  { kategorie: "Backwaren", name: "Laugeneck", nummer: "688" },
  { kategorie: "Backwaren", name: "Laugenbrötchen", nummer: "869" },
  { kategorie: "Backwaren", name: "Körnerglück", nummer: "803" },
  { kategorie: "Backwaren", name: "Doppelbrötchen Dinkel Bürli", nummer: "795" },
  { kategorie: "Backwaren", name: "Dinkelvollkornbrötchen", nummer: "905" },
  { kategorie: "Backwaren", name: "Weizenbrötchen", nummer: "918" },
  { kategorie: "Backwaren", name: "Bioland Steinofenbrötchen", nummer: "811" },
  { kategorie: "Backwaren", name: "Bioland Sauerteigkruste", nummer: "841" },
  { kategorie: "Backwaren", name: "Bioland Vollkoen-Körnerlaib", nummer: "730" },
  { kategorie: "Backwaren", name: "Bioland Vollkorn-Körner-Krusti", nummer: "715" },
  { kategorie: "Backwaren", name: "Walnuss-Honig-Brot", nummer: "773" },
  { kategorie: "Backwaren", name: "Doppelbrötchen", nummer: "794" },
  { kategorie: "Backwaren", name: "Fladenbrot", nummer: "965" },
  { kategorie: "Backwaren", name: "Kürbiskernbrot", nummer: "988" },
  { kategorie: "Backwaren", name: "Wurzelbrot", nummer: "868" },
  { kategorie: "Backwaren", name: "Sesamring", nummer: "694" },
  { kategorie: "Backwaren", name: "Baguette", nummer: "791" },
  { kategorie: "Backwaren", name: "Bauernbaguette", nummer: "813" },
  { kategorie: "Backwaren", name: "Dinkelbrot", nummer: "838" },
  { kategorie: "Backwaren", name: "Bauernkruste", nummer: "935" },
  { kategorie: "Backwaren", name: "Bauernmildes", nummer: "744" },
  { kategorie: "Backwaren", name: "Roggenkruste", nummer: "745" },
  { kategorie: "Backwaren", name: "Weltmeisterbrot", nummer: "987" },
  { kategorie: "Backwaren", name: "Weltmeisterbrötchen", nummer: "992" },
  { kategorie: "Backwaren", name: "Ciabatta", nummer: "763" },
]

function mischen(liste) {
  return [...liste].sort(() => Math.random() - 0.5)
}

function ladeSpeicher(wert, standardWert) {
  try {
    const gespeichert = localStorage.getItem(wert)
    return gespeichert ? JSON.parse(gespeichert) : standardWert
  } catch {
    return standardWert
  }
}

function speichere(wert, inhalt) {
  try {
    localStorage.setItem(wert, JSON.stringify(inhalt))
  } catch {}
}

export default function KassentrainerApp() {
  const kategorien = useMemo(() => ["Alle", ...new Set(ARTIKEL.map((a) => a.kategorie))], [])

  const [ansicht, setAnsicht] = useState("start")
  const [kategorie, setKategorie] = useState(() => ladeSpeicher("kassenTrainerKategorie", "Backwaren"))
  const [anzahl, setAnzahl] = useState(() => ladeSpeicher("kassenTrainerAnzahl", "Alle"))
  const [fragen, setFragen] = useState([])
  const [index, setIndex] = useState(0)
  const [eingabe, setEingabe] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [ergebnisse, setErgebnisse] = useState([])
  const [alleErgebnisse, setAlleErgebnisse] = useState(() => ladeSpeicher("kassenTrainerStatistik", []))
  const [startzeit, setStartzeit] = useState(null)
  const [dunkelmodus, setDunkelmodus] = useState(() => ladeSpeicher("kassenTrainerDunkelmodus", true))
  const [suchbegriff, setSuchbegriff] = useState("")
  const [aktiveSuche, setAktiveSuche] = useState("")
  const suchfeldRef = useRef(null)

  const aktuelleFrage = fragen[index]

  useEffect(() => speichere("kassenTrainerStatistik", alleErgebnisse), [alleErgebnisse])
  useEffect(() => speichere("kassenTrainerDunkelmodus", dunkelmodus), [dunkelmodus])
  useEffect(() => speichere("kassenTrainerKategorie", kategorie), [kategorie])
  useEffect(() => speichere("kassenTrainerAnzahl", anzahl), [anzahl])

  const farben = dunkelmodus
    ? {
        seite: "bg-neutral-950 text-white",
        karte: "bg-neutral-900 shadow-2xl border border-neutral-800",
        textSchwach: "text-neutral-400",
        feld: "bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500",
        flaeche: "bg-neutral-800 text-neutral-200",
        flaeche2: "bg-neutral-950 border border-neutral-800",
        buttonSek: "bg-neutral-800 text-white",
      }
    : {
        seite: "bg-neutral-100 text-neutral-950",
        karte: "bg-white shadow-2xl",
        textSchwach: "text-neutral-500",
        feld: "bg-white border-neutral-300 text-neutral-950 placeholder:text-neutral-400",
        flaeche: "bg-neutral-100 text-neutral-700",
        flaeche2: "bg-neutral-100",
        buttonSek: "bg-neutral-200 text-neutral-950",
      }

  const gefilterteArtikel = ARTIKEL.filter((artikel) => {
    const text = `${artikel.name} ${artikel.nummer} ${artikel.kategorie}`.toLowerCase()
    return text.includes(aktiveSuche.toLowerCase())
  })

  const stats = statistik()

  function quizStarten(nurFehler = false) {
    let basis = nurFehler
      ? ergebnisse.filter((e) => !e.richtig).map((e) => e.artikel)
      : ARTIKEL.filter((artikel) => kategorie === "Alle" || artikel.kategorie === kategorie)

    let gemischt = mischen(basis)

    if (anzahl !== "Alle") {
      gemischt = gemischt.slice(0, Number(anzahl))
    }

    setFragen(gemischt)
    setIndex(0)
    setEingabe("")
    setFeedback(null)
    setErgebnisse([])
    setStartzeit(Date.now())
    setAnsicht("quiz")
  }

  function pruefen() {
    if (!aktuelleFrage || !eingabe.trim()) return

    const richtig = eingabe.trim() === aktuelleFrage.nummer
    const neuesErgebnis = {
      artikel: aktuelleFrage,
      eingabe: eingabe.trim(),
      richtig,
      zeitpunkt: new Date().toISOString(),
    }

    setFeedback(neuesErgebnis)
    setErgebnisse((alt) => [...alt, neuesErgebnis])
    setAlleErgebnisse((alt) => [...alt, neuesErgebnis])
  }

  function zahlEingeben(zahl) {
    if (feedback) return
    setEingabe((alt) => {
      if (alt.length >= 4) return alt
      return `${alt}${zahl}`
    })
  }

  function doppelteNullEingeben() {
    if (feedback) return
    setEingabe((alt) => {
      if (alt.length >= 4) return alt
      return `${alt}00`.slice(0, 4)
    })
  }

  function letzteZahlLoeschen() {
    if (feedback) return
    setEingabe((alt) => alt.slice(0, -1))
  }

  function eingabeLeeren() {
    if (feedback) return
    setEingabe("")
  }

  function weiter() {
    if (index + 1 >= fragen.length) {
      setAnsicht("ergebnis")
      return
    }

    setIndex(index + 1)
    setEingabe("")
    setFeedback(null)
  }

  function zeitText() {
    if (!startzeit) return "0:00"
    const sekunden = Math.round((Date.now() - startzeit) / 1000)
    const minuten = Math.floor(sekunden / 60)
    const rest = String(sekunden % 60).padStart(2, "0")
    return `${minuten}:${rest}`
  }

  function statistik() {
    const gesamt = alleErgebnisse.length
    const richtigGesamt = alleErgebnisse.filter((e) => e.richtig).length
    const falschGesamt = alleErgebnisse.filter((e) => !e.richtig).length
    const quote = gesamt ? Math.round((richtigGesamt / gesamt) * 100) : 0

    const fehlerZaehler = {}
    alleErgebnisse.filter((e) => !e.richtig).forEach((e) => {
      const key = e.artikel.name
      fehlerZaehler[key] = fehlerZaehler[key] || { artikel: e.artikel, count: 0 }
      fehlerZaehler[key].count += 1
    })

    const problemArtikel = Object.values(fehlerZaehler)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return { gesamt, richtigGesamt, falschGesamt, quote, problemArtikel }
  }

  const richtig = ergebnisse.filter((e) => e.richtig).length
  const falsch = ergebnisse.filter((e) => !e.richtig).length

  function Rahmen({ children }) {
    return (
      <div className={`min-h-screen ${farben.seite} flex items-center justify-center p-2 transition-colors`}>
        <div className={`${farben.karte} rounded-3xl p-6 w-full max-w-md transition-colors`}>
          <div className="flex justify-end mb-2">
            <button onClick={() => setDunkelmodus(!dunkelmodus)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${farben.buttonSek}`}>
              {dunkelmodus ? "☀️ Hell" : "🌙 Dunkel"}
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  }

  function StatistikBox() {
    return (
      <div className={`mt-6 rounded-3xl p-2 ${farben.flaeche2}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl">Statistik</h3>
          <button onClick={() => setAlleErgebnisse([])} className={`rounded-xl px-3 py-2 text-sm ${farben.buttonSek}`}>
            Zurücksetzen
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`rounded-xl p-2 ${farben.flaeche}`}>
            <p className="text-lg font-bold">{stats.gesamt}</p>
            <p className={`text-xs ${farben.textSchwach}`}>Gesamt</p>
          </div>
          <div className="bg-green-900/30 rounded-xl p-2">
            <p className="text-lg font-bold text-green-400">{stats.quote}%</p>
            <p className="text-xs text-neutral-400">Treffer</p>
          </div>
          <div className="bg-red-900/30 rounded-xl p-2">
            <p className="text-lg font-bold text-red-400">{stats.falschGesamt}</p>
            <p className="text-xs text-neutral-400">Fehler</p>
          </div>
        </div>

        {stats.problemArtikel.length > 0 ? (
          <div className="mt-5">
            <h4 className="font-semibold mb-2">Häufigste Fehler</h4>
            <div className="space-y-2">
              {stats.problemArtikel.map((eintrag) => (
                <div key={eintrag.artikel.name} className={`rounded-xl p-2 flex justify-between gap-2 ${farben.flaeche}`}>
                  <span> {eintrag.artikel.name}</span>
                  <span className="font-bold">{eintrag.count}×</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={`mt-2 text-sm ${farben.textSchwach}`}>Noch keine Fehler gespeichert.</p>
        )}
      </div>
    )
  }

  if (ansicht === "start") {
    return (
      <Rahmen>
        <h1 className="text-xl font-bold text-center mb-2">Kassen-Trainer</h1>
        <p className={`text-center ${farben.textSchwach} mb-8`}>Artikelnummern durch Eintippen lernen</p>

        <div className="space-y-5">
          <div>
            <label className="font-semibold block mb-2">Kategorie</label>
            <select value={kategorie} onChange={(e) => setKategorie(e.target.value)} className={`w-full border rounded-xl p-2 text-base ${farben.feld}`}>
              {kategorien.map((kat) => (
                <option key={kat} value={kat}>{kat === "Alle" ? "⭐ Alle Kategorien" : `${kat === "Backwaren" ? "🥐" : "🍎"} ${kat}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">Anzahl Fragen</label>
            <div className="grid grid-cols-4 gap-2">
              {["5", "10", "20", "Alle"].map((wert) => (
                <button key={wert} onClick={() => setAnzahl(wert)} className={`rounded-xl p-2 font-semibold ${anzahl === wert ? "bg-green-600 text-white" : farben.buttonSek}`}>
                  {wert}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => quizStarten(false)} className="w-full mt-8 bg-green-600 text-white rounded-xl p-2 text-base font-semibold active:scale-[0.98] transition">
          Quiz starten
        </button>

        <div className={`mt-6 rounded-xl p-2 text-sm ${farben.flaeche}`}>
          Aktuell gespeichert: <strong>{ARTIKEL.length}</strong> Artikel
        </div>

        <StatistikBox />

        <div className={`mt-6 rounded-3xl p-2 ${farben.flaeche2}`}>
          <div className="flex items-center justify-between mb-2 gap-2">
            <h3 className="font-bold text-xl">Artikelliste</h3>
            <span className={`text-sm ${farben.textSchwach}`}>{gefilterteArtikel.length} Artikel</span>
          </div>

          <input
            ref={suchfeldRef}
            type="text"
            placeholder="Artikel suchen..."
            defaultValue={suchbegriff}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const wert = e.currentTarget.value
                setSuchbegriff(wert)
                setAktiveSuche(wert)
              }
            }}
            className={`w-full border rounded-xl p-2 mb-3 ${farben.feld}`}
          />

          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => {
                const wert = suchfeldRef.current?.value || ""
                setSuchbegriff(wert)
                setAktiveSuche(wert)
              }}
              className="bg-green-600 text-white rounded-xl p-2 font-semibold active:scale-[0.98] transition"
            >
              Suchen
            </button>
            <button
              onClick={() => {
                setSuchbegriff("")
                setAktiveSuche("")
                if (suchfeldRef.current) suchfeldRef.current.value = ""
              }}
              className={`rounded-xl p-2 font-semibold ${farben.buttonSek}`}
            >
              Zurücksetzen
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {gefilterteArtikel.map((artikel) => (
              <div key={`${artikel.kategorie}-${artikel.name}`} className={`rounded-xl p-2 flex items-center justify-between gap-2 ${farben.flaeche}`}>
                <div>
                  <p className="font-semibold"> {artikel.name}</p>
                  <p className={`text-sm ${farben.textSchwach}`}>{artikel.kategorie}</p>
                </div>
                <div className="text-lg font-bold tracking-wider">{artikel.nummer}</div>
              </div>
            ))}
          </div>
        </div>
      </Rahmen>
    )
  }

  if (ansicht === "quiz" && aktuelleFrage) {
    return (
      <Rahmen>
        <div className={`flex justify-between text-sm ${farben.textSchwach} mb-8`}>
          <span>Frage {index + 1} von {fragen.length}</span>
          <span>{aktuelleFrage.kategorie}</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">{aktuelleFrage.name}</h2>
          <p className={`${farben.textSchwach} mt-2`}>Welche Artikelnummer?</p>
        </div>

        <div className={`w-full border rounded-xl p-2 text-center text-xl font-bold tracking-widest min-h-[64px] flex items-center justify-center ${farben.feld}`}>
          {eingabe || <span className={farben.textSchwach}>---</span>}
        </div>

        {!feedback && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((zahl) => (
              <button
                key={zahl}
                onClick={() => zahlEingeben(zahl)}
                className={`rounded-xl p-2 text-xl font-bold active:scale-[0.96] transition ${farben.buttonSek}`}
              >
                {zahl}
              </button>
            ))}

            <button
              onClick={() => zahlEingeben(0)}
              className={`rounded-xl p-2 text-xl font-bold active:scale-[0.96] transition ${farben.buttonSek}`}
            >
              0
            </button>

            <button
              onClick={doppelteNullEingeben}
              className={`rounded-xl p-2 text-xl font-bold active:scale-[0.96] transition ${farben.buttonSek}`}
            >
              00
            </button>

            <button
              onClick={letzteZahlLoeschen}
              className={`rounded-xl p-2 text-base font-bold active:scale-[0.96] transition ${farben.buttonSek}`}
            >
              Löschen
            </button>
          </div>
        )}

        {!feedback ? (
          <button onClick={pruefen} className="w-full mt-2 bg-green-600 text-white rounded-xl p-2 text-base font-semibold active:scale-[0.98] transition">
            Prüfen
          </button>
        ) : (
          <>
            <div className={`mt-5 rounded-xl p-2 text-center ${feedback.richtig ? "bg-green-900/30" : "bg-red-900/30"}`}>
              <p className={`font-bold text-lg ${feedback.richtig ? "text-green-400" : "text-red-400"}`}>
                {feedback.richtig ? "RichtigRichtig!" : "FalschFalsch"}
              </p>
              <p className="mt-2">Richtige Nummer: <strong>{aktuelleFrage.nummer}</strong></p>
              {!feedback.richtig && <p className={farben.textSchwach}>Deine Eingabe: {feedback.eingabe}</p>}
            </div>

            <button onClick={weiter} className="w-full mt-2 bg-green-600 text-white rounded-xl p-2 text-base font-semibold active:scale-[0.98] transition">
              {index + 1 >= fragen.length ? "Ergebnis anzeigen" : "Nächste Frage"}
            </button>
          </>
        )}
      </Rahmen>
    )
  }

  return (
    <Rahmen>
      <h1 className="text-xl font-bold text-center mb-2">Ergebnis</h1>
      <p className={`text-center ${farben.textSchwach} mb-8`}>Zeit: {zeitText()}</p>

      <div className="grid grid-cols-2 gap-2 text-center mb-8">
        <div className="bg-green-900/30 rounded-xl p-2">
          <p className="text-xl font-bold text-green-400">{richtig}</p>
          <p className="text-sm">Richtig</p>
        </div>
        <div className="bg-red-900/30 rounded-xl p-2">
          <p className="text-xl font-bold text-red-400">{falsch}</p>
          <p className="text-sm">Falsch</p>
        </div>
      </div>

      {falsch > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-xl mb-3">Falschbeantwortet</h3>
          <div className="space-y-2">
            {ergebnisse.filter((e) => !e.richtig).map((e, i) => (
              <div key={i} className={`rounded-xl p-2 ${farben.flaeche}`}>
                <div className="flex justify-between gap-2">
                  <span> {e.artikel.name}</span>
                  <span className="font-bold">{e.artikel.nummer}</span>
                </div>
                <p className={`text-sm mt-1 ${farben.textSchwach}`}>Deine Eingabe: {e.eingabe}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {falsch > 0 && (
        <button onClick={() => quizStarten(true)} className="w-full bg-orange-500 text-white rounded-xl p-2 text-base font-semibold mb-3 active:scale-[0.98] transition">
          Fehler erneut üben
        </button>
      )}

      <button onClick={() => setAnsicht("start")} className="w-full bg-green-600 text-white rounded-xl p-2 text-base font-semibold active:scale-[0.98] transition">
        Neues Quiz starten
      </button>

      <StatistikBox />
    </Rahmen>
  )
}
