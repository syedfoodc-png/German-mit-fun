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

  const totalLessons = 10
  const percentage = Math.round(
    (completed / totalLessons) * 100
  )

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-6xl font-bold mb-4">
        German Mit Fun
      </h1>

      <p className="text-xl mb-8">
        Learn Languages In A Fun Way 🚀
      </p>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Your Progress
        </h2>

        <p className="mb-3">
          {completed} / {totalLessons} Lessons Completed
        </p>

        <div className="w-full bg-gray-300 h-4 rounded-full">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-2 font-bold">
          {percentage}%
        </p>

        <Link
          href={`/lesson/${completed + 1}`}
          className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded"
        >
          Continue Learning →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <Link
          href="/language/de"
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-3xl font-bold">
            🇩🇪 German
          </h2>

          <p className="mt-2">
            A1 → C2 Levels
          </p>
        </Link>

        <div
          className="bg-white p-8 rounded-xl shadow opacity-70"
        >
          <h2 className="text-3xl font-bold">
            🇸🇦 Arabic
          </h2>

          <p className="mt-2">
            Coming Soon
          </p>
        </div>

      </div>

      <Link
        href="/dashboard"
        className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Open Dashboard
      </Link>

    </main>
  )
}

