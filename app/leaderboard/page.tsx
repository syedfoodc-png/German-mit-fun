import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function LeaderboardPage() {
  const { data } = await supabase
    .from("user_progress")
    .select("*");

  const leaderboard =
    data
      ?.reduce((acc: any[], item: any) => {
        const existing = acc.find(
          (u) => u.user_id === item.user_id
        );

        if (existing) {
          existing.xp += item.xp || 0;
        } else {
          acc.push({
            user_id: item.user_id,
            xp: item.xp || 0,
          });
        }

        return acc;
      }, [])
      .sort((a, b) => b.xp - a.xp) || [];

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-5xl font-bold mb-8">
        🏆 Leaderboard
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8">

        {leaderboard.map((user, index) => (
          <div
            key={user.user_id}
            className="flex justify-between items-center border-b py-4"
          >
            <div className="flex gap-4 items-center">

              <div className="text-2xl font-bold">
                #{index + 1}
              </div>

              <div>
                User {user.user_id.slice(0, 8)}
              </div>

            </div>

            <div className="font-bold text-xl">
              ⚡ {user.xp} XP
            </div>
          </div>
        ))}

      </div>

      <Link
        href="/dashboard"
        className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        ← Dashboard
      </Link>

    </main>
  );
}
