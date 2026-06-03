import { useState, useEffect } from 'react'
import { BookOpen, CheckCircle2, XCircle, Volume2 } from 'lucide-react'

export default function LessonRenderer({ content, title, onComplete }: any) {
  const [parsedContent, setParsedContent] = useState<any>({ missions: [] })
  const [m, setM] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [inp, setInp] = useState('')

  // Parse with extra safety
 useEffect(() => {
  console.log("Raw Content from DB:", content)

  try {
    let parsed = content

    if (typeof content === 'string') {
      const cleaned = content.replace(/\\"/g, '"')
      parsed = JSON.parse(cleaned)
    }

    if (typeof parsed.missions === 'string') {
      parsed.missions = JSON.parse(parsed.missions.replace(/\\"/g, '"'))
    }

    console.log("Parsed Missions:", parsed.missions)
    setParsedContent(parsed)
  } catch (e) {
    console.error("JSON Parse Error:", e)
    setParsedContent({ missions: [], error: String(e) }) // <-- YE LINE FIX
  }

  setM(0)
  setShowResult(false)
  setInp('')
}, [content])

  const missions = Array.isArray(parsedContent.missions)? parsedContent.missions : []

  // No missions - full screen dikhao
  if (!missions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-gray-100 p-16 text-center max-w-3xl">
          <BookOpen size={56} className="mx-auto text-gray-300 mb-5" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Missions Yet</h3>
          <p className="text-gray-500 mb-4">This lesson needs content in database</p>

          {parsedContent.error && (
            <div className="bg-red-50 border-red-200 rounded-lg p-4 mt-4 text-left">
              <p className="text-red-600 text-sm font-semibold mb-2">JSON Parse Error:</p>
              <code className="text-xs text-red-700">{parsedContent.error}</code>
            </div>
          )}

          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-600">Show Raw Content</summary>
            <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-auto max-h-40">
              {JSON.stringify(content, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    )
  }

  const mission = missions[m]

  console.log("Rendering:", { m, type: mission.type, keys: Object.keys(mission) })

  const speak = (t: string) => {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(t)
    u.lang = 'de-DE'
    u.rate = 0.85
    speechSynthesis.speak(u)
  }

  const next = (correct = true) => {
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) onComplete(10)

    setTimeout(() => {
      setShowResult(false)
      setInp('')
      if (m < missions.length - 1) {
        setM(m + 1)
      } else {
        onComplete(parsedContent.points || 30)
        alert(`🎉 Lesson Complete! +${parsedContent.points || 30} XP`)
      }
    }, 1200)
  }

  // ALPHABET
  if (mission.type === 'info' && mission.alphabet) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-6">
          <span className="text-sm font-semibold text-purple-600 mb-2 block">Mission {m + 1}/{missions.length}</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{mission.title}</h3>
          <p className="text-gray-600 mb-2">{mission.text}</p>
          {mission.note && <p className="text-sm text-blue-600 mb-6 italic">{mission.note}</p>}

          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
            {mission.alphabet.map((a: any, idx: number) => (
              <button
                key={idx}
                onClick={() => speak(a.de)}
                className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:scale-105 transition shadow-md"
              >
                <div className="text-3xl font-bold">{a.letter}</div>
                <div className="text-xs opacity-90">[{a.sound}]</div>
              </button>
            ))}
          </div>

          <button onClick={() => next(true)} className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold">
            Next →
          </button>
        </div>
      </div>
    )
  }

  // PRONOUNS
  if (mission.type === 'info' && mission.pronouns) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <span className="text-sm font-semibold text-blue-600 mb-2 block">Mission {m + 1}/{missions.length}</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{mission.title}</h3>
          <p className="text-gray-600 mb-6">{mission.text}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {mission.pronouns.map((p: any, idx: number) => (
              <button
                key={idx}
                onClick={() => speak(p.de)}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-6 hover:scale-105 transition shadow-md"
              >
                <div className="text-2xl font-bold">{p.de}</div>
                <div className="text-sm opacity-90">{p.en}</div>
              </button>
            ))}
          </div>

          <button onClick={() => next(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
            Next →
          </button>
        </div>
      </div>
    )
  }

  // QUIZ
  if (mission.type === 'quiz') {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <span className="text-sm font-semibold text-purple-600 mb-2 block">Mission {m + 1}/{missions.length}</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{mission.q}</h3>
          <div className="grid grid-cols-2 gap-4">
            {mission.options.map((opt: string, idx: number) => (
              <button key={idx} onClick={() => next(opt === mission.answer)}
                className="bg-gray-100 hover:bg-purple-100 border-2 hover:border-purple-400 py-5 rounded-xl font-semibold text-lg transition">
                {opt}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`mt-6 p-4 rounded-xl ${isCorrect? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {isCorrect? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              {isCorrect? 'Correct! +10 XP' : `Wrong! Answer: ${mission.answer}`}
            </div>
          )}
        </div>
      </div>
    )
  }

  // TYPING
  if (mission.type === 'typing') {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <span className="text-sm font-semibold text-purple-600 mb-2 block">Mission {m + 1}/{missions.length}</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{mission.q}</h3>
          <input value={inp} onChange={(e) => setInp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && next(inp.toLowerCase().trim() === mission.answer.toLowerCase())}
            className="w-full p-4 border-2 rounded-xl text-lg mb-4 focus:border-purple-400 outline-none"
            placeholder="Type answer..." autoFocus />
          {showResult && (
            <div className={`mb-4 p-4 rounded-xl ${isCorrect? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {isCorrect? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              {isCorrect? 'Correct! +10 XP' : `Wrong! Answer: ${mission.answer}`}
            </div>
          )}
          <button onClick={() => next(inp.toLowerCase().trim() === mission.answer.toLowerCase())}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold">
            Submit
          </button>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-3xl p-8 text-center">
        <XCircle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold text-yellow-700">Unknown type: "{mission.type}"</h3>
        <p className="text-sm text-yellow-600 mt-2">Keys: {Object.keys(mission).join(', ')}</p>
        <button onClick={() => next(true)} className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-xl">
          Skip
        </button>
      </div>
    </div>
  )
}