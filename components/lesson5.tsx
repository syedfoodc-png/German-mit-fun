'use client';
import { useState } from 'react';

export default function Lesson5({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  
  const words = [
    { de: 'Mutter', emoji: '👩', meaning: 'Mother' },
    { de: 'Vater', emoji: '👨', meaning: 'Father' },
    { de: 'Bruder', emoji: '👦', meaning: 'Brother' },
    { de: 'Schwester', emoji: '👧', meaning: 'Sister' },
    { de: 'Sohn', emoji: '👶', meaning: 'Son' },
    { de: 'Tochter', emoji: '👶', meaning: 'Daughter' },
    { de: 'Familie', emoji: '👨‍👩‍👧‍👦', meaning: 'Family' },
    { de: 'Oma', emoji: '👵', meaning: 'Grandmother' },
    { de: 'Opa', emoji: '👴', meaning: 'Grandfather' },
    { de: 'Baby', emoji: '🍼', meaning: 'Baby' },
    { de: 'Mann', emoji: '🤵', meaning: 'Husband' },
    { de: 'Frau', emoji: '👰', meaning: 'Wife' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Mutter') setStep(2);
    else alert('❌ Galat! Mother ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 5: Family 👨‍👩‍👧‍👦</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((w, i) => (
            <div key={i} onClick={() => speak(w.de)} className="bg-gray-800 p-5 rounded-2xl cursor-pointer hover:bg-gray-700 active:scale-95 transition text-center">
              <p className="text-4xl mb-2">{w.emoji}</p>
              <p className="text-lg font-bold mb-1">{w.de}</p>
              <p className="text-gray-400 text-xs">{w.meaning}</p>
              <p className="text-xs text-gray-500 mt-2">🔊 Suno</p>
            </div>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Mother ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Mutter')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Mutter</button>
          <button onClick={() => checkAnswer('Vater')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Vater</button>
          <button onClick={() => checkAnswer('Schwester')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Schwester</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">👨‍👩‍👧‍👦</p>
        <h2 className="text-4xl font-bold mb-8">Toll!</h2>
        <button onClick={onComplete} className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}