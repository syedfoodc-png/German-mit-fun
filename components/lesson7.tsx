'use client';
import { useState } from 'react';

export default function Lesson7({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  
  const words = [
    { de: 'Montag', emoji: '1️⃣', meaning: 'Monday' },
    { de: 'Dienstag', emoji: '2️⃣', meaning: 'Tuesday' },
    { de: 'Mittwoch', emoji: '3️⃣', meaning: 'Wednesday' },
    { de: 'Donnerstag', emoji: '4️⃣', meaning: 'Thursday' },
    { de: 'Freitag', emoji: '5️⃣', meaning: 'Friday' },
    { de: 'Samstag', emoji: '6️⃣', meaning: 'Saturday' },
    { de: 'Sonntag', emoji: '7️⃣', meaning: 'Sunday' },
    { de: 'Heute', emoji: '📅', meaning: 'Today' },
    { de: 'Morgen', emoji: '⏭️', meaning: 'Tomorrow' },
    { de: 'Gestern', emoji: '⏮️', meaning: 'Yesterday' },
    { de: 'Uhr', emoji: '🕐', meaning: 'Clock' },
    { de: 'Zeit', emoji: '⏰', meaning: 'Time' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Montag') setStep(2);
    else alert('❌ Galat! Monday ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 7: Days & Time 📅</h1>
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
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Monday ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Montag')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Montag</button>
          <button onClick={() => checkAnswer('Freitag')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Freitag</button>
          <button onClick={() => checkAnswer('Sonntag')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Sonntag</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">📅</p>
        <h2 className="text-4xl font-bold mb-8">Super!</h2>
        <button onClick={onComplete} className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}