'use client';
import { useState } from 'react';
type Word = { de: string; hi: string; ex: string };
export default function A2Lesson12({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0); const [score, setScore] = useState(0); const [userInput, setUserInput] = useState('');
  const speak = (text: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; u.rate = 0.7; speechSynthesis.speak(u); };
  const words: Word[] = [
    { de: 'ich werde', hi: 'mai karunga/karungi', ex: 'Ich werde arbeiten' },
    { de: 'der Plan', hi: 'plan', ex: 'Mein Plan für morgen' },
    { de: 'nächstes Jahr', hi: 'agle saal', ex: 'Nächstes Jahr reise ich' },
    { de: 'morgen', hi: 'kal', ex: 'Morgen gehe ich ins Kino' },
    { de: 'übermorgen', hi: 'parso', ex: 'Übermorgen komme ich' },
    { de: 'bald', hi: 'jaldi', ex: 'Ich komme bald' },
    { de: 'später', hi: 'baad me', ex: 'Später telefoniere ich' },
    { de: 'die Zukunft', hi: 'bhavishya', ex: 'Meine Zukunft ist hell' },
    { de: 'hoffen', hi: 'umeed karna', ex: 'Ich hoffe auf Sonne' },
    { de: 'wollen', hi: 'chahna', ex: 'Ich will Deutsch lernen' },
    { de: 'die Prüfung', hi: 'exam', ex: 'Ich mache eine Prüfung' },
    { de: 'bestehen', hi: 'pass karna', ex: 'Ich bestehe die Prüfung' },
    { de: 'umziehen', hi: 'shift karna', ex: 'Ich ziehe um' },
    { de: 'heiraten', hi: 'shaadi karna', ex: 'Ich heirate nächstes Jahr' },
    { de: 'ein Kind', hi: 'baccha', ex: 'Wir wollen ein Kind' },
    { de: 'das Haus', hi: 'ghar', ex: 'Ich kaufe ein Haus' },
    { de: 'der Traum', hi: 'sapna', ex: 'Mein Traum ist Reisen' },
    { de: 'verwirklichen', hi: 'poora karna', ex: 'Ich verwirkliche meinen Traum' }
  ];
  const handleCheck = (correct: string) => { if (userInput.toLowerCase().trim() === correct) { speak(correct); setScore(score + 1); setUserInput(''); setTimeout(() => setStep(step + 1), 800); } else { speak(correct); setUserInput(''); setTimeout(() => setStep(step + 1), 1200); } };
  const startSpeakTask = () => { const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; if (!SR) return alert('Chrome use karo'); const r = new SR(); r.lang = 'de-DE'; r.start(); r.onresult = (e: any) => { const spoken = e.results[0][0].transcript.toLowerCase(); if (spoken.includes('ich werde')) { speak('Ausgezeichnet! Zukunftspläne!'); setScore(score + 1); setTimeout(() => setStep(step + 1), 1000); } else { speak('Bolo: Ich werde nächstes Jahr nach Indien reisen'); } }; };
  if (step === 0) return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center"><div className="text-center max-w-md"><p className="text-6xl mb-4">🔮</p><h1 className="text-4xl font-bold mb-4 text-gray-400">A2 Lesson 12</h1><p className="text-xl mb-6">Pläne - Future Tense</p><p className="text-gray-400 mb-8">Ich werde + Zukunftspläne</p><button onClick={() => setStep(1)} className="w-full bg-gray-600 hover:bg-gray-700 py-4 rounded-xl font-bold text-xl">Start →</button></div></div>;
  if (step <= words.length) { const word = words[step - 1]; return <div className="min-h-screen bg-black text-white p-6"><div className="max-w-xl mx-auto"><div className="flex justify-between mb-4"><p className="text-sm text-gray-400">Word {step}/18</p><p className="text-sm">Score: {score}/{step - 1}</p></div><div className="w-full bg-gray-800 rounded-full h-2 mb-6"><div className="bg-gray-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div></div><div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center"><p className="text-5xl font-bold mb-4">{word.de}</p><p className="text-gray-400 mb-4">💡 {word.ex}</p><button onClick={() => speak(word.de)} className="text-gray-400 underline">🔊 Suno</button></div><input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Hindi matlab..." className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600" onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)} /><button onClick={() => handleCheck(word.hi)} className="w-full bg-gray-600 hover:bg-gray-700 py-4 rounded-xl font-bold">Check →</button>{step === 12 && <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">🎤 Voice: Zukunftsplan</button>}</div></div>; }
  const passed = score >= 14; return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8"><div className="max-w-2xl mx-auto text-center"><p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p><h2 className="text-4xl font-bold mb-4 text-gray-400">{passed? 'Future Master!' : 'Practice More!'}</h2><p className="text-3xl mb-4">{score}/18</p>{passed? <button onClick={onComplete} className="w-full bg-gray-600 hover:bg-gray-700 py-4 rounded-xl font-bold text-lg">A2 Lesson 13 →</button> : <button onClick={() => {setStep(0); setScore(0)}} className="w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg">Retry</button>}</div></div>;
}