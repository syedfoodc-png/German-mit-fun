'use client';
import { useState } from 'react';

type Word = { de: string; hi: string; ex: string };

export default function A2Lesson1({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');

  const speak = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  // A2: Past Tense - Gestern = Yesterday
  const words: Word[] = [
    { de: 'gestern', hi: 'kal', ex: 'Gestern war ich zu Hause' },
    { de: 'war', hi: 'tha/thi', ex: 'Ich war müde' },
    { de: 'hatte', hi: 'tha mere paas', ex: 'Ich hatte Zeit' },
    { de: 'ging', hi: 'gaya/gayi', ex: 'Ich ging zur Arbeit' },
    { de: 'kam', hi: 'aaya/aayi', ex: 'Ich kam spät' },
    { de: 'machte', hi: 'kiya', ex: 'Ich machte Hausaufgaben' },
    { de: 'sah', hi: 'dekha', ex: 'Ich sah einen Film' },
    { de: 'aß', hi: 'khaya', ex: 'Ich aß Brot' },
    { de: 'trank', hi: 'piya', ex: 'Ich trank Wasser' },
    { de: 'schlief', hi: 'soya', ex: 'Ich schlief 8 Stunden' },
    { de: 'arbeitete', hi: 'kaam kiya', ex: 'Ich arbeitete viel' },
    { de: 'lernte', hi: 'sikha', ex: 'Ich lernte Deutsch' },
    { de: 'warst', hi: 'tha tu', ex: 'Du warst krank' },
    { de: 'hattest', hi: 'tha tere paas', ex: 'Du hattest Geld' },
    { de: 'gingst', hi: 'gaya tu', ex: 'Du gingst raus' },
    { de: 'kamst', hi: 'aaya tu', ex: 'Du kamst spät' },
    { de: 'machtest', hi: 'kiya tu', ex: 'Du machtest Sport' },
    { de: 'sahst', hi: 'dekha tu', ex: 'Du sahst gut aus' }
  ];

  const handleCheck = (correct: string) => {
    if (userInput.toLowerCase().trim() === correct) {
      speak(correct);
      setScore(score + 1);
      setUserInput('');
      setTimeout(() => setStep(step + 1), 800);
    } else {
      speak(correct);
      setUserInput('');
      setTimeout(() => setStep(step + 1), 1200);
    }
  };

  const startSpeakTask = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Chrome use karo mic ke liye');
    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.start();
    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      if (spoken.includes('gestern') && spoken.includes('war')) {
        speak('Perfekt! Gestern war ich zu Hause');
        setScore(score + 1);
        setTimeout(() => setStep(step + 1), 1000);
      } else {
        speak('Fast! Phir try karo: Gestern war ich zu Hause');
      }
    };
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">⏮️</p>
          <h1 className="text-4xl font-bold mb-4 text-blue-400">A2 Lesson 1</h1>
          <p className="text-xl mb-6">Vergangenheit - Past Tense</p>
          <p className="text-gray-400 mb-8">A1 ke baad ab kal ki baat karenge! 18 words + Voice task</p>
          <button onClick={() => setStep(1)} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-xl transition">
            Start karein →
          </button>
        </div>
      </div>
    );
  }

  if (step <= words.length) {
    const word = words[step - 1];
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-blue-400">Word {step}/18</p>
            <p className="text-sm">Score: {score}/{step - 1}</p>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center">
            <p className="text-5xl font-bold mb-4">{word.de}</p>
            <p className="text-gray-400 mb-4">💡 Example: {word.ex}</p>
            <button onClick={() => speak(word.de)} className="text-blue-400 underline">🔊 Suno</button>
          </div>

          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Hindi me matlab likho..."
            className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)}
          />

          <button onClick={() => handleCheck(word.hi)} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold">
            Check →
          </button>

          {step === 10 && (
            <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">
              🎤 Voice Task: "Gestern war ich zu Hause" bolo
            </button>
          )}
        </div>
      </div>
    );
  }

  const passed = score >= 14;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4 text-blue-400">{passed? 'A2 Level Unlocked!' : 'Practice More!'}</h2>
        <p className="text-3xl mb-4">{score}/18</p>

        {passed? (
          <button onClick={onComplete} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg">
            A2 Lesson 2 →
          </button>
        ) : (
          <button onClick={() => {setStep(0); setScore(0)}} className="w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}