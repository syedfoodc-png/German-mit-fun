"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { BookOpen, CheckCircle2, XCircle, Volume2, ArrowLeft, AlertCircle } from 'lucide-react'

export default function GermanApp() {
  const [screen, setScreen] = useState('levels')
  const [xp, setXp] = useState(0)
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [selectedLevel, setSelectedLevel] = useState<any>(null)
  const [levels, setLevels] = useState<any[]>([])
  const [lessons, setLessons] = useState<any[]>([]) // YE MISSING THA
  const [loading, setLoading] = useState(true)

  // BACK BUTTON FUNCTIONS
  const backToLevels = () => {
    setScreen('levels')
    setSelectedLevel(null)
    setLessons([])
  }

  const backToLessons = () => {
    setScreen('lessons')
    setCurrentLesson(null)
  }

  useEffect(() => {
    fetchLevels()
  }, [])

  const fetchLevels = async () => {
    setLoading(true)
    const { data: levelsData, error: levelError } = await supabase
     .from('levels')
     .select('*')
     .order('order', { ascending: true })

    if (!levelsData) {
      alert("DB Error: " + levelError?.message)
      setLoading(false)
      return
    }

    const levelsWithLessons = await Promise.all(
      levelsData.map(async (level) => {
        const { data: lessons } = await supabase
         .from('lessons')
         .select('id, title, "order"')
         .eq('level_id', level.id)
         .order('"order"', { ascending: true })
        return {...level, lessons: lessons || [], totalLessons: lessons?.length || 0 }
      })
    )

    setLevels(levelsWithLessons)
    setLoading(false)
  }

  const openLevel = (level: any) => {
    setSelectedLevel(level)
    setLessons(level.lessons) // YE IMPORTANT HAI
    setScreen('lessons')
  }

  const openLesson = async (lesson: any) => { // lesson object leta hai ab
    const { data, error } = await supabase
     .from('lessons')
     .select('content, title')
     .eq('id', lesson.id)
     .single()

    if (error) {
      alert("Lesson load error: " + error.message)
      return
    }

    setCurrentLesson(data)
    setScreen('lesson')
  }

  const handleComplete = (points: number) => {
    setXp(prev => prev + points)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-purple-600">Loading German mit Fun...</div>
      </div>
    )
  }

  // ===== SCREEN 1: COLORFUL DASHBOARD =====
  if (screen === 'levels') {
    const levelColors: any = {
      'A1': 'from-emerald-400 to-teal-500',
      'A2': 'from-blue-500 to-cyan-500',
      'B1': 'from-red-500 to-rose-500',
      'B2': 'from-purple-500 to-pink-500',
      'C1': 'from-orange-500 to-amber-500',
      'C2': 'from-gray-600 to-slate-700'
    }

    const levelEmojis: any = {
      'A1': '🎯',
      'A2': '🚀',
      'B1': '⚡',
      'B2': '🔥',
      'C1': '👑',
      'C2': '💎'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 relative">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3">
              German Mit Fun
            </h1>
            <p className="text-xl text-white/80 font-medium mb-4">
              khelte khelte sikho german 🇩🇪
            </p>
            <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
              <span className="text-white font-bold text-lg">Score: {xp}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level) => {
              const levelCode = level.title.split(' ')[0]
              const isUnlocked = level.totalLessons > 0
              const gradient = levelColors[levelCode] || 'from-gray-500 to-gray-600'
              const emoji = levelEmojis[levelCode] || '📚'

              return (
                <button
                  key={level.id}
                  onClick={() => isUnlocked && openLevel(level)}
                  disabled={!isUnlocked}
                  className={`group relative bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-2xl transition-all duration-300 text-center ${
                    isUnlocked? 'hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-5xl mb-4">{emoji}</div>
                  <h2 className="text-4xl font-extrabold text-white mb-2">{levelCode}</h2>
                  <p className="text-white/90 text-lg font-semibold mb-2">{level.subtitle}</p>
                  <p className="text-white/70 text-sm">
                    {isUnlocked? `${level.totalLessons} Lessons` : 'Coming Soon'}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ===== SCREEN 2: COLORFUL LESSON LIST =====
 // ===== SCREEN 2: LESSON LIST =====
if (screen === 'lessons') {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button onClick={backToLevels} className="mb-6 flex items-center gap-2 text-white/90 hover:text-white font-semibold transition">
          ← Back to Levels
        </button>

        {/* Header Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl border-white/30">
          <h1 className="text-4xl font-extrabold text-white mb-2">{selectedLevel?.title}</h1>
          <p className="text-white/80 text-lg">Choose your lesson and start learning!</p>
        </div>

        {/* LESSON CARDS - YAHI WALA BUTTON */}
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => openLesson(lesson)}
              // 👇 YAHI PURANA CLASSNAME HAI - ISE REPLACE KAR DE
              className="group w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-left border-2 border-transparent hover:border-emerald-400"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Lesson {index + 1}</p>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition">
                    {lesson.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

  // ===== SCREEN 3: LESSON CONTENT =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={backToLessons}
          className="flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:gap-3 transition"
        >
          <ArrowLeft size={20} /> Back to {selectedLevel?.title}
        </button>

        <LessonRenderer
          content={currentLesson?.content}
          title={currentLesson?.title}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}

// ===== LESSON RENDERER =====
function LessonRenderer({ content, title, onComplete }: any) {
  const [parsedContent, setParsedContent] = useState<any>({ missions: [] })
  const [m, setM] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [inp, setInp] = useState('')

  useEffect(() => {
    if (!content) {
      setParsedContent({ missions: [] })
      return
    }

    try {
      let parsed = content
      if (typeof content === 'string') {
        const cleaned = content.replace(/\\"/g, '"')
        parsed = JSON.parse(cleaned)
      }
      if (typeof parsed.missions === 'string') {
        parsed.missions = JSON.parse(parsed.missions.replace(/\\"/g, '"'))
      }
      setParsedContent(parsed)
    } catch (e) {
      console.error("JSON Parse Error:", e)
      setParsedContent({ missions: [], error: String(e) })
    }

    setM(0)
    setShowResult(false)
    setInp('')
  }, [content])

  const missions = Array.isArray(parsedContent.missions)? parsedContent.missions : []

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-4 border-red-500 rounded-3xl p-10 max-w-2xl text-center">
          <AlertCircle size={64} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">CONTENT IS NULL!</h2>
          <p className="text-red-600 mb-4">Supabase se lesson ka data nahi aa raha</p>
        </div>
      </div>
    )
  }

  if (!missions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-16 text-center max-w-3xl">
          <BookOpen size={56} className="mx-auto text-gray-300 mb-5" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Missions Yet</h3>
        </div>
      </div>
    )
  }

  const mission = missions[m]

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
              <button key={idx} onClick={() => speak(a.de)}
                className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:scale-105 transition shadow-md">
                <div className="text-3xl font-bold">{a.letter}</div>
                <div className="text-xs opacity-90">[{a.sound}]</div>
              </button>
            ))}
          </div>
          <button onClick={() => next(true)} className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700">
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
              <button key={idx} onClick={() => speak(p.de)}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-6 hover:scale-105 transition shadow-md">
                <div className="text-2xl font-bold">{p.de}</div>
                <div className="text-sm opacity-90">{p.en}</div>
              </button>
            ))}
          </div>
          <button onClick={() => next(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
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
            <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${isCorrect? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {isCorrect? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              <span className="font-semibold">{isCorrect? 'Correct! +10 XP' : `Wrong! Answer: ${mission.answer}`}</span>
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
            <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${isCorrect? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {isCorrect? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              <span className="font-semibold">{isCorrect? 'Correct! +10 XP' : `Wrong! Answer: ${mission.answer}`}</span>
            </div>
          )}
          <button onClick={() => next(inp.toLowerCase().trim() === mission.answer.toLowerCase())}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700">
            Submit
          </button>
        </div>
      </div>
    )
  }

  // VOCAB
  if (mission.type === 'vocab') {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <span className="text-sm font-semibold text-orange-600 mb-2 block">Mission {m + 1}/{missions.length}</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{mission.title}</h3>
          <p className="text-gray-600 mb-6">Tap to hear pronunciation</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {mission.words.map((w: any, idx: number) => (
              <button key={idx} onClick={() => speak(w.de)}
                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-5 text-left hover:scale-105 transition shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold">{w.de}</div>
                    <div className="text-sm opacity-90">{w.en}</div>
                  </div>
                  <Volume2 size={20} />
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => next(true)} className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700">
            Next →
          </button>
        </div>
      </div>
    )
  }

  // INFO MISSION
  if (mission.type === 'info') {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <span className="text-sm font-semibold text-blue-600 mb-2 block">Mission {m + 1}/{missions.length}</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{mission.title}</h3>
          <p className="text-gray-700 text-lg mb-4">{mission.text}</p>
          {mission.note && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-blue-700 font-semibold">💡 Example: {mission.note}</p>
            </div>
          )}
          <button onClick={() => next(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
            Got it! Next →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-3xl p-8 text-center">
        <XCircle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold text-yellow-700">Unknown type: "{mission.type}"</h3>
        <button onClick={() => next(true)} className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-xl">Skip</button>
      </div>
    </div>
  )
}