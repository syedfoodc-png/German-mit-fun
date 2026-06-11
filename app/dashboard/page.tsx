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

  const currentStreak =
    data?.[0]?.streak || 0;

  const progress = Math.min(
    Math.round((totalLessons / 70) * 100),
    100
  );

  const rank =
    totalXP >= 3000
      ? "👑 Legend"
      : totalXP >= 2000
      ? "🏆 Master"
      : totalXP >= 1000
      ? "⭐ Advanced"
      : totalXP >= 500
      ? "🚀 Intermediate"
      : "🌱 Beginner";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-10">

      <h1 className="text-6xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Dashboard 🚀
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold">
            📚 Lessons
          </h2>

          <p className="text-5xl font-bold mt-3">
            {totalLessons}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold">
            ⭐ Total XP
          </h2>

          <p className="text-5xl font-bold mt-3">
            {totalXP}
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold">
            🔥 Streak
          </h2>

          <p className="text-5xl font-bold mt-3">
            {currentStreak}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold">
            🏆 Rank
          </h2>

          <p className="text-3xl font-bold mt-4">
            {rank}
          </p>
        </div>

      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">

        <h2 className="text-3xl font-bold mb-6">
          📈 Overall Progress
        </h2>

        <div className="w-full bg-gray-200 h-8 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="flex justify-between mt-4">
          <p className="font-semibold text-lg">
            {progress}% Complete
          </p>

          <p className="text-gray-600">
            {totalLessons} / 70 Lessons
          </p>
        </div>

      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-blue-500 mb-10">

        <h2 className="text-3xl font-bold mb-6">
          ⚡ Recent Activity
        </h2>

        {data && data.length > 0 ? (
          data.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="border-b py-4"
            >
              <div className="flex justify-between">

                <div>
                  <p className="font-bold text-lg">
                    Lesson {item.lesson_id}
                  </p>

                  <p className="text-gray-500">
                    Score: {item.score}
                  </p>
                </div>

                <div className="text-green-600 font-bold text-xl">
                  +{item.xp || 0} XP
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No activity yet.
          </p>
        )}

      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">

        <h2 className="text-3xl font-bold mb-6">
          🏅 Achievements
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-yellow-100 p-4 rounded-xl text-center">
            🥇
            <p className="font-bold mt-2">
              First Lesson
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-center">
            ⭐
            <p className="font-bold mt-2">
              100 XP
            </p>
          </div>

          <div className="bg-red-100 p-4 rounded-xl text-center">
            🔥
            <p className="font-bold mt-2">
              Daily Streak
            </p>
          </div>

          <div className="bg-purple-100 p-4 rounded-xl text-center">
            🏆
            <p className="font-bold mt-2">
              Quiz Master
            </p>
          </div>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          🏠 Home
        </Link>

        <Link
          href="/certificate"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          🏆 Certificate
        </Link>

        <Link
          href="/language/de"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          🇩🇪 German
        </Link>

        <Link
          href="/language/ar"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          🇸🇦 Arabic
        </Link>

      </div>

    </main>
  );
}
