'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if(!userData) router.push('/')
    else setUser(JSON.parse(userData))
  }, [router])

  if(!user) return <div className="min-h-screen bg-purple-900 flex items-center justify-center text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Willkommen, Boss! 👋</h1>
        <p className="text-white/70 mb-8">XP: {user.xp} | Hearts: {'❤️'.repeat(user.hearts)} | Level: {user.level}</p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">A1 German - Lektion 1</h2>
          <p className="text-white/80 mb-6">Hallo = Hello, Danke = Thanks, Bitte = Please</p>
          
          <button 
            onClick={() => alert('Quiz Battle abhi bana raha hu tere liye! 10 sec timer + 3 hearts wala 🔥')}
            className="w-full p-4 rounded-xl bg-pink-500 text-white font-bold text-xl animate-pulse hover:bg-pink-600"
          >
            QUIZ BATTLE START
          </button>
        </div>
      </div>
    </div>
  )
}