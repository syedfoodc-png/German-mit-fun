import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", Number(id))
    .single();

  const { data: words } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("lesson_id", Number(id))
    .order("id");

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <Link
          href={`/level/${lesson?.level_id}`}
          className="text-blue-600 hover:underline"
        >
          ← Back To Lessons
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow mt-6 mb-8">
          <h1 className="text-5xl font-bold mb-3">
            {lesson?.title}
          </h1>

          <p className="text-gray-500 text-lg">
            Lesson ID: {lesson?.id}
          </p>

          <div className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {words?.length || 0} Vocabulary Words
          </div>

          <div className="mt-6">
            <Link
              href={`/quiz/${id}`}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block"
            >
              Start Quiz →
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Lesson Notes
          </h2>

          <div className="text-lg whitespace-pre-wrap leading-8">
            {lesson?.content || "No lesson content available."}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">
          Vocabulary
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {words?.map((word) => (
            <div
              key={word.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-3xl font-bold">
                {word.german}
              </h3>

              <p className="text-green-600 text-xl mt-2">
                {word.english}
              </p>

              <hr className="my-4" />

              <p className="font-semibold">
                Example:
              </p>

              <p className="mt-2">
                {word.example}
              </p>

              <p className="mt-2 text-gray-600 italic">
                {word.example_translation}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/quiz/${id}`}
            className="bg-green-600 text-white px-8 py-4 rounded-xl text-xl hover:bg-green-700 inline-block"
          >
            Take Quiz 🚀
          </Link>
        </div>

      </div>
    </main>
  );
}

