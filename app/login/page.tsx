'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      router.push('/')
    }
  }

  async function signUp() {
    if (!email || !password) {
      alert('Enter email and password')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Account created successfully')
    }

    setLoading(false)
  }

  async function signIn() {
    if (!email || !password) {
      alert('Enter email and password')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6">
          Login / Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={signIn}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded mb-3"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>

        <button
          onClick={signUp}
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Create Account
        </button>
      </div>
    </main>
  )
}