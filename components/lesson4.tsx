'use client';
import { useState } from 'react';

export default function Lesson4({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);

  const words = [
    { de: 'Mutter', emoji: '👩', meaning: 'Mother' },
    { de: 'Vater', emoji: '👨', meaning: 'Father' },
    { de: 'Bruder', emoji: '👦', meaning: 'Brother' },
    { de: 'Schwester', emoji: '👧', meaning: 'Sister' },
    { de: 'Familie', emoji: '👨‍👩‍👧‍👦', meaning: 'Family' },
    { de: 'Sohn', emoji: '👦', meaning: 'Son' },
    { de: 'Tochter', emoji: '👧', meaning: 'Daughter' },
    { de: 'Großvater', emoji: '👴', meaning: 'Grandfather' },
    { de: 'Großmutter', emoji: '👵', meaning: 'Grandmother' },
    { de: 'Baby', emoji: '👶', meaning: 'Baby' }
  ];

  const speak = (text: string, callback?: () => void) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.8;
    if (callback) utterance.onend = callback;
    speechSynthesis.speak(utterance);
  };

  const quizQuestions = [
    { q: 'Mother ko kya bolte hai?', options: ['Vater', 'Mutter', 'Schwester'], ans: 'Mutter' },
    { q: 'Brother kya hai?', options: ['Bruder', 'Sohn', 'Vater'], ans: 'Bruder' },
    { q: 'Grandfather kya hai?', options: ['Vater', 'Großvater', 'Opa'], ans: 'Großvater' },
    { q: 'Family ko kya bolte hai?', options: ['Freunde', 'Familie', 'Leute'], ans: 'Familie' },
    { q: 'Daughter kya hai?', options: ['Mutter', 'Schwester', 'Tochter'], ans: 'Tochter' }
  ];

  const checkAnswer = (selected: string) => {
    speak(selected, () => {
      if (selected === quizQuestions[qIndex].ans) setScore(score + 1);
      if (qIndex < 4) setQIndex(qIndex + 1);
      else setStep(2);
    });
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 4: Family 👨‍👩‍👧‍👦</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {words.map((w, i) => (
            <div key={i} onClick={() => speak(w.de)} className="bg-gray-800 p-6 rounded-2xl cursor-pointer hover:bg-gray-700 active:scale-95 transition text-center">
              <p className="text-5xl mb-2">{w.emoji}</p>
              <p className="text-xl font-bold mb-1">{w.de}</p>
              <p className="text-gray-400 text-xs">{w.meaning}</p>
              <p className="text-xs text-gray-500 mt-2">🔊 Suno</p>
            </div>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold text-lg">Next → Quiz 5 Questions</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between mb-6"><p className="text-lg">Q {qIndex + 1}/5</p><p className="text-lg">Score: {score}/5</p></div>
        <div className="w-full bg-gray-800 rounded-full h-3 mb-8"><div className="bg-orange-600 h-3 rounded-full transition-all" style={{width: `${(qIndex/5)*100}%`}}></div></div>
        <h2 className="text-2xl font-bold mb-8 text-center">{quizQuestions[qIndex].q}</h2>
        <div className="space-y-4">{quizQuestions[qIndex].options.map((opt, i) => (<button key={i} onClick={() => checkAnswer(opt)} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700 active:scale-95 transition">{opt}</button>))}</div>
      </div>
    </div>
  );

  const passed = score >= 3;
  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">{passed? '🎉' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4">{passed? 'Ausgezeichnet!' : 'Try Again!'}</h2>
        <p className="text-2xl mb-2">Score: {score}/5</p>
        <p className="text-gray-400 mb-8">{passed? 'Lesson Complete!' : '3/5 chahiye pass karne ke liye'}</p>
        {passed? <button onClick={onComplete} className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button> : <button onClick={() => {setStep(1); setQIndex(0); setScore(0)}} className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-xl font-bold text-lg">Retry Quiz</button>}
      </div>
    </div>
  );
}