'use client';
import { useState } from 'react';

export default function Lesson8({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  
  const words = [
    { de: 'Links', emoji: '⬅️', meaning: 'Left' },
    { de: 'Rechts', emoji: '➡️', meaning: 'Right' },
    { de: 'Geradeaus', emoji: '⬆️', meaning: 'Straight' },
    { de: 'Hier', emoji: '📍', meaning: 'Here' },
    { de: 'Dort', emoji: '🎯', meaning: 'There' },
    { de: 'Bahnhof', emoji: '🚉', meaning: 'Station' },
    { de: 'Toilette', emoji: '🚻', meaning: 'Toilet' },
    { de: 'Hilfe', emoji: '🆘', meaning: 'Help' },
    { de: 'Wo?', emoji: '❓', meaning: 'Where?' },
    { de: 'Entschuldigung', emoji: '🙏', meaning: 'Excuse me' },
    { de: 'Ich suche', emoji: '🔍', meaning: 'I am looking for' },
    { de: 'Karte', emoji: '🗺️', meaning: 'Map' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Links') setStep(2);
    else alert('❌ Galat! Left ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 8: Directions 🗺️</h1>
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
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-teal-600 hover:bg-teal-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Left ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Links')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Links</button>
          <button onClick={() => checkAnswer('Rechts')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Rechts</button>
          <button onClick={() => checkAnswer('Geradeaus')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Geradeaus</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">🗺️</p>
        <h2 className="text-4xl font-bold mb-8">Ausgezeichnet!</h2>
        <button onClick={onComplete} className="bg-teal-600 hover:bg-teal-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}