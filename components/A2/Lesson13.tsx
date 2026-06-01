'use client';
import { useState } from 'react';

type StoryPart = {
  type: 'choice' | 'typing' | 'speak';
  scene: string;
  text: string;
  ans: string;
  hint: string;
  used: string;
  options?: string[];
}

export default function A2Lesson13({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');

  const speak = (text: string, callback?: () => void) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.8;
    if (callback) utterance.onend = callback;
    speechSynthesis.speak(utterance);
  };

  // A2 Final Story: Abdul & Faraz ka 1 saal Deutschland me
  const storyParts: StoryPart[] = [
    {
      type: 'choice',
      scene: 'Scene 1: 1 Jahr später...',
      text: 'Abdul: "Faraz, vor einem Jahr waren wir neu hier."\nFaraz: "Ja, jetzt ____ wir Deutsch!"',
      options: ['sprechen', 'vergessen', 'schlafen'],
      ans: 'sprechen',
      hint: 'Lesson 1: sprechen = speak',
      used: 'Wir sprechen Deutsch'
    },
    {
      type: 'typing',
      scene: 'Scene 2: Abdul ka job...',
      text: 'Abdul: "Letztes Jahr ____ ich noch arbeitslos."\nFaraz: "Und jetzt?"\nAbdul: "Jetzt ____ ich bei Siemens"',
      ans: 'war arbeite',
      hint: 'Lesson 2: war = tha, arbeite = kaam karta hu',
      used: 'war arbeite'
    },
    {
      type: 'speak',
      scene: 'Scene 3: Faraz ka Alltag...',
      text: 'Bolo: "Täglich stehe ich um sechs Uhr auf. Ich frühstücke und gehe zur Arbeit."',
      ans: 'täglich stehe ich um sechs uhr auf ich frühstücke und gehe zur arbeit',
      hint: 'Lesson 2: Alltag words',
      used: 'Täglich routine'
    },
    {
      type: 'choice',
      scene: 'Scene 4: Wohnung...',
      text: 'Faraz: "Unsere ____ ist klein aber schön."\nAbdul: "Ja, wir haben eine Küche und zwei Zimmer."',
      options: ['Wohnung', 'Schule', 'Arbeit'],
      ans: 'Wohnung',
      hint: 'Lesson 5: Wohnung = flat',
      used: 'Wohnung = flat'
    },
    {
      type: 'typing',
      scene: 'Scene 5: Gesundheit...',
      text: 'Abdul: "Letzten Monat war ich krank."\nFaraz: "Jetzt ____ du gesund?"\nAbdul: "Ja, mir geht es gut."',
      ans: 'bist',
      hint: 'Lesson 6: bist = ho tu',
      used: 'gesund sein'
    },
    {
      type: 'speak',
      scene: 'Scene 6: Urlaub plan...',
      text: 'Bolo: "Nächsten Monat fahren wir nach Berlin. Wir besuchen Freunde."',
      ans: 'nächsten monat fahren wir nach berlin wir besuchen freunde',
      hint: 'Lesson 7: nächsten Monat = next month',
      used: 'Reiseplan'
    },
    {
      type: 'choice',
      scene: 'Scene 7: Essen...',
      text: 'Abdul: "Ich ____ gern indisch."\nFaraz: "Ich auch! Lass uns kochen."',
      options: ['esse', 'vergesse', 'schlafe'],
      ans: 'esse',
      hint: 'Lesson 3: essen = khana',
      used: 'Ich esse gern'
    },
    {
      type: 'typing',
      scene: 'Scene 8: Freunde...',
      text: 'Faraz: "Wir haben viele Freunde hier."\nAbdul: "Ja, Maria und Ahmed ____ nett."',
      ans: 'sind',
      hint: 'Lesson 1: sind = hai log',
      used: 'Freunde sind nett'
    },
    {
      type: 'speak',
      scene: 'Scene 9: Zukunft...',
      text: 'Bolo: "Ich werde nächstes Jahr eine Prüfung machen. Ich will B1 lernen."',
      ans: 'ich werde nächstes jahr eine prüfung machen ich will b1 lernen',
      hint: 'Lesson 12: ich werde = I will',
      used: 'Zukunftspläne'
    },
    {
      type: 'choice',
      scene: 'Scene 10: Einkaufen...',
      text: 'Faraz: "Das Brot kostet 2 Euro. Das ist ____."\nAbdul: "Ja, billig!"',
      options: ['teuer', 'billig', 'groß'],
      ans: 'billig',
      hint: 'Lesson 9: billig = sasta',
      used: 'billig = cheap'
    },
    {
      type: 'typing',
      scene: 'Scene 11: Wetter...',
      text: 'Abdul: "Heute ist es kalt."\nFaraz: "Ja, im Winter ist es immer ____ in Deutschland."',
      ans: 'kalt',
      hint: 'Lesson 11: kalt = thanda',
      used: 'Winter ist kalt'
    },
    {
      type: 'speak',
      scene: 'Scene 12: Final - 1 Jahr Summary',
      text: 'Bolo full: "Vor einem Jahr kamen Abdul und Faraz nach Deutschland. Jetzt sprechen wir Deutsch. Wir haben Freunde und Arbeit. Wir sind glücklich!"',
      ans: 'vor einem jahr kamen abdul und faraz nach deutschland jetzt sprechen wir deutsch wir haben freunde und arbeit wir sind glücklich',
      hint: 'A2 ke saare lessons ka combo!',
      used: 'A2 Complete - Abdul & Faraz Story'
    }
  ];

  const current = storyParts[storyIndex];

  const handleChoice = (selected: string, correct: string) => {
    speak(selected);
    if (selected === correct) {
      setScore(score + 1);
      setTimeout(nextStory, 1000);
    } else {
      speak(correct);
      setTimeout(nextStory, 1500);
    }
  };

  const handleTyping = () => {
    if (userInput.toLowerCase().trim() === current.ans.toLowerCase()) {
      speak(current.ans);
      setScore(score + 1);
      setUserInput('');
      setTimeout(nextStory, 1000);
    } else {
      speak(current.ans);
      setUserInput('');
      setTimeout(nextStory, 1500);
    }
  };

  const startSpeakTask = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Chrome use karo mic ke liye');
    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.start();
    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
      const correct = current.ans.toLowerCase();
      const spokenWords = spoken.split(' ');
      const correctWords = correct.split(' ');
      const matches = spokenWords.filter((w: string) => correctWords.includes(w)).length;
      if (matches >= correctWords.length * 0.7) {
        speak('Perfekt! Abdul & Faraz story complete!');
        setScore(score + 1);
        setTimeout(nextStory, 1000);
      } else {
        speak('Fast! Phir try karo');
      }
    };
  };

  const nextStory = () => {
    if (storyIndex < storyParts.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setStep(2);
    }
  };

  // Step 0: Intro
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-black to-black text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">📖</p>
          <h1 className="text-4xl font-bold mb-4 text-blue-400">A2 Final Story</h1>
          <p className="text-gray-400 mb-6">Abdul & Faraz: 1 Jahr in Deutschland</p>
          <div className="bg-gray-800 p-6 rounded-2xl mb-6 text-left">
            <p className="mb-2">🎯 12 Scenes = A2 Revision</p>
            <p className="mb-2">🎤 Bolo + ⌨️ Type + 🧩 Choose</p>
            <p className="mb-2">💡 Past + Present + Future</p>
            <p className="mt-4 text-blue-400 font-bold">Pass: 9/12 = 75%</p>
          </div>
          <button onClick={() => setStep(1)} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-xl transition">
            Story Start karein →
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Game
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-blue-400">Scene {storyIndex + 1}/12</p>
            <p className="text-sm">Score: {score}/{storyIndex}</p>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${(storyIndex/12)*100}%`}}></div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl mb-6 border-blue-800">
            <p className="text-xs text-blue-400 mb-3">{current.scene}</p>
            <p className="text-lg whitespace-pre-line">{current.text}</p>
          </div>

          <p className="text-xs text-gray-500 mb-4">💡 Hint: {current.hint}</p>

          {current.type === 'choice' && current.options && (
            <div className="space-y-3">
              {current.options.map((opt: string, i: number) => (
                <button key={i} onClick={() => handleChoice(opt, current.ans)} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700 active:scale-95 transition">
                  {opt}
                </button>
              ))}
            </div>
          )}

          {current.type === 'typing' && (
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="German likho..."
                className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
                onKeyPress={(e) => e.key === 'Enter' && handleTyping()}
              />
              <button onClick={handleTyping} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold">
                Submit →
              </button>
            </div>
          )}

          {current.type === 'speak' && (
            <div className="space-y-4 text-center">
              <button onClick={startSpeakTask} className="w-full bg-red-600 hover:bg-red-700 py-8 rounded-2xl font-bold text-xl">
                🎤 Tap & Bolo Scene
              </button>
              <button onClick={() => speak(current.ans)} className="text-blue-400 text-sm underline">
                🔊 Sahi pronunciation suno
              </button>
            </div>
          )}

          {storyIndex > 0 && (
            <p className="text-xs text-green-400 mt-4 text-center">✓ {storyParts[storyIndex-1].used}</p>
          )}
        </div>
      </div>
    );
  }

  // Step 2: Result
  const passed = score >= 9;
  const percentage = Math.round((score/12)*100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4 text-blue-400">{passed? 'A2 Complete!' : 'Practice More!'}</h2>
        <p className="text-3xl mb-2">{score}/12</p>
        <p className="text-2xl mb-4 text-blue-400">{percentage}%</p>

        {passed? (
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-2xl text-left">
              <p className="text-xl font-bold mb-4 text-green-400">🎉 Abdul & Faraz - 1 Jahr Summary:</p>
              {storyParts.map((s, i) => (
                <p key={i} className="text-sm text-gray-300 mb-1">✓ {s.used}</p>
              ))}
            </div>
            <button onClick={onComplete} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg">
              B1 Unlock karein →
            </button>
          </div>
        ) : (
          <button onClick={() => {setStep(0); setStoryIndex(0); setScore(0)}} className="w-full bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg">
            Story Retry
          </button>
        )}
      </div>
    </div>
  );
}