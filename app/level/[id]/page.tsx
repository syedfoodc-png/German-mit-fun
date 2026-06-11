
'use client'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Lesson = {
  id: number
  title: string
  order: number
}

export default function LevelPage() {
  const params = useParams()
  const id = params.id as string

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  if (id) {
    loadData()
  }
}, [id])
  async function loadData() {
    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('*')
      .eq('level_id', Number(id))
      .order('order')

    setLessons(lessonsData || [])

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)

      setCompletedLessons(
        progress?.map((p) => p.lesson_id) || []
      )
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-4xl font-bold">
          Loading Lessons...
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <Link
        href="/"
        className="text-blue-600"
      >
        ← Home
      </Link>

      <h1 className="text-4xl font-bold my-8">
        Lessons
      </h1>

      <div className="grid gap-4">

        {lessons.map((lesson, index) => {

const unlocked =
  index === 0 ||
  completedLessons.includes(lesson.id) ||
  completedLessons.includes(
    lessons[index - 1]?.id
  )
          return unlocked ? (
            <Link
              key={lesson.id}
              href={`/lesson/${lesson.id}`}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition block"
            >
              <h2 className="text-2xl font-bold">
                {lesson.title}
              </h2>

              <p className="text-gray-500">
                Lesson {lesson.order}
              </p>

              {completedLessons.includes(
                lesson.id
              ) && (
                <p className="mt-2 text-green-600 font-bold">
                  ✅ Completed
                </p>
              )}

            </Link>
          ) : (
            <div
              key={lesson.id}
              className="bg-gray-300 p-5 rounded-xl opacity-60"
            >
              <h2 className="text-2xl font-bold">
                {lesson.title}
              </h2>

              <p className="text-gray-600">
                🔒 Locked
              </p>
            </div>
          )
        })}

      </div>

    </main>
  )
}

