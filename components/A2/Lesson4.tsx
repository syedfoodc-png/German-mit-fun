'use client';
import { useState } from 'react';
type Word = { de: string; hi: string; ex: string };
export default function A2Lesson4({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const speak = (text: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; u.rate = 0.7; speechSynthesis.speak(u); };
  const words: Word[] = [
    { de: 'der Beruf', hi: 'profession', ex: 'Mein Beruf ist Ingenieur' },
    { de: 'arbeiten', hi: 'kaam karna', ex: 'Ich arbeite bei Siemens' },
    { de: 'die Arbeit', hi: 'kaam/job', ex: 'Die Arbeit macht Spaß' },
    { de: 'der Kollege', hi: 'colleague m', ex: 'Mein Kollege heißt Ahmed' },
    { de: 'die Kollegin', hi: 'colleague f', ex: 'Meine Kollegin ist nett' },
    { de: 'das Büro', hi: 'office', ex: 'Ich arbeite im Büro' },
    { de: 'der Chef', hi: 'boss', ex: 'Mein Chef ist streng' },
    { de: 'die Pause', hi: 'break', ex: 'Ich mache Pause' },
    { de: 'verdienen', hi: 'kamana', ex: 'Ich verdiene Geld' },
    { de: 'der Termin', hi: 'appointment', ex: 'Ich habe einen Termin' },
    { de: 'pünktlich', hi: 'time pe', ex: 'Ich komme pünktlich' },
    { de: 'die Besprechung', hi: 'meeting', ex: 'Wir haben Besprechung' },
    { de: 'der Computer', hi: 'computer', ex: 'Ich arbeite am Computer' },
    { de: 'die E-Mail', hi: 'email', ex: 'Ich schreibe E-Mails' },
    { de: 'telefonieren', hi: 'phone karna', ex: 'Ich telefoniere viel' },
    { de: 'der Feierabend', hi: 'chutti ke baad', ex: 'Endlich Feierabend' },
    { de: 'gestresst', hi: 'tensed', ex: 'Ich bin gestresst' },
    { de: 'zufrieden', hi: 'khush/satisfied', ex: 'Ich bin zufrieden' }
  ];
  const handleCheck = (correct: string) => { if (userInput.toLowerCase().trim() === correct) { speak(correct); setScore(score + 1); setUserInput(''); setTimeout(() => setStep(step + 1), 800); } else { speak(correct); setUserInput(''); setTimeout(() => setStep(step + 1), 1200); } };
  const startSpeakTask = () => { const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; if (!SR) return alert('Chrome use karo'); const r = new SR(); r.lang = 'de-DE'; r.start(); r.onresult = (e: any) => { const spoken = e.results[0][0].transcript.toLowerCase(); if (spoken.includes('ich arbeite')) { speak('Perfekt!'); setScore(score + 1); setTimeout(() => setStep(step + 1), 1000); } else { speak('Bolo: Ich arbeite bei Siemens'); } }; };
  if (step === 0) return <div className="min-h-screen bg-gradient-to-b from-yellow-900 to-black text-white p-8 flex items-center justify-center"><div className="text-center max-w-md"><p className="text-6xl mb-4">💼</p><h1 className="text-4xl font-bold mb-4 text-yellow-400">A2 Lesson 4</h1><p className="text-xl mb-6">Arbeit - Job & Berufe</p><p className="text-gray-400 mb-8">Office vocabulary + Berufs</p><button onClick={() => setStep(1)} className="w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-xl font-bold text-xl">Start →</button></div></div>;
  if (step <= words.length) { const word = words[step - 1]; return <div className="min-h-screen bg-black text-white p-6"><div className="max-w-xl mx-auto"><div className="flex justify-between mb-4"><p className="text-sm text-yellow-400">Word {step}/18</p><p className="text-sm">Score: {score}/{step - 1}</p></div><div className="w-full bg-gray-800 rounded-full h-2 mb-6"><div className="bg-yellow-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div></div><div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center"><p className="text-5xl font-bold mb-4">{word.de}</p><p className="text-gray-400 mb-4">💡 {word.ex}</p><button onClick={() => speak(word.de)} className="text-yellow-400 underline">🔊 Suno</button></div><input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Hindi matlab..." className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600" onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)} /><button onClick={() => handleCheck(word.hi)} className="w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-xl font-bold">Check →</button>{step === 9 && <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">🎤 Voice: Ich arbeite bei...</button>}</div></div>; }
  const passed = score >= 14; return <div className="min-h-screen bg-gradient-to-b from-yellow-900 to-black text-white p-8"><div className="max-w-2xl mx-auto text-center"><p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p><h2 className="text-4xl font-bold mb-4 text-yellow-400">{passed? 'Job Master!' : 'Practice More!'}</h2><p className="text-3xl mb-4">{score}/18</p>{passed? <button onClick={onComplete} className="w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-xl font-bold text-lg">A2 Lesson 5 →</button> : <button onClick={() => {setStep(0); setScore(0)}} className="w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg">Retry</button>}</div></div>;
}