'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push('/')
      }
    }

    check()
  }, [])

  return <p>Loading...</p>
}