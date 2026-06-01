'use client';
import { useState, useEffect } from 'react';

export default function Lesson1({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [tasksDone, setTasksDone] = useState([false, false]);
  const [listenOptions, setListenOptions] = useState<string[]>([]);
  const [showListenOptions, setShowListenOptions] = useState(false);
  const [germanVoice, setGermanVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [droppedWord, setDroppedWord] = useState<string>('');
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>(''); // Naya state
  const [showFeedback, setShowFeedback] = useState(false); // Naya state

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const loadVoice = () => {
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'de-DE' && v.name.toLowerCase().includes('female'))
                 || voices.find(v => v.lang === 'de-DE')
                 || voices.find(v => v.lang.includes('de'));
      setGermanVoice(voice || null);
    };
    loadVoice();
    speechSynthesis.onvoiceschanged = loadVoice;
  }, []);

  useEffect(() => {
    const allQuestions = [
      { q: 'Hello ko German me kya bolte hai?', options: ['Tschüss', 'Hallo', 'Danke'], ans: 'Hallo' },
      { q: 'Good Morning kya hai?', options: ['Gute Nacht', 'Guten Morgen', 'Guten Tag'], ans: 'Guten Morgen' },
      { q: 'Thank you ko kya bolte hai?', options: ['Bitte', 'Danke', 'Ja'], ans: 'Danke' },
      { q: 'Bye ko kya bolte hai?', options: ['Hallo', 'Tschüss', 'Nein'], ans: 'Tschüss' },
      { q: 'How are you? kya hai?', options: ['Wie geht\'s?', 'Gut', 'Ja'], ans: 'Wie geht\'s?' },
      { q: 'Please ko kya bolte hai?', options: ['Bitte', 'Danke', 'Ja'], ans: 'Bitte' },
      { q: 'No ko kya bolte hai?', options: ['Ja', 'Nein', 'Gut'], ans: 'Nein' },
      { q: 'Good Night kya hai?', options: ['Guten Tag', 'Gute Nacht', 'Guten Morgen'], ans: 'Gute Nacht' }
    ];

    const shuffled = shuffleArray(allQuestions).slice(0, 5);
    setQuizQuestions(shuffled);
  }, []);

  const words = [
    { de: 'Hallo', pron: 'ha-lo', emoji: '👋', meaning: 'Hello' },
    { de: 'Tschüss', pron: 'chüs', emoji: '👋', meaning: 'Bye' },
    { de: 'Guten Morgen', pron: 'goo-ten mor-gen', emoji: '☀️', meaning: 'Good Morning' },
    { de: 'Guten Tag', pron: 'goo-ten tahg', emoji: '🌤️', meaning: 'Good Day' },
    { de: 'Gute Nacht', pron: 'goo-te nahkt', emoji: '🌙', meaning: 'Good Night' },
    { de: 'Bitte', pron: 'bit-te', emoji: '🙏', meaning: 'Please' },
    { de: 'Danke', pron: 'dan-ke', emoji: '🙏', meaning: 'Thank you' },
    { de: 'Entschuldigung', pron: 'ent-shul-di-gung', emoji: '😅', meaning: 'Sorry' },
    { de: 'Ja', pron: 'ya', emoji: '✅', meaning: 'Yes' },
    { de: 'Nein', pron: 'nine', emoji: '❌', meaning: 'No' },
    { de: 'Wie geht\'s?', pron: 'vee gayts', emoji: '🤔', meaning: 'How are you?' },
    { de: 'Gut', pron: 'goot', emoji: '😊', meaning: 'Good' }
  ];

  const speak = (text: string, callback?: () => void) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.6;
    utterance.pitch = 1;
    if (germanVoice) utterance.voice = germanVoice;
    if (callback) utterance.onend = callback;
    speechSynthesis.speak(utterance);
  };

  const speakWord = (word: string) => {
    setSpeakingWord(word);
    speak(word);
    setTimeout(() => setSpeakingWord(null), 1500);
  };

  // Updated checkAnswer with feedback
  const checkAnswer = (selected: string) => {
    if (showFeedback) return; // Dobara click na ho

    setSelectedAnswer(selected);
    setShowFeedback(true);
    speak(selected, () => {
      const isCorrect = selected === quizQuestions[qIndex].ans;
      if (isCorrect) setScore(score + 1);

      // 1.5 sec baad next question
      setTimeout(() => {
        setSelectedAnswer('');
        setShowFeedback(false);
        if (qIndex < quizQuestions.length - 1) setQIndex(qIndex + 1);
        else setStep(2);
      }, 1500);
    });
  };

  const startListenTask = () => {
    speak('Wie geht\'s?');
    setTimeout(() => {
      const options = shuffleArray(['How are you?', 'Good Morning', 'Thank you']);
      setListenOptions(options);
      setShowListenOptions(true);
    }, 1500);
  };

  const checkListen = (selected: string) => {
    if (selected === 'How are you?') {
      speak('Richtig!');
      const newTasks = [...tasksDone];
      newTasks[0] = true;
      setTasksDone(newTasks);
      setShowListenOptions(false);
    } else {
      speak('Falsch! Phir suno');
      setShowListenOptions(false);
    }
  };

  const dragOptions = shuffleArray(['Hallo', 'Gut', 'Danke', 'Nein']);
  const correctAnswer = 'Gut';

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('word', word);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('word');
    setDroppedWord(word);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkDragDrop = () => {
    if (droppedWord === correctAnswer) {
      speak('Perfekt!');
      const newTasks = [...tasksDone];
      newTasks[1] = true;
      setTasksDone(newTasks);
    } else {
      speak('Falsch! Phir try karo');
      setDroppedWord('');
    }
  };

  const allTasksDone = tasksDone.every(t => t);

  if (step === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-green-400 font-bold">LESSON 1</p>
            <h1 className="text-3xl font-bold mb-2">Greetings 👋</h1>
            <p className="text-gray-400">Har card pe tap karo → German suno</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {words.map((w) => (
              <button
                key={w.de}
                onClick={() => speakWord(w.de)}
                className={`bg-gray-800 p-5 rounded-2xl transition text-center border-2 ${
                  speakingWord === w.de
               ? 'border-green-500 bg-green-900/30 scale-105'
                    : 'border-gray-700 hover:bg-gray-700 active:scale-95'
                }`}
              >
                <p className="text-4xl mb-2">{w.emoji}</p>
                <p className="text-xl font-bold mb-1">{w.de}</p>
                <p className="text-sm text-green-400 mb-1">[{w.pron}]</p>
                <p className="text-gray-400 text-xs">{w.meaning}</p>
                <p className="text-xs text-gray-500 mt-2">🔊 Tap</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg transition"
          >
            Next → Quiz 5 Questions
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Quiz - WITH FEEDBACK ✅❌
  if (step === 1 && quizQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between mb-6">
            <p className="text-lg text-blue-400">Quiz Q {qIndex + 1}/5</p>
            <p className="text-lg">Score: {score}/5</p>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
            <div className="bg-blue-600 h-3 rounded-full transition-all" style={{width: `${(qIndex/5)*100}%`}}></div>
          </div>

          <h2 className="text-2xl font-bold mb-8 text-center">{quizQuestions[qIndex].q}</h2>

          <div className="space-y-4">
            {shuffleArray(quizQuestions[qIndex].options).map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === quizQuestions[qIndex].ans;
              const isWrong = isSelected &&!isCorrect;

              let btnClass = "w-full bg-gray-800 py-4 rounded-xl text-xl transition border-2 flex items-center justify-between px-6 ";

              if (showFeedback) {
                if (isCorrect) btnClass += "border-green-500 bg-green-900/40 ";
                else if (isWrong) btnClass += "border-red-500 bg-red-900/40 ";
                else btnClass += "border-gray-700 opacity-60 ";
              } else {
                btnClass += "border-gray-700 hover:bg-gray-700 active:scale-95 ";
              }

              return (
                <button
                  key={i}
                  onClick={() => checkAnswer(opt)}
                  disabled={showFeedback}
                  className={btnClass}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <span className="text-3xl">✅</span>}
                  {showFeedback && isWrong && <span className="text-3xl">❌</span>}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <p className="text-center mt-6 text-lg">
              {selectedAnswer === quizQuestions[qIndex].ans
               ? 'Sehr gut! Richtig! 🎉'
                : `Falsch! Sahi answer: ${quizQuestions[qIndex].ans}`
              }
            </p>
          )}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">🎯 Real Missions</h1>
          <p className="text-gray-400 text-center mb-6">2/2 complete karo = Lesson Pass</p>

          <div className="space-y-4">
            <div className={`bg-gray-800 p-6 rounded-2xl border-2 ${tasksDone[0]? 'border-green-500' : 'border-gray-700'}`}>
              <div className="flex justify-between mb-3">
                <p className="font-bold text-lg">Mission 1: Suno 👂</p>
                {tasksDone[0] && <p className="text-green-400 font-bold">✅ Done</p>}
              </div>
              <p className="text-gray-300 mb-4">German audio suno aur sahi matlab choose karo</p>

              {!showListenOptions? (
                <button
                  onClick={startListenTask}
                  disabled={tasksDone[0]}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                    tasksDone[0]? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  }`}
                >
                  {tasksDone[0]? 'Completed' : '🔊 Play Audio'}
                </button>
              ) : (
                <div className="space-y-3">
                  {listenOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => checkListen(opt)}
                      className="w-full bg-gray-900 py-3 rounded-xl hover:bg-gray-700 transition border-gray-700"
                    >
                      {i+1}) {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`bg-gray-800 p-6 rounded-2xl border-2 ${tasksDone[1]? 'border-green-500' : 'border-gray-700'}`}>
              <div className="flex justify-between mb-3">
                <p className="font-bold text-lg">Mission 2: Drag & Drop 🧩</p>
                {tasksDone[1] && <p className="text-green-400 font-bold">✅ Done</p>}
              </div>

              <p className="text-gray-300 mb-4">
                Friend: Hallo, wie geht's?<br/>
                You:
                <span
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`inline-block min-w-[100px] px-4 py-2 mx-2 rounded-lg border-2 border-dashed transition ${
                    droppedWord
                 ? droppedWord === correctAnswer
                   ? 'border-green-500 bg-green-900/30'
                      : 'border-red-500 bg-red-900/30'
                    : 'border-gray-500 bg-gray-900'
                  }`}
                >
                  {droppedWord || '____'}
                </span>
             , danke
              </p>

              {!tasksDone[1] && (
                <>
                  <p className="text-sm text-gray-400 mb-3">Niche se word drag karke upar drop karo:</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {dragOptions.map((word) => (
                      <div
                        key={word}
                        draggable
                        onDragStart={(e) => handleDragStart(e, word)}
                        className="bg-gray-900 py-3 rounded-xl text-center font-bold text-lg cursor-grab active:cursor-grabbing hover:bg-gray-700 transition border-gray-700 select-none"
                      >
                        {word}
                      </div>
                    ))}
                  </div>

                  {droppedWord && (
                    <button
                      onClick={checkDragDrop}
                      className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold transition"
                    >
                      Check Answer
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {allTasksDone && (
            <button
              onClick={() => setStep(3)}
              className="mt-6 w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-xl font-bold text-lg transition animate-pulse"
            >
              🎉 Complete Lesson →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center max-w-md">
        <p className="text-7xl mb-4">🎉</p>
        <h2 className="text-4xl font-bold mb-4 text-green-400">Perfekt!</h2>
        <p className="text-2xl mb-2">Quiz: {score}/5</p>
        <p className="text-2xl mb-4">Missions: 2/2 ✅</p>
        <p className="text-gray-400 mb-8">Lesson 1 Complete!</p>
        <button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold text-lg transition"
        >
          Lesson 2 →
        </button>
      </div>
    </div>
  );
}