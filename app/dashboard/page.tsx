import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { data } = await supabase
    .from("user_progress")
    .select("*");

  const totalLessons = data?.length || 0;

  const totalXP =
    data?.reduce(
      (sum, item) => sum + (item.xp || 0),
      0
    ) || 0;

  return (
    <main className="min-h-screen p-10 bg-slate-100">
      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

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

          <p className="text-5xl font-bold mt-3">
            {totalXP >= 1000
              ? "🏆 Master"
              : totalXP >= 500
              ? "⭐ Advanced"
              : "🚀 Beginner"}
          </p>
        </div>

      </div>
    </main>
  );
}
