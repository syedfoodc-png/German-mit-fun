'use client'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">
        German Mit Fun
      </Link>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>

        <button
          onClick={logout}
          className="text-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}