'use client';
import { useState } from 'react';
type Word = { de: string; hi: string; ex: string };

export default function A2Lesson11({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');

  const speak = (text: string) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = 0.7;
    speechSynthesis.speak(u);
  };

  const words: Word[] = [
    { de: 'das Wetter', hi: 'mausam', ex: 'Wie ist das Wetter?' },
    { de: 'sonnig', hi: 'dhoop wala', ex: 'Es ist sonnig heute' },
    { de: 'regnen', hi: 'baaris hona', ex: 'Es regnet stark' },
    { de: 'kalt', hi: 'thanda', ex: 'Es ist kalt im Winter' },
    { de: 'warm', hi: 'garam', ex: 'Es ist warm im Sommer' },
    { de: 'der Wind', hi: 'hawa', ex: 'Es windet heute' },
    { de: 'die Wolke', hi: 'baadal', ex: 'Viele Wolken am Himmel' },
    { de: 'der Schnee', hi: 'barf', ex: 'Es schneit im Winter' },
    { de: 'der Himmel', hi: 'aasmaan', ex: 'Der Himmel ist blau' },
    { de: 'die Temperatur', hi: 'temperature', ex: '20 Grad Temperatur' },
    { de: 'der Frühling', hi: 'basant', ex: 'Im Frühling blühen Blumen' },
    { de: 'der Sommer', hi: 'garmi', ex: 'Im Sommer ist es heiß' },
    { de: 'der Herbst', hi: 'patjhad', ex: 'Im Herbst fallen Blätter' },
    { de: 'der Winter', hi: 'sardi', ex: 'Im Winter schneit es' },
    { de: 'die Jahreszeit', hi: 'season', ex: 'Vier Jahreszeiten gibt es' },
    { de: 'die Hitze', hi: 'garmi', ex: 'Die Hitze ist stark' },
    { de: 'der Regen', hi: 'baaris', ex: 'Der Regen ist kalt' },
    { de: 'die Sonne', hi: 'sooraj', ex: 'Die Sonne scheint hell' }
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
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return alert('Chrome use karo mic ke liye');
    const r = new SR();
    r.lang = 'de-DE';
    r.start();
    r.onresult = (e: any) => {
      const spoken = e.results[0][0].transcript.toLowerCase();
      if (spoken.includes('es ist') && (spoken.includes('sonnig') || spoken.includes('kalt') || spoken.includes('warm'))) {
        speak('Sehr gut! Wetter perfekt beschrieben!');
        setScore(score + 1);
        setTimeout(() => setStep(step + 1), 1000);
      } else {
        speak('Bolo: Heute ist es sonnig und warm');
      }
    };
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">🌤️</p>
          <h1 className="text-4xl font-bold mb-4 text-teal-400">A2 Lesson 11</h1>
          <p className="text-xl mb-6">Umwelt - Weather & Seasons</p>
          <p className="text-gray-400 mb-8">18 words + 4 Jahreszeiten + Wetter beschreiben</p>
          <button onClick={() => setStep(1)} className="w-full bg-teal-600 hover:bg-teal-700 py-4 rounded-xl font-bold text-xl">
            Start →
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
            <p className="text-sm text-teal-400">Word {step}/18</p>
            <p className="text-sm">Score: {score}/{step - 1}</p>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div className="bg-teal-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center">
            <p className="text-5xl font-bold mb-4">{word.de}</p>
            <p className="text-gray-400 mb-4">💡 {word.ex}</p>
            <button onClick={() => speak(word.de)} className="text-teal-400 underline">🔊 Suno</button>
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Hindi matlab..."
            className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
            onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)}
          />
          <button onClick={() => handleCheck(word.hi)} className="w-full bg-teal-600 hover:bg-teal-700 py-4 rounded-xl font-bold">
            Check →
          </button>
          {step === 10 && (
            <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">
              🎤 Voice: Wetter beschreiben
            </button>
          )}
        </div>
      </div>
    );
  }

  const passed = score >= 14;
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4 text-teal-400">{passed? 'Weather Master!' : 'Practice More!'}</h2>
        <p className="text-3xl mb-4">{score}/18</p>
        {passed? (
          <button onClick={onComplete} className="w-full bg-teal-600 hover:bg-teal-700 py-4 rounded-xl font-bold text-lg">
            A2 Lesson 12 →
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