
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Quiz = {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

export default function QuizPage() {
  const params = useParams()
  const lessonid = params.lessonid as string

  const [quiz, setQuiz] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (lessonid) {
      loadQuiz()
    }
  }, [lessonid])

  async function loadQuiz() {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('lesson_id', Number(lessonid))
      .order('id')

    console.log('QUIZ DATA:', data)
    console.log('QUIZ ERROR:', error)

    setQuiz(data || [])
    setLoading(false)
  }

  
async function saveProgress(finalScore: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const percentage = Math.round(
    (finalScore / quiz.length) * 100
  )

  const earnedXP =
    percentage >= 60
      ? 50
      : 10

  const { data, error } = await supabase
    .from('user_progress')
    .insert([
      {
        user_id: user.id,
        lesson_id: Number(lessonid),
        score: finalScore,
        completed: true,
        xp: earnedXP,
      },
    ])

  console.log('PROGRESS DATA:', data)
  console.log('PROGRESS ERROR:', error)
}


  function selectAnswer(answer: string) {
    if (selectedAnswer) return

    setSelectedAnswer(answer)

    if (
      answer === quiz[currentQuestion].correct_answer
    ) {
      setScore((prev) => prev + 1)
    }
  }

  async function nextQuestion() {
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      const finalScore =
        selectedAnswer ===
        quiz[currentQuestion].correct_answer
          ? score
          : score

      await saveProgress(finalScore)
      setFinished(true)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-4xl font-bold">
          Loading Quiz...
        </h1>
      </main>
    )
  }

  if (quiz.length === 0) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-4xl font-bold">
          No Quiz Found
        </h1>
      </main>
    )
  }

  if (finished) {
    const percentage = Math.round(
      (score / quiz.length) * 100
    )

    return (
      <main className="min-h-screen bg-slate-100 p-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-5xl font-bold mb-6">
            Quiz Completed 🎉
          </h1>

          <p className="text-3xl mb-4">
            Score: {score} / {quiz.length}
          </p>

          <p className="text-2xl mb-6">
            XP EARNED:{percentage >= 60 ? 50 :10}
          </p>

          {percentage >= 60 ? (
            <div className="text-green-600 text-3xl font-bold">
              Passed ✅
            </div>
          ) : (
            <div className="text-red-600 text-3xl font-bold">
              Failed ❌
            </div>
          )}

          <Link
            href="/"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Back To Home
          </Link>
        </div>
      </main>
    )
  }

  const q = quiz[currentQuestion]

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Quiz
        </h1>

        <p className="text-xl mb-4">
          Question {currentQuestion + 1} of{' '}
          {quiz.length}
        </p>

        <div className="w-full bg-gray-300 h-4 rounded-full mb-8">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  quiz.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-6">
            {q.question}
          </h2>

          {[
            ['A', q.option_a],
            ['B', q.option_b],
            ['C', q.option_c],
            ['D', q.option_d],
          ].map(([key, value]) => {
            let buttonClass =
              'border border-gray-300 hover:bg-slate-100'

            if (selectedAnswer) {
              if (key === q.correct_answer) {
                buttonClass =
                  'bg-green-500 text-white border-green-500'
              } else if (
                key === selectedAnswer
              ) {
                buttonClass =
                  'bg-red-500 text-white border-red-500'
              }
            }

            return (
              <button
                key={key}
                disabled={!!selectedAnswer}
                onClick={() =>
                  selectAnswer(key)
                }
                className={`w-full text-left p-4 rounded mb-3 ${buttonClass}`}
              >
                {value}
              </button>
            )
          })}

          {selectedAnswer && (
            <button
              onClick={nextQuestion}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              {currentQuestion + 1 ===
              quiz.length
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

