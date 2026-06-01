'use client';
import { useState, useEffect } from 'react';

export default function Lesson0({ onComplete }: { onComplete: () => void }) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [germanVoice, setGermanVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoice = () => {
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'de-DE') || voices.find(v => v.lang.includes('de'));
      setGermanVoice(voice || null);
    };
    loadVoice();
    speechSynthesis.onvoiceschanged = loadVoice;
  }, []);

  const speak = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // English voice use karenge kyunki "ah, bay" English words hain
    utterance.rate = 0.5;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const alphabet = [
    { letter: 'A', pron: 'ah' },
    { letter: 'B', pron: 'bay' },
    { letter: 'C', pron: 'tsay' },
    { letter: 'D', pron: 'day' },
    { letter: 'E', pron: 'ay' },
    { letter: 'F', pron: 'eff' },
    { letter: 'G', pron: 'gay' },
    { letter: 'H', pron: 'hah' },
    { letter: 'I', pron: 'ee' },
    { letter: 'J', pron: 'yot' },
    { letter: 'K', pron: 'kah' },
    { letter: 'L', pron: 'ell' },
    { letter: 'M', pron: 'em' },
    { letter: 'N', pron: 'enn' },
    { letter: 'O', pron: 'oh' },
    { letter: 'P', pron: 'pay' },
    { letter: 'Q', pron: 'koo' },
    { letter: 'R', pron: 'errr' },
    { letter: 'S', pron: 'ess' },
    { letter: 'T', pron: 'tay' },
    { letter: 'U', pron: 'oo' },
    { letter: 'V', pron: 'fow' },
    { letter: 'W', pron: 'vay' },
    { letter: 'X', pron: 'iks' },
    { letter: 'Y', pron: 'upsilonn' },
    { letter: 'Z', pron: 'tsett' },
    { letter: 'Ä', pron: 'eh' },
    { letter: 'Ö', pron: 'oe' },
    { letter: 'Ü', pron: 'ü' },
    { letter: 'ß', pron: 'ess-tsett' }
  ];

  const playSound = (item: any) => {
    setSelectedLetter(item.letter);
    speak(item.pron); // SIRF pronunciation bolega
    setTimeout(() => setSelectedLetter(null), 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8">
          <p className="text-6xl mb-3">🇩🇪</p>
          <h1 className="text-4xl font-bold mb-2 text-green-400">A1 Lesson 0</h1>
          <p className="text-xl text-gray-400">Alphabet Sounds</p>
          <p className="text-sm text-gray-500 mt-2">Tap karo → Sirf sound suno</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
          {alphabet.map((item) => (
            <button
              key={item.letter}
              onClick={() => playSound(item)}
              className={`p-6 rounded-2xl transition-all ${
                selectedLetter === item.letter
                 ? 'bg-green-600 scale-110 shadow-lg shadow-green-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 hover:scale-105'
              }`}
            >
              <p className="text-5xl font-bold mb-2">{item.letter}</p>
              <p className="text-lg text-gray-400">[{item.pron}]</p>
            </button>
          ))}
        </div>

        {selectedLetter && (
          <div className="bg-gray-900 p-8 rounded-2xl text-center border-2 border-green-600">
            <p className="text-sm text-gray-400 mb-2">You heard</p>
            <p className="text-8xl font-bold text-green-400 mb-2">{selectedLetter}</p>
            <p className="text-3xl text-green-300">[{alphabet.find(a => a.letter === selectedLetter)?.pron}]</p>
          </div>
        )}

        <button
          onClick={onComplete}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg"
        >
          A1 Lesson 1 →
        </button>
      </div>
    </div>
  );
}