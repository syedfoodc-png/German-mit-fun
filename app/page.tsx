"use client"
import { useState, useEffect } from 'react'
import { BookOpen, CheckCircle2, XCircle, Volume2, ArrowLeft, AlertCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function GermanApp() {
  const [screen, setScreen] = useState('levels')
  const [xp, setXp] = useState(0)
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [selectedLevel, setSelectedLevel] = useState<any>(null)
  const [levels, setLevels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
    setScreen('lessons')
  }

  const openLesson = async (lessonId: string) => {
    const { data, error } = await supabase
    .from('lessons')
    .select('content, title')
    .eq('id', lessonId)
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

  // ===== SCREEN 1: PRO DASHBOARD =====
  if (screen === 'levels') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* CENTERED HEADER */}
          <div className="text-center mb-12 mt-4">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
              German mit Fun
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-4">
              khelte khelte sikho german 🇩🇪✨
            </p>
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-xl">
              {xp} XP
            </div>
          </div>

          {/* GLASSMORPHISM CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => openLevel(level)}
                className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-white/50 overflow-hidden text-left"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Level Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {level.title.split(' ')[0]}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {level.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{level.subtitle}</p>
                  <div className="flex items-center gap-2 text-purple-600 font-semibold">
                    <BookOpen size={18} />
                    <span>{level.totalLessons} Lessons</span>
                  </div>

                  {/* Progress bar for A1 */}
                  {level.totalLessons > 0 && level.title.includes('A1') && (
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full w-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ===== SCREEN 2: LESSONS LIST =====
  if (screen === 'lessons' && selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setScreen('levels')}
            className="flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:gap-3 transition"
          >
            <ArrowLeft size={20} /> Back to Levels
          </button>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedLevel.title}</h2>
            <p className="text-gray-600">{selectedLevel.subtitle}</p>
          </div>

          <div className="space-y-3">
            {selectedLevel.lessons.map((lesson: any, idx: number) => (
              <button
                key={lesson.id}
                onClick={() => openLesson(lesson.id)}
                className="w-full bg-white/90 backdrop-blur-md hover:bg-white border-gray-200 hover:border-purple-300 p-5 rounded-xl font-semibold text-left hover:shadow-lg transition-all duration-200 flex items-center justify-between group"
              >
                <div>
                  <div className="text-gray-400 text-sm mb-1">Lesson {idx + 1}</div>
                  <div className="text-lg text-gray-800 group-hover:text-purple-600">{lesson.title}</div>
                </div>
                <div className="text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition">→</div>
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
          onClick={() => setScreen('lessons')}
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

// ===== LESSON RENDERER - SAME AS YOURS =====
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