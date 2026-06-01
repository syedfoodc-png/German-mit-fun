'use client';
import { useState } from 'react';

export default function Lesson6({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  
  const words = [
    { de: 'Wasser', emoji: '💧', meaning: 'Water' },
    { de: 'Brot', emoji: '🍞', meaning: 'Bread' },
    { de: 'Käse', emoji: '🧀', meaning: 'Cheese' },
    { de: 'Apfel', emoji: '🍎', meaning: 'Apple' },
    { de: 'Kaffee', emoji: '☕', meaning: 'Coffee' },
    { de: 'Tee', emoji: '🍵', meaning: 'Tea' },
    { de: 'Milch', emoji: '🥛', meaning: 'Milk' },
    { de: 'Fleisch', emoji: '🥩', meaning: 'Meat' },
    { de: 'Reis', emoji: '🍚', meaning: 'Rice' },
    { de: 'Obst', emoji: '🍇', meaning: 'Fruit' },
    { de: 'Hunger', emoji: '😋', meaning: 'Hungry' },
    { de: 'Durst', emoji: '🥤', meaning: 'Thirsty' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Wasser') setStep(2);
    else alert('❌ Galat! Water ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 6: Food & Drink 🍎</h1>
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
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Water ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Wasser')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Wasser</button>
          <button onClick={() => checkAnswer('Brot')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Brot</button>
          <button onClick={() => checkAnswer('Milch')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Milch</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">🍎</p>
        <h2 className="text-4xl font-bold mb-8">Lecker!</h2>
        <button onClick={onComplete} className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}