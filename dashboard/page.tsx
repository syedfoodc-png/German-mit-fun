'use client'
import { useEffect, useState } from 'react'
import { supabase, Lesson } from '@/lib/supabase'
import LessonRenderer from '@/components/LessonRenderer'
import { BookOpen, Trophy, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    setLoading(true)
    
    // Pehle A1 level ka id nikalo
    const { data: levelData, error: levelError } = await supabase
      .from('levels')
      .select('id')
      .eq('name', 'A1')
      .single()

    if (levelError || !levelData) {
      console.log('A1 level nahi mila:', levelError)
      // Fallback: bina level_id filter ke saare lessons le
      const { data } = await supabase
        .from('lessons')
        .select('*')
        .order('"order"', { ascending: true })
      setLessons(data || [])
      setLoading(false)
      return
    }

    // Phir us level ke saare lessons nikalo
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('level_id', levelData.id)
      .order('"order"', { ascending: true })  // "order" quotes me

    if (error) console.log('Error:', error)
    if (data) {
      setLessons(data)
      console.log('Lessons loaded:', data.length)
    }
    setLoading(false)
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading A1...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header - Title change kar diya */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-purple-600 mb-2">German mit Fun</h1>
          <p className="text-gray-600">{lessons.length} Missions • Goethe Official</p>
        </motion.div>

        {/* Lesson Grid */}
        {!selectedLesson ? (
          <div className="grid gap-4">
            {lessons.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No lessons found. Add lessons in Supabase.
              </div>
            ) : (
              lessons.map((lesson, idx) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedLesson(lesson)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Mission {lesson.order}: {lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.lesson_type} • {lesson.points} Points</p>
                      </div>
                    </div>
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <LessonRenderer
            lesson={selectedLesson}
            onBack={() => setSelectedLesson(null)}
          />
        )}
      </div>
    </div>
  )
}