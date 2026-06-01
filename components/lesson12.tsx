'use client';
import { useState } from 'react';

export default function Lesson12({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  const questions = [
    { q: 'Hello ko German me kya bolte hai?', options: ['Tschüss', 'Hallo', 'Danke'], ans: 'Hallo' },
    { q: '5 ko kya bolte hai?', options: ['Drei', 'Fünf', 'Sieben'], ans: 'Fünf' },
    { q: 'Red color kya hai?', options: ['Blau', 'Grün', 'Rot'], ans: 'Rot' },
    { q: 'Mother kya hai?', options: ['Vater', 'Mutter', 'Schwester'], ans: 'Mutter' },
    { q: 'Water kya hai?', options: ['Wasser', 'Brot', 'Kaffee'], ans: 'Wasser' },
    { q: 'Monday kya hai?', options: ['Montag', 'Freitag', 'Sonntag'], ans: 'Montag' },
    { q: 'Left kya hai?', options: ['Rechts', 'Links', 'Geradeaus'], ans: 'Links' },
    { q: 'Cheap kya hai?', options: ['Teuer', 'Billig', 'Preis'], ans: 'Billig' },
    { q: 'Doctor kya hai?', options: ['Arzt', 'Krank', 'Medizin'], ans: 'Arzt' },
    { q: 'Airport kya hai?', options: ['Zug', 'Hotel', 'Flughafen'], ans: 'Flughafen' }
  ];

  const checkAnswer = (selected: string) => {
    if (selected === questions[qIndex].ans) {
      setScore(score + 1);
    }
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStep(1);
    }
  };

  if (step === 0) return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between mb-6">
          <p className="text-lg">Question {qIndex + 1}/10</p>
          <p className="text-lg">Score: {score}</p>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
          <div className="bg-gray-600 h-3 rounded-full" style={{width: `${(qIndex/10)*100}%`}}></div>
        </div>
        <h2 className="text-2xl font-bold mb-8 text-center">{questions[qIndex].q}</h2>
        <div className="space-y-4">
          {questions[qIndex].options.map((opt, i) => (
            <button key={i} onClick={() => checkAnswer(opt)} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700 active:scale-95 transition">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const passed = score >= 7;
  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center max-w-md">
        <p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4">{passed? 'A1 Complete!' : 'Try Again!'}</h2>
        <p className="text-2xl mb-8">Score: {score}/10</p>
        {passed? (
          <div>
            <p className="text-lg text-gray-300 mb-8">Sehr gut! Tu A1 level pass kar chuka hai 🇩🇪</p>
            <button onClick={onComplete} className="bg-gray-600 hover:bg-gray-700 px-8 py-4 rounded-xl font-bold text-lg">Finish</button>
          </div>
        ) : (
          <button onClick={() => {setStep(0); setQIndex(0); setScore(0)}} className="bg-gray-600 hover:bg-gray-700 px-8 py-4 rounded-xl font-bold text-lg">Retry Test</button>
        )}
      </div>
    </div>
  );
}