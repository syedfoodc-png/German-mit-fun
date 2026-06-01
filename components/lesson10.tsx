'use client';
import { useState } from 'react';

export default function Lesson10({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const words = [
    { de: 'Arzt', emoji: '👨‍⚕️', meaning: 'Doctor' },
    { de: 'Krank', emoji: '🤒', meaning: 'Sick' },
    { de: 'Kopf', emoji: '🤕', meaning: 'Head' },
    { de: 'Bauch', emoji: '🤢', meaning: 'Stomach' },
    { de: 'Fieber', emoji: '🌡️', meaning: 'Fever' },
    { de: 'Schmerz', emoji: '💔', meaning: 'Pain' },
    { de: 'Medizin', emoji: '💊', meaning: 'Medicine' },
    { de: 'Apotheke', emoji: '🏪', meaning: 'Pharmacy' },
    { de: 'Mir ist schlecht', emoji: '🤮', meaning: 'I feel sick' },
    { de: 'Ruhe', emoji: '😴', meaning: 'Rest' },
    { de: 'Wasser trinken', emoji: '💧', meaning: 'Drink water' },
    { de: 'Gute Besserung', emoji: '💐', meaning: 'Get well soon' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Arzt') setStep(2);
    else alert('❌ Galat! Doctor ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 10: Health 🏥</h1>
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
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Doctor ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Arzt')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Arzt</button>
          <button onClick={() => checkAnswer('Krank')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Krank</button>
          <button onClick={() => checkAnswer('Medizin')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Medizin</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">🏥</p>
        <h2 className="text-4xl font-bold mb-8">Gute Besserung!</h2>
        <button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}