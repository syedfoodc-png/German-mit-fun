'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function UserMenu() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setEmail(user?.email || '')
  }

  async function logout() {
    await supabase.auth.signOut()
    location.reload()
  }

  if (!email) return null

  return (
    <div className="flex gap-3 items-center">
      <span>{email}</span>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}