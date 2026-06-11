'use client'
import Link from "next/link";

export default function CertificatePage() {
  const today = new Date().toLocaleDateString();

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

      <div className="bg-white border-8 border-yellow-500 rounded-2xl shadow-2xl max-w-5xl w-full p-12 text-center">

        <div className="text-7xl mb-6">
          🏆
        </div>

        <h1 className="text-6xl font-bold mb-4">
          Certificate of Completion
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          German Mit Fun Language Academy
        </p>

        <p className="text-2xl">
          This certifies that
        </p>

        <h2 className="text-6xl font-bold my-8 text-blue-700">
          Student
        </h2>

        <p className="text-2xl">
          has successfully completed
        </p>

        <h3 className="text-5xl font-bold text-green-600 my-8">
          German A1 Course
        </h3>

        <p className="text-xl mb-10">
          Demonstrating achievement in vocabulary,
          grammar, reading and quizzes.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-10">

          <div>
            <div className="border-t-2 border-black pt-3">
              Student Signature
            </div>
          </div>

          <div>
            <div className="border-t-2 border-black pt-3">
              Academy Director
            </div>
          </div>

        </div>

        <p className="mt-10 text-gray-500">
          Issued on: {today}
        </p>

        <div className="mt-10 flex justify-center gap-4">
<a
  href="#"
  className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
  Print Certificate (Ctrl + P)
</a>

          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
}

