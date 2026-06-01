'use client';
import { useState } from 'react';
type Word = { de: string; hi: string; ex: string };

export default function A2Lesson7({ onComplete }: { onComplete: () => void }) {
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
    { de: 'reisen', hi: 'safar karna', ex: 'Ich reise gern' },
    { de: 'gefahren', hi: 'gaya tha', ex: 'Ich bin nach Berlin gefahren' },
    { de: 'geflogen', hi: 'uda tha', ex: 'Wir sind geflogen' },
    { de: 'der Urlaub', hi: 'chutti/vacation', ex: 'Ich mache Urlaub' },
    { de: 'das Hotel', hi: 'hotel', ex: 'Wir übernachten im Hotel' },
    { de: 'der Koffer', hi: 'suitcase', ex: 'Mein Koffer ist schwer' },
    { de: 'packen', hi: 'packing karna', ex: 'Ich packe meinen Koffer' },
    { de: 'der Bahnhof', hi: 'railway station', ex: 'Wir treffen uns am Bahnhof' },
    { de: 'der Flughafen', hi: 'airport', ex: 'Der Flughafen ist groß' },
    { de: 'die Fahrkarte', hi: 'ticket', ex: 'Eine Fahrkarte bitte' },
    { de: 'die Sehenswürdigkeit', hi: 'darshaniya sthal', ex: 'Wir besichtigen Sehenswürdigkeiten' },
    { de: 'fotografieren', hi: 'photo khinchna', ex: 'Ich fotografiere viel' },
    { de: 'das Foto', hi: 'photo', ex: 'Ein schönes Foto' },
    { de: 'die Reise', hi: 'yatra', ex: 'Die Reise war schön' },
    { de: 'ankommen', hi: 'pahunchna', ex: 'Wir kommen an' },
    { de: 'abfahren', hi: 'nikalna', ex: 'Der Zug fährt ab' },
    { de: 'übernachten', hi: 'raat rukna', ex: 'Wir übernachten hier' },
    { de: 'die Stadt', hi: 'sheher', ex: 'Berlin ist eine schöne Stadt' }
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
    if (!SR) return alert('Chrome use karo');
    const r = new SR();
    r.lang = 'de-DE';
    r.start();
    r.onresult = (e: any) => {
      const spoken = e.results[0][0].transcript.toLowerCase();
      if (spoken.includes('ich bin') && spoken.includes('gefahren')) {
        speak('Wunderbar! Reise story perfekt!');
        setScore(score + 1);
        setTimeout(() => setStep(step + 1), 1000);
      } else {
        speak('Bolo: Ich bin letztes Jahr nach München gefahren');
      }
    };
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">✈️</p>
          <h1 className="text-4xl font-bold mb-4 text-sky-400">A2 Lesson 7</h1>
          <p className="text-xl mb-6">Reisen - Travel Past Tense</p>
          <p className="text-gray-400 mb-8">18 words + Reise story bolo</p>
          <button onClick={() => setStep(1)} className="w-full bg-sky-600 hover:bg-sky-700 py-4 rounded-xl font-bold text-xl">
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
            <p className="text-sm text-sky-400">Word {step}/18</p>
            <p className="text-sm">Score: {score}/{step - 1}</p>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div className="bg-sky-600 h-2 rounded-full transition-all" style={{width: `${(step/18)*100}%`}}></div>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl mb-6 text-center">
            <p className="text-5xl font-bold mb-4">{word.de}</p>
            <p className="text-gray-400 mb-4">💡 {word.ex}</p>
            <button onClick={() => speak(word.de)} className="text-sky-400 underline">🔊 Suno</button>
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Hindi matlab..."
            className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center mb-4 focus:outline-none focus:ring-2 focus:ring-sky-600"
            onKeyPress={(e) => e.key === 'Enter' && handleCheck(word.hi)}
          />
          <button onClick={() => handleCheck(word.hi)} className="w-full bg-sky-600 hover:bg-sky-700 py-4 rounded-xl font-bold">
            Check →
          </button>
          {step === 12 && (
            <button onClick={startSpeakTask} className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold">
              🎤 Voice: Ich bin nach... gefahren
            </button>
          )}
        </div>
      </div>
    );
  }

  const passed = score >= 14;
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4 text-sky-400">{passed? 'Travel Master!' : 'Practice More!'}</h2>
        <p className="text-3xl mb-4">{score}/18</p>
        {passed? (
          <button onClick={onComplete} className="w-full bg-sky-600 hover:bg-sky-700 py-4 rounded-xl font-bold text-lg">
            A2 Lesson 8 →
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