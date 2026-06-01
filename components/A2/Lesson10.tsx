'use client';
import { useState } from 'react';
type Word = { de: string; hi: string; ex: string };
export default function A2Lesson10({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0); const [score, setScore] = useState(0); const [userInput, setUserInput] = useState('');
  const speak = (text: string) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; u.rate = 0.7; speechSynthesis.speak(u); };
  const words: Word[] = [
    { de: 'das Internet', hi: 'internet', ex: 'Ich surfe im Internet' },
    { de: 'das Handy', hi: 'mobile', ex: 'Mein Handy ist neu' },
    { de: 'anrufen', hi: 'call karna', ex: 'Ich rufe dich an' },
    { de: 'die Nachricht', hi: 'message', ex: 'Ich schreibe eine Nachricht' },
    { de: 'die E-Mail', hi: 'email', ex: 'Schick mir eine E-Mail' },
    { de: 'der Computer', hi: 'computer', ex: 'Ich arbeite am Computer' },
    { de: 'das Passwort', hi: 'password', ex: 'Mein Passwort ist sicher' },
    { de: 'anklicken', hi: 'click karna', ex: 'Klicke auf den Link' },
    { de: 'herunterladen', hi: 'download karna', ex: 'Ich lade die Datei herunter' },
    { de: 'das Video', hi: 'video', ex: 'Ich schaue Videos' },
    { de: 'die Website', hi: 'website', ex: 'Die Website ist gut' },
    { de: 'online', hi: 'online', ex: 'Ich bin online' },
    { de: 'der Akku', hi: 'battery', ex: 'Der Akku ist leer' },
    { de: 'aufladen', hi: 'charge karna', ex: 'Ich lade mein Handy auf' },
    { de: 'das WLAN', hi: 'wifi', ex: 'Das WLAN ist schnell' },
    { de: 'die App', hi: 'app', ex: 'Ich benutze eine App' },
    { de: 'chatten', hi: 'chat karna', ex: 'Wir chatten jeden Tag' },
    { de: 'das Foto', hi: 'photo', ex: 'Ich mache ein Foto' }
  ];
  const handleCheck = (correct: string) => { if (userInput.toLowerCase().trim() === correct) { speak(correct); setScore(score + 1); setUserInput(''); setTimeout(() => setStep(step + 1), 800); } else { speak(correct); setUserInput(''); setTimeout(() => setStep(step + 1), 1200); } };
  const startSpeakTask = () => { const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; if (!SR) return alert('Chrome use karo'); const r = new SR(); r.lang = 'de-DE'; r.start(); r.onresult = (e: any) => { const spoken = e.results[0][0].transcript.toLowerCase(); if (spoken.includes('ich schreibe') && spoken.includes('nachricht')) { speak('Perfekt!'); setScore(score + 1); setTimeout(() => setStep(step + 1), 1000); } else { speak('Bolo: Ich schreibe eine Nachricht'); } }; };
  if (step === 0) return <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white p-8 flex items-center justify-center"><div className="text-center max-w-md"><p className="text-6xl mb-4">📱</p><h1 className="text-4xl font-bold mb-4 text-indigo-400">A2 Lesson 10</h1><p className="text-xl mb-6">Medien - Internet & Handy</p><p className="text-gray-400 mb-8">Digital vocabulary</p><button onClick={() => setStep(1)} className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-bold text-xl">Start →</button></div></div>;
  if (step <= words.length) { const word = words[step - 1]; return <div className="min-h-screen bg-black text-white p-6"><div className="max-w-xl mx-auto"><div className="flex justify-between mb-4"><p className="text-sm text-indigo-400">Word {step}/18</p><p className="text-sm">Score: {score}/{step - 1}</p></div><div className="w-full bg-gray-800 rounded-full h-2 mb-6"><div className="bg-indigo-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div></div><div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center"><p className="text-5xl font-bold mb-4">{word.de}</p><p className="text-gray-400 mb-4">💡 {word.ex}</p><button onClick={() => speak(word.de)} className="text-indigo-400 underline">🔊 Suno</button></div><input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Hindi matlab..." className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600" onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)} /><button onClick={() => handleCheck(word.hi)} className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-bold">Check →</button>{step === 11 && <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">🎤 Voice: Nachricht schreiben</button>}</div></div>; }
  const passed = score >= 14; return <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white p-8"><div className="max-w-2xl mx-auto text-center"><p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p><h2 className="text-4xl font-bold mb-4 text-indigo-400">{passed? 'Tech Master!' : 'Practice More!'}</h2><p className="text-3xl mb-4">{score}/18</p>{passed? <button onClick={onComplete} className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-bold text-lg">A2 Lesson 11 →</button> : <button onClick={() => {setStep(0); setScore(0)}} className="w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg">Retry</button>}</div></div>;
}