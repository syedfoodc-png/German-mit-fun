'use client';
import { useState, useEffect } from 'react';

// A1 Lessons - Lesson0 import add kiya
import Lesson0 from '../components/lesson0';
import Lesson1 from '../components/lesson1';
import Lesson2 from '../components/lesson2';
import Lesson3 from '../components/lesson3';
import Lesson4 from '../components/lesson4';
import Lesson5 from '../components/lesson5';
import Lesson6 from '../components/lesson6';
import Lesson7 from '../components/lesson7';
import Lesson8 from '../components/lesson8';
import Lesson9 from '../components/lesson9';
import Lesson10 from '../components/lesson10';
import Lesson11 from '../components/lesson11';
import Lesson12 from '../components/lesson12';
import Lesson13 from '../components/lesson13';

// A2 Lessons
import A2Lesson1 from '../components/A2/Lesson1';
import A2Lesson2 from '../components/A2/Lesson2';
import A2Lesson3 from '../components/A2/Lesson3';
import A2Lesson4 from '../components/A2/Lesson4';
import A2Lesson5 from '../components/A2/Lesson5';
import A2Lesson6 from '../components/A2/Lesson6';
import A2Lesson7 from '../components/A2/Lesson7';
import A2Lesson8 from '../components/A2/Lesson8';
import A2Lesson9 from '../components/A2/Lesson9';
import A2Lesson10 from '../components/A2/Lesson10';
import A2Lesson11 from '../components/A2/Lesson11';
import A2Lesson12 from '../components/A2/Lesson12';
import A2Lesson13 from '../components/A2/Lesson13';

import Certificate from '../components/Certificate';

const levels = {
  A1: {
    name: "A1 Beginner",
    icon: "🟢",
    color: "from-green-500 to-green-700",
    lessons: [
      { id: 0, name: "Alphabet & Aussprache", comp: Lesson0 },
      { id: 1, name: "Greetings", comp: Lesson1 },
      { id: 2, name: "Self Intro", comp: Lesson2 },
      { id: 3, name: "Numbers 1-10", comp: Lesson3 },
      { id: 4, name: "Colors", comp: Lesson4 },
      { id: 5, name: "Family", comp: Lesson5 },
      { id: 6, name: "Food & Drink", comp: Lesson6 },
      { id: 7, name: "Days & Time", comp: Lesson7 },
      { id: 8, name: "Directions", comp: Lesson8 },
      { id: 9, name: "Shopping", comp: Lesson9 },
      { id: 10, name: "Health", comp: Lesson10 },
      { id: 11, name: "Travel", comp: Lesson11 },
      { id: 12, name: "Final Test", comp: Lesson12 },
      { id: 13, name: "Final Story Mission", comp: Lesson13 }
    ]
  },
  A2: {
    name: "A2 Elementary",
    icon: "🔵",
    color: "from-blue-500 to-blue-700",
    lessons: [
      { id: 1, name: "Vergangenheit - Past", comp: A2Lesson1 },
      { id: 2, name: "Alltag - Daily Routine", comp: A2Lesson2 },
      { id: 3, name: "Essen - Food", comp: A2Lesson3 },
      { id: 4, name: "Arbeit - Job", comp: A2Lesson4 },
      { id: 5, name: "Wohnung", comp: A2Lesson5 },
      { id: 6, name: "Gesundheit", comp: A2Lesson6 },
      { id: 7, name: "Reisen", comp: A2Lesson7 },
      { id: 8, name: "Feste", comp: A2Lesson8 },
      { id: 9, name: "Einkaufen", comp: A2Lesson9 },
      { id: 10, name: "Medien", comp: A2Lesson10 },
      { id: 11, name: "Umwelt", comp: A2Lesson11 },
      { id: 12, name: "Pläne - Future", comp: A2Lesson12 },
      { id: 13, name: "Abdul & Faraz Story", comp: A2Lesson13 }
    ]
  },
  B1: { name: "B1 Intermediate", icon: "🟡", color: "from-yellow-500 to-yellow-700", lessons: [] },
  B2: { name: "B2 Upper-Int", icon: "🟠", color: "from-orange-500 to-orange-700", lessons: [] },
  C1: { name: "C1 Advanced", icon: "🔴", color: "from-red-500 to-red-700", lessons: [] },
  C2: { name: "C2 Mastery", icon: "🟣", color: "from-purple-500 to-purple-700", lessons: [] }
};

export default function Home() {
  const [view, setView] = useState<'levels' | 'lessons' | 'lesson' | 'certificate'>('levels');
  const [activeLevel, setActiveLevel] = useState('A1');
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<{[key: string]: number[]}>({
    A1: [], A2: [], B1: [], B2: [], C1: [], C2: []
  });

  // LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('german_progress_v2');
    if (saved) setCompletedLessons(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('german_progress_v2', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const completeLesson = (id: number) => {
    setCompletedLessons(prev => ({
     ...prev,
      [activeLevel]: [...new Set([...prev[activeLevel], id])]
    }));
    setView('lessons');
    setActiveLesson(0);
  };

  // Lesson View
  if (view === 'lesson') {
    const lesson = levels[activeLevel as keyof typeof levels].lessons.find(l => l.id === activeLesson);
    if (!lesson) return null;
    const ActiveComp = lesson.comp;
    return <ActiveComp onComplete={() => completeLesson(activeLesson)} />;
  }

  // Certificate View
  if (view === 'certificate') {
    return <Certificate onBack={() => setView('lessons')} />;
  }

  // Lessons View
  if (view === 'lessons') {
    const levelData = levels[activeLevel as keyof typeof levels];
    const isUnlocked = activeLevel === 'A1' || completedLessons['A1'].length >= 13; // 13 kiya kyunki A1 me 0-13 = 14 lessons

    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setView('levels')}
            className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
          >
            ← All Levels
          </button>

          <div className={`bg-gradient-to-r ${levelData.color} p-8 rounded-3xl mb-8`}>
            <p className="text-6xl mb-3">{levelData.icon}</p>
            <h1 className="text-4xl font-bold mb-2">{levelData.name}</h1>
            <p className="text-white/80">
              {completedLessons[activeLevel].length}/{levelData.lessons.length} Lessons Complete
            </p>
            <div className="w-full bg-black/30 rounded-full h-2 mt-4">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{width: `${(completedLessons[activeLevel].length/levelData.lessons.length)*100}%`}}
              ></div>
            </div>
          </div>

          {/* Certificate - A1 ke liye 13, A2 ke liye 11 */}
          {((activeLevel === 'A1' && completedLessons.A1.length >= 13) ||
            (activeLevel === 'A2' && completedLessons.A2.length >= 11)) && (
            <button
              onClick={() => setView('certificate')}
              className="w-full mb-6 bg-yellow-600 hover:bg-yellow-700 p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
            >
              🏆 {activeLevel} Certificate Download
            </button>
          )}

          {!isUnlocked && activeLevel!== 'A1' && (
            <div className="bg-yellow-900/30 border-yellow-600 p-4 rounded-xl mb-6 text-center">
              🔒 A2 unlock karne ke liye A1 ke 13/14 lessons complete karo
            </div>
          )}

          <div className="space-y-3">
            {levelData.lessons.map((lesson) => {
              const isCompleted = completedLessons[activeLevel].includes(lesson.id);
              let isLocked = false;

              if (!isUnlocked && activeLevel!== 'A1') {
                isLocked = true;
              } else {
                // Sequential lock logic - Lesson 0 hamesha unlock
                if (lesson.id === 0) {
                  isLocked = false;
                } else {
                  isLocked =!completedLessons[activeLevel].includes(lesson.id - 1);
                }
                // Final Story lock
                if (lesson.id === 13) {
                  isLocked = completedLessons[activeLevel].length < levelData.lessons.length - 1;
                }
              }

              return (
                <button
                  key={lesson.id}
                  disabled={isLocked}
                  onClick={() => {
                    setActiveLesson(lesson.id);
                    setView('lesson');
                  }}
                  className={`w-full p-5 rounded-2xl text-left transition ${
                    isLocked
                    ? 'bg-gray-900 opacity-40 cursor-not-allowed'
                      : isCompleted
                    ? 'bg-gray-800 border-2 border-green-500 hover:bg-gray-700'
                      : 'bg-gray-800 hover:bg-gray-700 border-2 border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-sm text-gray-400">Lesson {lesson.id}</p>
                        {isCompleted && <span className="text-green-400 text-sm">✓ Complete</span>}
                      </div>
                      <p className="text-xl font-bold">{lesson.name}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {isLocked? '🔒 Locked' : isCompleted? '▶️ Review' : '▶️ Start'}
                      </p>
                    </div>
                    <div className="text-3xl">
                      {isCompleted? '🎉' : isLocked? '🔒' : '→'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Levels View
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">German Mit Fun DE</h1>
          <p className="text-xl text-gray-400">A1 to C2 - Interactive Learning</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {Object.entries(levels).map(([key, data]) => {
            const isUnlocked = key === 'A1' || completedLessons['A1'].length >= 13;
            const progress = completedLessons[key].length;
            const total = data.lessons.length;

            return (
              <button
                key={key}
                disabled={!isUnlocked}
                onClick={() => {
                  setActiveLevel(key);
                  setView('lessons');
                }}
                className={`relative bg-gradient-to-br ${data.color} p-8 rounded-3xl text-left transition ${
                !isUnlocked
                  ? 'opacity-30 cursor-not-allowed'
                    : 'hover:scale-105 active:scale-95 shadow-xl'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-4 right-4 text-3xl">🔒</div>
                )}

                <p className="text-5xl mb-4">{data.icon}</p>
                <h2 className="text-3xl font-bold mb-2">{key}</h2>
                <p className="text-white/90 mb-4">{data.name}</p>

                <div className="bg-black/30 rounded-full h-2 mb-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all"
                    style={{width: `${total > 0? (progress/total)*100 : 0}%`}}
                  ></div>
                </div>
                <p className="text-sm text-white/80">{progress}/{total} Complete</p>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>💡 Sequential learning: Lesson 0 se start, har lesson pichla complete karne pe unlock</p>
        </div>
      </div>
    </div>
  );
}