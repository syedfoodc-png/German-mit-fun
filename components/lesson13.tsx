'use client';
import { useState } from 'react';

// Type define kar diya boss - error khatam
type StoryPart = {
  type: 'choice' | 'typing' | 'speak';
  scene: string;
  text: string;
  ans: string;
  hint: string;
  used: string;
  options?: string[]; //? lagaya = optional hai
}

export default function Lesson13({ onComplete }: { onComplete: () => void }) {
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

  // Story parts with Type
  const storyParts: StoryPart[] = [
    {
      type: 'choice',
      scene: 'Scene 1: Airport pe utarte hi...',
      text: 'Ek aadmi aata hai aur bolta hai: "____, wie geht\'s?"',
      options: ['Tschüss', 'Hallo', 'Danke'],
      ans: 'Hallo',
      hint: 'Lesson 1: Greeting',
      used: 'Hallo = Hello'
    },
    {
      type: 'typing',
      scene: 'Scene 2: Aadmi puchta hai naam...',
      text: 'Aadmi: "Wie heißen Sie?"\nTum: "____ Name ist Rahul"',
      ans: 'Mein',
      hint: 'Lesson 2: My =?',
      used: 'Mein Name ist = My name is'
    },
    {
      type: 'speak',
      scene: 'Scene 3: Age puchta hai...',
      text: 'Aadmi: "Wie alt sind Sie?"\nBolo mic pe: "Ich bin ____ Jahre alt"',
      ans: 'zwanzig',
      hint: 'Lesson 3: 20 ko kya bolte hai?',
      used: 'zwanzig = 20'
    },
    {
      type: 'choice',
      scene: 'Scene 4: Hotel check-in...',
      text: 'Reception: "Das ist Ihr Zimmer. Hier ist der ____."',
      options: ['Vater', 'Schlüssel', 'Brot'],
      ans: 'Schlüssel',
      hint: 'Lesson 4-5: Key/Things',
      used: 'Schlüssel = Key'
    },
    {
      type: 'typing',
      scene: 'Scene 5: Restaurant me...',
      text: 'Waiter: "Was möchten Sie?"\nTum: "Ich möchte ____ und Wasser"',
      ans: 'Brot',
      hint: 'Lesson 5: Bread =?',
      used: 'Brot = Bread'
    },
    {
      type: 'speak',
      scene: 'Scene 6: Bill ke time...',
      text: 'Waiter: "Das macht 15 Euro"\nBolo: "____ bitte" = Thank you please',
      ans: 'danke',
      hint: 'Lesson 1: Thank you =?',
      used: 'Danke = Thank you'
    },
    {
      type: 'choice',
      scene: 'Scene 7: Naya dost mila...',
      text: 'Dost: "Das ist meine ____ Maria"',
      options: ['Schwester', 'Mutter', 'Katze'],
      ans: 'Schwester',
      hint: 'Lesson 6: Family',
      used: 'Schwester = Sister'
    },
    {
      type: 'typing',
      scene: 'Scene 8: Din puchta hai...',
      text: 'Maria: "Welcher Tag ist heute?"\nTum: "Heute ist ____"',
      ans: 'Montag',
      hint: 'Lesson 7: Monday =?',
      used: 'Montag = Monday'
    },
    {
      type: 'speak',
      scene: 'Scene 9: Time puchta hai...',
      text: 'Bolo: "Es ist ____ Uhr" = It is 10 o\'clock',
      ans: 'zehn',
      hint: 'Lesson 3: 10 =?',
      used: 'zehn = 10'
    },
    {
      type: 'choice',
      scene: 'Scene 10: Ghar wapas...',
      text: 'Tum: "Ich gehe nach ____ und schlafe"',
      options: ['Hause', 'Schule', 'Arbeit'],
      ans: 'Hause',
      hint: 'Lesson 4: Home',
      used: 'nach Hause = to home'
    },
    {
      type: 'typing',
      scene: 'Scene 11: Raat ko...',
      text: 'Padosi: "Gute ____" = Good Night',
      ans: 'Nacht',
      hint: 'Lesson 1: Night',
      used: 'Gute Nacht = Good Night'
    },
    {
      type: 'speak',
      scene: 'Scene 12: Final line - Full intro',
      text: 'Bolo full: "Hallo, mein Name ist Rahul. Ich bin zwanzig Jahre alt. Gute Nacht!"',
      ans: 'hallo mein name ist rahul ich bin zwanzig jahre alt gute nacht',
      hint: 'Saare lessons ka combo!',
      used: 'Full A1 Intro Complete'
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
      const matches = spokenWords.filter((w: string) => correctWords.includes(w)).length; // 'w: string' type add kiya
      if (matches >= correctWords.length * 0.8) {
        speak('Perfekt! Geschichte complete!');
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

  // Step 0: Story Intro
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">📖</p>
          <h1 className="text-4xl font-bold mb-4 text-purple-400">Final Story Mission</h1>
          <p className="text-gray-400 mb-6">Rahul ka Germany ka pehla din</p>
          <div className="bg-gray-800 p-6 rounded-2xl mb-6 text-left">
            <p className="mb-2">🎯 12 Scenes = 12 Lessons</p>
            <p className="mb-2">🎤 Bolo + ⌨️ Type + 🧩 Choose</p>
            <p className="mb-2">💡 Har blank me purana word</p>
            <p className="mt-4 text-purple-400 font-bold">Pass: 9/12 = 75%</p>
          </div>
          <button onClick={() => setStep(1)} className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold text-xl transition">
            Story Start karein →
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Story Game
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-purple-400">Scene {storyIndex + 1}/12</p>
            <p className="text-sm">Score: {score}/{storyIndex}</p>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div className="bg-purple-600 h-2 rounded-full transition-all" style={{width: `${(storyIndex/12)*100}%`}}></div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl mb-6 border-purple-800">
            <p className="text-xs text-purple-400 mb-3">{current.scene}</p>
            <p className="text-lg whitespace-pre-line">{current.text}</p>
          </div>

          <p className="text-xs text-gray-500 mb-4">💡 Hint: {current.hint}</p>

          {/* Choice Type - current.options? check add kiya */}
          {current.type === 'choice' && current.options && (
            <div className="space-y-3">
              {current.options.map((opt: string, i: number) => ( // type add kiya
                <button key={i} onClick={() => handleChoice(opt, current.ans)} className="w-full bg-gray-800 py-4 rounded-xl text-xl hover:bg-gray-700 active:scale-95 transition">
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Typing Type */}
          {current.type === 'typing' && (
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="German word likho..."
                className="w-full bg-gray-800 p-4 rounded-xl text-xl text-center focus:outline-none focus:ring-2 focus:ring-purple-600"
                onKeyPress={(e) => e.key === 'Enter' && handleTyping()}
              />
              <button onClick={handleTyping} className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold">
                Submit →
              </button>
            </div>
          )}

          {/* Speaking Type */}
          {current.type === 'speak' && (
            <div className="space-y-4 text-center">
              <button onClick={startSpeakTask} className="w-full bg-red-600 hover:bg-red-700 py-8 rounded-2xl font-bold text-xl">
                🎤 Tap & Bolo Scene
              </button>
              <button onClick={() => speak(current.ans)} className="text-purple-400 text-sm underline">
                🔊 Sahi pronunciation suno
              </button>
            </div>
          )}

          {storyIndex > 0 && (
            <p className="text-xs text-green-400 mt-4 text-center">✓ Last word: {storyParts[storyIndex-1].used}</p>
          )}
        </div>
      </div>
    );
  }

  // Step 2: Result
  const passed = score >= 9;
  const percentage = Math.round((score/12)*100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-8xl mb-4">{passed? '🏆' : '📚'}</p>
        <h2 className="text-4xl font-bold mb-4 text-purple-400">{passed? 'Geschichte Complete!' : 'Practice More!'}</h2>
        <p className="text-3xl mb-2">{score}/12</p>
        <p className="text-2xl mb-4 text-purple-400">{percentage}%</p>

        {passed? (
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-2xl text-left">
              <p className="text-xl font-bold mb-4 text-green-400">🎉 A1 Story Summary:</p>
              {storyParts.map((s, i) => (
                <p key={i} className="text-sm text-gray-300 mb-1">✓ {s.used}</p>
              ))}
            </div>
            <button onClick={onComplete} className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold text-lg">
              A1 Certificate Lo →
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