'use client';
import { useState } from 'react';

export default function Lesson2({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);

  const words = [
    { de: 'Ich bin', emoji: '🙋', meaning: 'I am' },
    { de: 'Mein Name ist', emoji: '📝', meaning: 'My name is' },
    { de: 'Ich komme aus', emoji: '🌍', meaning: 'I come from' },
    { de: 'Ich wohne in', emoji: '🏠', meaning: 'I live in' },
    { de: 'Ich bin... Jahre alt', emoji: '🎂', meaning: 'I am... years old' },
    { de: 'Ich spreche', emoji: '🗣️', meaning: 'I speak' },
    { de: 'Deutsch', emoji: '🇩🇪', meaning: 'German' },
    { de: 'Englisch', emoji: '🇬🇧', meaning: 'English' },
    { de: 'Hindi', emoji: '🇮🇳', meaning: 'Hindi' },
    { de: 'Ja', emoji: '✅', meaning: 'Yes' },
    { de: 'Nein', emoji: '❌', meaning: 'No' },
    { de: 'Schön dich kennenzulernen', emoji: '😊', meaning: 'Nice to meet you' }
  ];

  const speak = (text: string, callback?: () => void) => {
    speechSynthesis.cancel(); // purana sound band
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.8; // slow & clear

    if (callback) {
      utterance.onend = callback; // sound khatam = next question
    }

    speechSynthesis.speak(utterance);
  };

  const quizQuestions = [
    { q: 'I ko German me kya bolte hai?', options: ['Du', 'Ich', 'Er'], ans: 'Ich' },
    { q: 'My name is... kaise bolte hai?', options: ['Ich bin...', 'Du bist...', 'Mein Name ist'], ans: 'Mein Name ist' },
    { q: 'You ko kya bolte hai?', options: ['Ich', 'Du', 'Wir'], ans: 'Du' },
    { q: 'He is... kaise bolte hai?', options: ['Ich bin...', 'Du bist...', 'Er ist...'], ans: 'Er ist...' },
    { q: 'We ko kya bolte hai?', options: ['Sie', 'Wir', 'Ihr'], ans: 'Wir' }
  ];

  const checkAnswer = (selected: string) => {
    speak(selected, () => {
      // Sound khatam hone ke baad hi score + next question
      if (selected === quizQuestions[qIndex].ans) {
        setScore(score + 1);
      }

      if (qIndex < quizQuestions.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        setStep(2);
      }
    });
  };

  // Step 0: Learn screen
  if (step === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Lesson 2: Self Introduction 🙋</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {words.map((w, i) => (
              <div
                key={i}
                onClick={() => speak(w.de)}
                className="bg-gray-800 p-5 rounded-2xl cursor-pointer hover:bg-gray-700 active:scale-95 transition text-center"
              >
                <p className="text-3xl mb-2">{w.emoji}</p>
                <p className="text-lg font-bold mb-1">{w.de}</p>
                <p className="text-gray-400 text-xs">{w.meaning}</p>
                <p className="text-xs text-gray-500 mt-2">🔊 Suno</p>
              </div>
            ))}
          </div>

          <button onClick={() => setStep(1)} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition">
            Next → Quiz 5 Questions
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Quiz screen
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between mb-6">
            <p className="text-lg">Q {qIndex + 1}/5</p>
            <p className="text-lg">Score: {score}/5</p>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{width: `${(qIndex/5)*100}%`}}></div>
          </div>

          <h2 className="text-2xl font-bold mb-8 text-center">{quizQuestions[qIndex].q}</h2>

          <div className="space-y-4">
            {quizQuestions[qIndex].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => checkAnswer(opt)}
                className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700 active:scale-95 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Result screen - 3/5 pass
  const passed = score >= 3;
  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl mb-4">{passed? '🎉' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4">{passed? 'Ausgezeichnet!' : 'Try Again!'}</h2>
        <p className="text-2xl mb-2">Score: {score}/5</p>
        <p className="text-gray-400 mb-8">{passed? 'Lesson Complete!' : '3/5 chahiye pass karne ke liye'}</p>

        {passed? (
          <button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition">
            Complete Lesson →
          </button>
        ) : (
          <button onClick={() => {setStep(1); setQIndex(0); setScore(0)}} className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-xl font-bold text-lg">
            Retry Quiz
          </button>
        )}
      </div>
    </div>
  );
}