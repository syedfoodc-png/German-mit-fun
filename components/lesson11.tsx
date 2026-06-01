'use client';
import { useState } from 'react';

export default function Lesson11({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const words = [
    { de: 'Zug', emoji: '🚆', meaning: 'Train' },
    { de: 'Bus', emoji: '🚌', meaning: 'Bus' },
    { de: 'Flughafen', emoji: '✈️', meaning: 'Airport' },
    { de: 'Ticket', emoji: '🎫', meaning: 'Ticket' },
    { de: 'Pass', emoji: '📘', meaning: 'Passport' },
    { de: 'Koffer', emoji: '🧳', meaning: 'Suitcase' },
    { de: 'Zimmer', emoji: '🛏️', meaning: 'Room' },
    { de: 'Hotel', emoji: '🏨', meaning: 'Hotel' },
    { de: 'Reservieren', emoji: '📝', meaning: 'Reserve' },
    { de: 'Ankommen', emoji: '🛬', meaning: 'Arrive' },
    { de: 'Abfahren', emoji: '🚀', meaning: 'Depart' },
    { de: 'Reise', emoji: '🌍', meaning: 'Travel' }
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = (ans: string) => {
    if (ans === 'Flughafen') setStep(2);
    else alert('❌ Galat! Airport ko kya bolte hai?');
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Lesson 11: Travel ✈️</h1>
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
        <button onClick={() => setStep(1)} className="mt-6 w-full bg-sky-600 hover:bg-sky-700 py-4 rounded-xl font-bold text-lg">Next → Quiz</button>
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Quiz! 🧠</h2>
        <p className="text-xl mb-8">Airport ko German me kya bolte hai?</p>
        <div className="space-y-4">
          <button onClick={() => checkAnswer('Zug')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">A) Zug</button>
          <button onClick={() => checkAnswer('Flughafen')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">B) Flughafen</button>
          <button onClick={() => checkAnswer('Hotel')} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700">C) Hotel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">✈️</p>
        <h2 className="text-4xl font-bold mb-8">Gute Reise!</h2>
        <button onClick={onComplete} className="bg-sky-600 hover:bg-sky-700 px-8 py-4 rounded-xl font-bold text-lg">Complete Lesson →</button>
      </div>
    </div>
  );
}