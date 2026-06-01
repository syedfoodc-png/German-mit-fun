'use client';

import { useState, useEffect } from 'react';
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
import Certificate from '../components/Certificate';

// A1 ke 14 lessons ke naam - yaha edit karna hai
const a1LessonNames = [
  'Alphabet - A to Z', // Lesson 0
  'Greetings & Hallo', // Lesson 1
  'Numbers 1-20', // Lesson 2
  'Pronunciation', // Lesson 3
  'Family Members', // Lesson 4
  'Days & Months', // Lesson 5
  'Colors', // Lesson 6
  'Common Verbs', // Lesson 7
  'Food & Drinks', // Lesson 8
  'Shopping', // Lesson 9
  'Time & Clock', // Lesson 10
  'Directions', // Lesson 11
  'Weather', // Lesson 12
  'Travel Basics' // Lesson 13
];

// Saare lesson components array me
const a1Lessons = [
  Lesson0, Lesson1, Lesson2, Lesson3, Lesson4,
  Lesson5, Lesson6, Lesson7, Lesson8, Lesson9,
  Lesson10, Lesson11, Lesson12, Lesson13
];

export default function Home() {
  const [view, setView] = useState<'levels' | 'lessons' | 'lesson'>('levels');
  const [activeLevel, setActiveLevel] = useState<string>('A1');
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Lesson complete hone pe score + next lesson unlock
  const handleLessonComplete = (points: number) => {
    setScore(score + points);
    if (completedLessons < a1Lessons.length - 1) {
      setCompletedLessons(completedLessons + 1);
    }
    setView('lessons');
  };

  // Certificate dikhane ka logic
  if (activeLevel === 'A1' && completedLessons >= a1Lessons.length) {
    return (
      <Certificate
        score={score}
        onBack={() => {
          setView('levels');
          setActiveLevel('');
        }}
      />
    );
  }

  // Lesson component kholne ka logic
  if (view === 'lesson') {
    const CurrentLesson = a1Lessons[activeLessonIndex];
    return (
      <CurrentLesson onComplete={handleLessonComplete} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">

      {/* Score Pill - Upar right me */}
      <div className="fixed top-6 right-6 bg-white/10 backdrop-blur border-white/20 rounded-full px-6 py-3">
        <span className="text-white font-bold text-lg">Score: {score}</span>
      </div>

      {/* LEVELS SCREEN */}
  {view === 'levels' && (
  <div className="max-w-5xl mx-auto text-center pt-12">
    <h1 className="text-5xl font-black text-white mb-3">German Mit Fun</h1>
    <p className="text-slate-300 text-lg mb-12">Learn German the fun way 🎯</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* A1 Card - Chota size */}
      <div
        onClick={() => {setActiveLevel('A1'); setView('lessons');}}
        className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl"
      >
        <div className="text-4xl mb-3">🎯</div>
        <h2 className="text-2xl font-black text-white mb-1">A1</h2>
        <p className="text-white/90 text-sm">Beginner</p>
        <p className="text-white/70 text-xs mt-3">{completedLessons}/14 Complete</p>
      </div>

      {/* A2 Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl opacity-50 cursor-not-allowed">
        <div className="text-4xl mb-3">🚀</div>
        <h2 className="text-2xl font-black text-white mb-1">A2</h2>
        <p className="text-white/90 text-sm">Elementary</p>
        <p className="text-white/70 text-xs mt-3">Coming Soon</p>
      </div>

      {/* B1 Card */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-2xl opacity-50 cursor-not-allowed">
        <div className="text-4xl mb-3">⚡</div>
        <h2 className="text-2xl font-black text-white mb-1">B1</h2>
        <p className="text-white/90 text-sm">Intermediate</p>
        <p className="text-white/70 text-xs mt-3">Coming Soon</p>
      </div>

      {/* B2 Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-2xl opacity-50 cursor-not-allowed">
        <div className="text-4xl mb-3">🔥</div>
        <h2 className="text-2xl font-black text-white mb-1">B2</h2>
        <p className="text-white/90 text-sm">Upper Intermediate</p>
        <p className="text-white/70 text-xs mt-3">Coming Soon</p>
      </div>

      {/* C1 Card */}
      <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-8 rounded-2xl opacity-50 cursor-not-allowed">
        <div className="text-4xl mb-3">👑</div>
        <h2 className="text-2xl font-black text-white mb-1">C1</h2>
        <p className="text-white/90 text-sm">Advanced</p>
        <p className="text-white/70 text-xs mt-3">Coming Soon</p>
      </div>

      {/* C2 Card */}
      <div className="bg-gradient-to-br from-slate-600 to-gray-800 p-8 rounded-2xl opacity-50 cursor-not-allowed">
        <div className="text-4xl mb-3">💎</div>
        <h2 className="text-2xl font-black text-white mb-1">C2</h2>
        <p className="text-white/90 text-sm">Proficiency</p>
        <p className="text-white/70 text-xs mt-3">Coming Soon</p>
      </div>

    </div>
  </div>
)}

      {/* LESSONS LIST SCREEN - Yaha naam dikhenge */}
      {view === 'lessons' && (
        <div className="max-w-3xl mx-auto pt-20">
          <button
            onClick={() => setView('levels')}
            className="text-white/70 hover:text-white mb-8 text-lg"
          >
            ← Back to Levels
          </button>

          <h2 className="text-5xl font-black text-white mb-4 text-center">A1 - Beginner</h2>
          <p className="text-slate-300 text-center mb-12">Complete lessons one by one</p>

          <div className="grid grid-cols-1 gap-4">
            {a1LessonNames.map((lessonName, index) => {
              const isCompleted = index < completedLessons;
              const isCurrent = index === completedLessons;
              const isLocked = index > completedLessons;

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!isLocked) {
                      setActiveLessonIndex(index);
                      setView('lesson');
                    }
                  }}
                  className={`p-6 rounded-2xl border backdrop-blur transition-all duration-300 ${
                    isCompleted
                     ? 'bg-emerald-500/20 border-emerald-500/50 cursor-pointer hover:scale-105'
                      : ''
                  } ${
                    isCurrent
                     ? 'bg-cyan-500/20 border-cyan-500/50 cursor-pointer hover:scale-105 animate-pulse shadow-[0_0_30px_rgba(56,189,248,0.5)]'
                      : ''
                  } ${
                    isLocked
                     ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Lesson {index}</div>
                      <div className="text-white font-bold text-xl">{lessonName}</div>
                    </div>
                    <div className="text-4xl">
                      {isCompleted && '✅'}
                      {isCurrent && '▶️'}
                      {isLocked && '🔒'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}