import { useEffect, useMemo, useState } from "react"

const ARTIKEL = [
  { kategorie: "Backwaren", name: "Apfeltasche", nummer: "572", emoji: "🥧" },
  { kategorie: "Backwaren", name: "Schoko Donut", nummer: "937", emoji: "🍩" },
  { kategorie: "Backwaren", name: "Pinky Donut", nummer: "951", emoji: "🍩" },
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

export default function App() {
  const kategorien = useMemo(() => ["Alle", ...new Set(ARTIKEL.map((a) => a.kategorie))], [])

  const [kategorie, setKategorie] = useState(() => ladeSpeicher("kategorie", "Backwaren"))
  const [anzahl, setAnzahl] = useState(() => ladeSpeicher("anzahl", "Alle"))
  const [fragen, setFragen] = useState([])
  const [index, setIndex] = useState(0)
  const [eingabe, setEingabe] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [dunkelmodus, setDunkelmodus] = useState(() => ladeSpeicher("darkmode", true))
  const [ansicht, setAnsicht] = useState("start")

  useEffect(() => speichere("kategorie", kategorie), [kategorie])
  useEffect(() => speichere("anzahl", anzahl), [anzahl])
  useEffect(() => speichere("darkmode", dunkelmodus), [dunkelmodus])

  const aktuelleFrage = fragen[index]

  function quizStarten() {
    let basis = ARTIKEL.filter((artikel) => kategorie === "Alle" || artikel.kategorie === kategorie)
    let gemischt = mischen(basis)

    if (anzahl !== "Alle") {
      gemischt = gemischt.slice(0, Number(anzahl))
    }

    setFragen(gemischt)
    setIndex(0)
    setEingabe("")
    setFeedback(null)
    setAnsicht("quiz")
  }

  function pruefen() {
    if (!aktuelleFrage) return
    setFeedback(eingabe === aktuelleFrage.nummer)
  }

  const farben = dunkelmodus
    ? "bg-neutral-950 text-white"
    : "bg-neutral-100 text-black"

  return (
    <div className={`min-h-screen ${farben} flex items-center justify-center p-4`}>
      <div className="bg-neutral-900 text-white rounded-3xl p-6 w-full max-w-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDunkelmodus(!dunkelmodus)}
            className="bg-neutral-700 rounded-xl px-3 py-2"
          >
            {dunkelmodus ? "☀️" : "🌙"}
          </button>
        </div>

        {ansicht === "start" ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Kassen‑Trainer</h1>

            <select
              value={kategorie}
              onChange={(e) => setKategorie(e.target.value)}
              className="w-full rounded-2xl p-4 text-black mb-4"
            >
              {kategorien.map((kat) => (
                <option key={kat}>{kat}</option>
              ))}
            </select>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {["5", "10", "20", "Alle"].map((wert) => (
                <button
                  key={wert}
                  onClick={() => setAnzahl(wert)}
                  className={`rounded-2xl p-3 ${anzahl === wert ? "bg-green-600" : "bg-neutral-700"}`}
                >
                  {wert}
                </button>
              ))}
            </div>

            <button
              onClick={quizStarten}
              className="w-full bg-green-600 rounded-2xl p-4 font-bold"
            >
              Quiz starten
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl text-center font-bold mb-6">
              {aktuelleFrage?.emoji} {aktuelleFrage?.name}
            </h2>

            <input
              value={eingabe}
              onChange={(e) => setEingabe(e.target.value)}
              className="w-full rounded-2xl p-4 text-black text-center text-2xl"
              placeholder="Nummer eingeben"
            />

            {!feedback ? (
              <button
                onClick={pruefen}
                className="w-full bg-green-600 rounded-2xl p-4 mt-4 font-bold"
              >
                Prüfen
              </button>
            ) : (
              <button
                onClick={() => {
                  if (index + 1 >= fragen.length) {
                    setAnsicht("start")
                  } else {
                    setIndex(index + 1)
                    setFeedback(null)
                    setEingabe("")
                  }
                }}
                className="w-full bg-blue-600 rounded-2xl p-4 mt-4 font-bold"
              >
                Weiter
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
