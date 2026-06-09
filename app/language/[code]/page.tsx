import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  const { data: language } = await supabase
    .from('languages')
    .select('*')
    .eq('code', code)
    .single()

  if (!language) {
    return <div className="p-10">Language not found</div>
  }

  const { data: levels } = await supabase
    .from('levels')
    .select('*')
    .eq('language_id', language.id)
    .order('order')

  return (
    <main className="min-h-screen p-10 bg-slate-100">
      <Link href="/" className="text-blue-600">
        ← Back
      </Link>

      <h1 className="text-4xl font-bold mt-4 mb-8">
        {language.name}
      </h1>

      <div className="grid gap-4">
        {levels?.map((level) => (
          <Link
         href={`/level/${level.id}`}
         key={level.id}
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition block"
            >
            <h2 className="text-2xl font-bold">
              {level.title}
            </h2>

            <p>{level.subtitle}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}