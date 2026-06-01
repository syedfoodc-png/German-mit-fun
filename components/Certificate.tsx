export default function Certificate({ 
  score = 0, 
  onBack, 
  onClick 
}: { 
  score?: number; 
  onBack?: () => void; 
  onClick?: () => void;
}) {
  // onBack mile to wahi use karega, nahi to onClick use karega
  const handleBack = onBack || onClick || (() => {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md w-full border-8 border-yellow-300">
        
        {/* Trophy Animation */}
        <div className="text-8xl mb-6 animate-bounce">🏆</div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
          Level A1 Complete!
        </h1>
        
        <p className="text-slate-600 text-xl mb-2">
          Congratulations! 🎉
        </p>
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 mb-8">
          <p className="text-white text-sm uppercase tracking-wider mb-2">Final Score</p>
          <p className="text-white text-6xl font-black">{score}</p>
        </div>

        <div className="bg-slate-100 rounded-2xl p-6 mb-8">
          <p className="text-slate-700 font-bold text-lg mb-2">You mastered:</p>
          <div className="text-slate-600 space-y-1">
            <p>✅ 14 Lessons Completed</p>
            <p>✅ Basic German Vocabulary</p>
            <p>✅ Greetings & Numbers</p>
          </div>
        </div>

        <button
          onClick={handleBack}
          className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:bg-slate-800 transition-all duration-300 shadow-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}