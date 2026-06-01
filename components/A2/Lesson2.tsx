'use client';
import { useState } from 'react';

type Word = { de: string; hi: string; ex: string };

export default function A2Lesson2({ onComplete }: { onComplete: () => void }) {
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

  // A2: Alltag - Daily Routine + reflexive verbs
  const words: Word[] = [
    { de: 'aufstehen', hi: 'uthna', ex: 'Ich stehe um 7 Uhr auf' },
    { de: 'sich waschen', hi: 'nahana/muh dhona', ex: 'Ich wasche mich' },
    { de: 'sich anziehen', hi: 'kapde pehnna', ex: 'Ich ziehe mich an' },
    { de: 'frühstücken', hi: 'nashta karna', ex: 'Ich frühstücke Brot' },
    { de: 'zur Arbeit gehen', hi: 'kaam pe jana', ex: 'Ich gehe zur Arbeit' },
    { de: 'arbeiten', hi: 'kaam karna', ex: 'Ich arbeite 8 Stunden' },
    { de: 'Mittagessen', hi: 'lunch', ex: 'Ich esse Mittag' },
    { de: 'Pause machen', hi: 'break lena', ex: 'Ich mache Pause' },
    { de: 'nach Hause kommen', hi: 'ghar aana', ex: 'Ich komme nach Hause' },
    { de: 'sich ausruhen', hi: 'aaraam karna', ex: 'Ich ruhe mich aus' },
    { de: 'kochen', hi: 'khana banana', ex: 'Ich koche Reis' },
    { de: 'fernsehen', hi: 'TV dekhna', ex: 'Ich sehe fern' },
    { de: 'lesen', hi: 'padhna', ex: 'Ich lese ein Buch' },
    { de: 'ins Bett gehen', hi: 'sone jana', ex: 'Ich gehe ins Bett' },
    { de: 'einschlafen', hi: 'so jana', ex: 'Ich schlafe ein' },
    { de: 'morgens', hi: 'subah', ex: 'Morgens trinke ich Kaffee' },
    { de: 'abends', hi: 'shaam ko', ex: 'Abends koche ich' },
    { de: 'täglich', hi: 'roz', ex: 'Ich arbeite täglich' }
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
      if (spoken.includes('aufstehen') || spoken.includes('auf')) {
        speak('Sehr gut! Mein Tagesablauf!');
        setScore(score + 1);
        setTimeout(() => setStep(step + 1), 1000);
      } else {
        speak('Bolo: Morgens stehe ich um sieben Uhr auf');
      }
    };
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">⏰</p>
          <h1 className="text-4xl font-bold mb-4 text-blue-400">A2 Lesson 2</h1>
          <p className="text-xl mb-6">Alltag - Daily Routine</p>
          <p className="text-gray-400 mb-8">Rahul ka din kaisa jata hai? 18 routine words + Voice story</p>
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

          {step === 12 && (
            <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">
              🎤 Voice Task: Apna din batao - "Morgens stehe ich um 7 Uhr auf"
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
        <h2 className="text-4xl font-bold mb-4 text-blue-400">{passed? 'Routine Master!' : 'Practice More!'}</h2>
        <p className="text-3xl mb-4">{score}/18</p>

        {passed? (
          <button onClick={onComplete} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg">
            A2 Lesson 3 →
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