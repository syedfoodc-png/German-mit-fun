import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { data } = await supabase
    .from("user_progress")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: badges } = await supabase
    .from("achievements")
    .select("*");
    
const { data: challenge } = await supabase
  .from("daily_challenges")
  .select("*")
  .order("id", { ascending: false })
  .limit(1)
  .single();


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

  const currentStreak =
    data?.[0]?.streak || 0;

  const level =
    Math.floor(totalXP / 100) + 1;

  const rank =
    totalXP >= 5000
      ? "👑 Grand Master"
      : totalXP >= 2500
      ? "🏆 Master"
      : totalXP >= 1000
      ? "⭐ Advanced"
      : totalXP >= 500
      ? "🔥 Intermediate"
      : "🚀 Beginner";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-10">

      <h1 className="text-6xl font-extrabold mb-10">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl">
            📚 Lessons
          </h2>

          <p className="text-5xl font-bold mt-3">
            {totalLessons}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl">
            ⚡ Total XP
          </h2>

          <p className="text-5xl font-bold mt-3">
            {totalXP}
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl">
            🔥 Daily Streak
          </h2>

          <p className="text-5xl font-bold mt-3">
            {currentStreak}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl">
            🆙 Level
          </h2>

          <p className="text-5xl font-bold mt-3">
            {level}
          </p>
        </div>

      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-4">
          🎯 Overall Progress
        </h2>

        <div className="w-full bg-gray-300 h-6 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-4 text-xl font-bold">
          {progress}% Complete
        </p>
      </div>
      
<div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-xl mb-10">

  <h2 className="text-3xl font-bold mb-3">
    🔥 Daily Challenge
  </h2>

  <h3 className="text-2xl font-bold">
    {challenge?.title}
  </h3>

  <p className="mt-2">
    {challenge?.description}
  </p>

  <div className="mt-4 text-xl font-bold">
    Reward: ⚡ {challenge?.xp_reward} XP
  </div>

</div>



      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-4">
          🏅 Current Rank
        </h2>

        <p className="text-4xl font-bold">
          {rank}
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-6">
          📈 Recent Activity
        </h2>

        {data?.length ? (
          data.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="border-b py-4"
            >
              Lesson {item.lesson_id}
              {" • "}
              Score {item.score}
              {" • "}
              XP +{item.xp || 0}
            </div>
          ))
        ) : (
          <p>
            No activity yet
          </p>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">

        <h2 className="text-3xl font-bold mb-6">
          🏅 Achievements
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {badges?.map((badge) => {

            const unlocked =
              totalXP >= badge.required_xp

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-xl border-2 transition ${
                  unlocked
                    ? "bg-green-50 border-green-500"
                    : "bg-gray-100 border-gray-300 opacity-60"
                }`}
              >
                <div className="text-5xl">
                  {badge.icon}
                </div>

                <h3 className="font-bold text-xl mt-3">
                  {badge.title}
                </h3>

                <p className="text-sm mt-2 text-gray-600">
                  {badge.description}
                </p>

                <p className="mt-2 font-semibold">
                  Required XP: {badge.required_xp}
                </p>

                {unlocked ? (
                  <p className="mt-3 text-green-600 font-bold">
                    ✅ Unlocked
                  </p>
                ) : (
                  <p className="mt-3 text-gray-500">
                    🔒 Locked
                  </p>
                )}
              </div>
            );
          })}

        </div>

      </div>


<div className="flex flex-wrap gap-4">

  <Link
    href="/"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    🏠 Home
  </Link>

  <Link
    href="/leaderboard"
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
  >
    🏆 Leaderboard
  </Link>

  {progress >= 100 && (
    <Link
      href="/certificate"
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
    >
      🏆 Certificate
    </Link>
  )}

</div>


    </main>
  );
}
