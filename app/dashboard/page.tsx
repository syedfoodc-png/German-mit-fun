import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { data } = await supabase
    .from("user_progress")
    .select("*")
    .order("created_at", { ascending: false });

  const totalLessons = data?.length || 0;

  const totalXP =
    data?.reduce(
      (sum, item) => sum + (item.xp || 0),
      0
    ) || 0;

  const progress = Math.min(
    Math.round((totalLessons / 70) * 100),
    100
  );

  const rank =
    totalXP >= 1000
      ? "🏆 Master"
      : totalXP >= 500
      ? "⭐ Advanced"
      : "🚀 Beginner";

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl">
            Lessons Completed
          </h2>

          <p className="text-5xl font-bold mt-3">
            {totalLessons}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl">
            Total XP
          </h2>

          <p className="text-5xl font-bold mt-3">
            {totalXP}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl">
            Current Rank
          </h2>

          <p className="text-3xl font-bold mt-3">
            {rank}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Overall Progress
        </h2>

        <div className="w-full bg-gray-300 h-6 rounded-full">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-lg">
          {progress}% Complete
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        {data?.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="border-b py-3"
          >
            Lesson {item.lesson_id} • Score{" "}
            {item.score}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Home
        </Link>

        <Link
          href="/certificate"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Certificate
        </Link>
      </div>
    </main>
  );
}

