'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    loadProgress()
  }, [])

  async function loadProgress() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)

    setCompleted(data?.length || 0)
  }

  const totalLessons = 70
  const percentage = Math.round(
    (completed / totalLessons) * 100
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-10">

      <h1 className="text-6xl font-extrabold mb-4">
        German Mit Fun
      </h1>

      <p className="text-2xl mb-8 text-gray-700">
        Learn Languages In A Fun Way 🚀
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-4">
          Your Progress
        </h2>

        <p className="mb-4 text-lg">
          {completed} / {totalLessons} Lessons Completed
        </p>

        <div className="w-full bg-gray-300 h-5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-5 rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-3 text-xl font-bold">
          {percentage}%
        </p>

        <Link
          href="/language/de"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Continue Learning →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <Link
          href="/language/de"
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition"
        >
          <h2 className="text-4xl font-bold">
            🇩🇪 DE German
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            A1 → C2 Levels
          </p>
        </Link>

        <Link
          href="/language/ar"
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition"
        >
          <h2 className="text-4xl font-bold">
            🇸🇦 SA Arabic
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Beginner → Advanced
          </p>
        </Link>

      </div>

      <Link
        href="/dashboard"
        className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg"
      >
        Open Dashboard
      </Link>

    </main>
  )
}
