'use client';
import { useState } from 'react';

export default function Lesson9({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const words = [
    { de: 'Kaufen', emoji: '🛒', meaning: 'Buy' },
    { de: 'Verkaufen', emoji: '💰', meaning: 'Sell' },
    { de: 'Preis', emoji: '🏷️', meaning: 'Price' },
    { de: 'Teuer', emoji: '💎', meaning: 'Expensive' },
    { de: 'Billig', emoji: '💵', meaning: 'Cheap' },
    { de: 'Größe', emoji: '📏', meaning: 'Size' },
    { de: 'Farbe', emoji: '🎨', meaning: 'Color' },
    { de: 'Quittung', emoji: '🧾', meaning: 'Receipt' },
    { de: 'Tasche', emoji: '👜', meaning: 'Bag' },
    { de: 'Kleid', emoji: '👗', meaning: 'Dress' },
    { de: 'Schuhe', emoji: '👟', meaning: 'Shoes' },
    { de: 'Probieren', emoji: '👕', meaning: 'Try' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Billig') setStep(2);
    else alert('❌ Galat! Cheap ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 9: Shopping 🛒</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((w, i) => (
            <div key={i} onClick={() => speak(w.de)} className="bg-gray-800 p-5 rounded-2xl cursor-pointer hover:bg-gray-700 active:scale-95 transition text-center">
              <p className="text-3xl mb-2">{w.emoji}</p>
              <p className="text-lg font-bold mb-1">{w.de}</p>
              <p className="text-gray-400 text-xs">{w.meaning}</p>
              <p className="text-xs text-gray-500 mt-2">🔊 Suno</p>
            </div>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Cheap ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Teuer')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Teuer</button>
          <button onClick={() => checkAnswer('Billig')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Billig</button>
          <button onClick={() => checkAnswer('Preis')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Preis</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">🎉</p>
        <h2 className="text-4xl font-bold mb-8">Ausgezeichnet!</h2>
        <button onClick={onComplete} className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}