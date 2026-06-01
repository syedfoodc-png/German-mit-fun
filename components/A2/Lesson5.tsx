'use client';
import { useState } from 'react';
type Word = { de: string; hi: string; ex: string };
export default function A2Lesson5({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0); const [score, setScore] = useState(0); const [userInput, setUserInput] = useState('');
  const speak = (text: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; u.rate = 0.7; speechSynthesis.speak(u); };
  const words: Word[] = [
    { de: 'die Wohnung', hi: 'flat', ex: 'Meine Wohnung ist klein' },
    { de: 'das Zimmer', hi: 'kamra', ex: 'Ich habe 2 Zimmer' },
    { de: 'die Küche', hi: 'rasoi', ex: 'Die Küche ist modern' },
    { de: 'das Bad', hi: 'bathroom', ex: 'Das Bad ist sauber' },
    { de: 'das Schlafzimmer', hi: 'bedroom', ex: 'Ich schlafe im Schlafzimmer' },
    { de: 'das Wohnzimmer', hi: 'hall/living room', ex: 'Wir sitzen im Wohnzimmer' },
    { de: 'der Tisch', hi: 'table', ex: 'Der Tisch ist groß' },
    { de: 'der Stuhl', hi: 'chair', ex: 'Ein Stuhl am Tisch' },
    { de: 'das Bett', hi: 'bed', ex: 'Mein Bett ist weich' },
    { de: 'der Schrank', hi: 'cupboard', ex: 'Der Schrank ist voll' },
    { de: 'das Fenster', hi: 'window', ex: 'Das Fenster ist offen' },
    { de: 'die Tür', hi: 'door', ex: 'Die Tür ist zu' },
    { de: 'hell', hi: 'roshan', ex: 'Die Wohnung ist hell' },
    { de: 'dunkel', hi: 'andhera', ex: 'Das Zimmer ist dunkel' },
    { de: 'mieten', hi: 'kiraye pe lena', ex: 'Ich miete eine Wohnung' },
    { de: 'sauber machen', hi: 'safai karna', ex: 'Ich mache sauber' },
    { de: 'aufräumen', hi: 'sametna', ex: 'Ich räume auf' },
    { de: 'der Balkon', hi: 'balcony', ex: 'Wir sitzen auf dem Balkon' }
  ];
  const handleCheck = (correct: string) => { if (userInput.toLowerCase().trim() === correct) { speak(correct); setScore(score + 1); setUserInput(''); setTimeout(() => setStep(step + 1), 800); } else { speak(correct); setUserInput(''); setTimeout(() => setStep(step + 1), 1200); } };
  const startSpeakTask = () => { const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; if (!SR) return alert('Chrome use karo'); const r = new SR(); r.lang = 'de-DE'; r.start(); r.onresult = (e: any) => { const spoken = e.results[0][0].transcript.toLowerCase(); if (spoken.includes('meine wohnung')) { speak('Sehr gut!'); setScore(score + 1); setTimeout(() => setStep(step + 1), 1000); } else { speak('Bolo: Meine Wohnung hat zwei Zimmer'); } }; };
  if (step === 0) return <div className="min-h-screen bg-gradient-to-b from-pink-900 to-black text-white p-8 flex items-center justify-center"><div className="text-center max-w-md"><p className="text-6xl mb-4">🏠</p><h1 className="text-4xl font-bold mb-4 text-pink-400">A2 Lesson 5</h1><p className="text-xl mb-6">Wohnung - House & Rooms</p><p className="text-gray-400 mb-8">Möbel + Room names</p><button onClick={() => setStep(1)} className="w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-xl font-bold text-xl">Start →</button></div></div>;
  if (step <= words.length) { const word = words[step - 1]; return <div className="min-h-screen bg-black text-white p-6"><div className="max-w-xl mx-auto"><div className="flex justify-between mb-4"><p className="text-sm text-pink-400">Word {step}/18</p><p className="text-sm">Score: {score}/{step - 1}</p></div><div className="w-full bg-gray-800 rounded-full h-2 mb-6"><div className="bg-pink-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div></div><div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center"><p className="text-5xl font-bold mb-4">{word.de}</p><p className="text-gray-400 mb-4">💡 {word.ex}</p><button onClick={() => speak(word.de)} className="text-pink-400 underline">🔊 Suno</button></div><input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Hindi matlab..." className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-pink-600" onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)} /><button onClick={() => handleCheck(word.hi)} className="w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-xl font-bold">Check →</button>{step === 11 && <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">🎤 Voice: Meine Wohnung...</button>}</div></div>; }
  const passed = score >= 14; return <div className="min-h-screen bg-gradient-to-b from-pink-900 to-black text-white p-8"><div className="max-w-2xl mx-auto text-center"><p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p><h2 className="text-4xl font-bold mb-4 text-pink-400">{passed? 'Home Master!' : 'Practice More!'}</h2><p className="text-3xl mb-4">{score}/18</p>{passed? <button onClick={onComplete} className="w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-xl font-bold text-lg">A2 Lesson 6 →</button> : <button onClick={() => {setStep(0); setScore(0)}} className="w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg">Retry</button>}</div></div>;
}