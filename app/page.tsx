'use client';
import { useState } from 'react';

// A1 Components
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
import A1Certificate from '../components/Certificate';

// A2 Components
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

type LevelKey = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

const levels: Record<LevelKey, { name: string; emoji: string; lessons: number; gradient: string }> = {
  A1: { name: 'Beginner', emoji: '🎯', lessons: 14, gradient: 'from-emerald-400 via-teal-400 to-cyan-400' },
  A2: { name: 'Elementary', emoji: '📚', lessons: 13, gradient: 'from-blue-400 via-sky-400 to-cyan-400' },
  B1: { name: 'Intermediate', emoji: '🗣️', lessons: 0, gradient: 'from-orange-400 via-amber-400 to-yellow-400' },
  B2: { name: 'Upper Int', emoji: '💬', lessons: 0, gradient: 'from-rose-400 via-pink-400 to-fuchsia-400' },
  C1: { name: 'Advanced', emoji: '🎓', lessons: 0, gradient: 'from-purple-400 via-violet-400 to-indigo-400' },
  C2: { name: 'Mastery', emoji: '👑', lessons: 0, gradient: 'from-indigo-400 via-purple-400 to-pink-400' },
};

const a1LessonNames = ['Intro', 'Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5', 'Lesson 6', 'Lesson 7', 'Lesson 8', 'Lesson 9', 'Lesson 10', 'Lesson 11', 'Lesson 12', 'Lesson 13'];
const a2LessonNames = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5', 'Lesson 6', 'Lesson 7', 'Lesson 8', 'Lesson 9', 'Lesson 10', 'Lesson 11', 'Lesson 12', 'Lesson 13'];

export default function Home() {
  const [view, setView] = useState<'dashboard' | 'lessons' | 'lesson'>('dashboard');
  const [activeLevel, setActiveLevel] = useState<LevelKey>('A1');
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<LevelKey, number>>({A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0});

  const handleLessonComplete = () => {
    setCompletedLessons(prev => ({...prev, [activeLevel]: prev[activeLevel] + 1 }));
    setScore(prev => prev + 10);
    setView('lessons');
  };

  if (view === 'lesson') {
    if (activeLevel === 'A1') {
      const a1Components = [<Lesson0 onComplete={handleLessonComplete} />, <Lesson1 onComplete={handleLessonComplete} />, <Lesson2 onComplete={handleLessonComplete} />, <Lesson3 onComplete={handleLessonComplete} />, <Lesson4 onComplete={handleLessonComplete} />, <Lesson5 onComplete={handleLessonComplete} />, <Lesson6 onComplete={handleLessonComplete} />, <Lesson7 onComplete={handleLessonComplete} />, <Lesson8 onComplete={handleLessonComplete} />, <Lesson9 onComplete={handleLessonComplete} />, <Lesson10 onComplete={handleLessonComplete} />, <Lesson11 onComplete={handleLessonComplete} />, <Lesson12 onComplete={handleLessonComplete} />, <Lesson13 onComplete={handleLessonComplete} />];

      if (activeLessonIndex >= 14) {
        // CERTIFICATE - dono prop bhej diye taaki error na aaye
        return <A1Certificate score={score} onBack={() => setView('dashboard')} onClick={() => setView('dashboard')} />;
      }

      return (
        <div>
          <button onClick={() => setView('lessons')} className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-xl">← Back</button>
          {a1Components[activeLessonIndex]}
        </div>
      );
    }

    if (activeLevel === 'A2') {
      const a2Components = [<A2Lesson1 onComplete={handleLessonComplete} />, <A2Lesson2 onComplete={handleLessonComplete} />, <A2Lesson3 onComplete={handleLessonComplete} />, <A2Lesson4 onComplete={handleLessonComplete} />, <A2Lesson5 onComplete={handleLessonComplete} />, <A2Lesson6 onComplete={handleLessonComplete} />, <A2Lesson7 onComplete={handleLessonComplete} />, <A2Lesson8 onComplete={handleLessonComplete} />, <A2Lesson9 onComplete={handleLessonComplete} />, <A2Lesson10 onComplete={handleLessonComplete} />, <A2Lesson11 onComplete={handleLessonComplete} />, <A2Lesson12 onComplete={handleLessonComplete} />, <A2Lesson13 onComplete={handleLessonComplete} />];

      if (activeLessonIndex >= 13) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center p-8">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md">
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">A2 Level Complete!</h2>
              <p className="text-slate-600 text-xl mb-6">Final Score: {score}</p>
              <button onClick={() => setView('dashboard')} className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">Back to Dashboard</button>
            </div>
          </div>
        );
      }

      return (
        <div>
          <button onClick={() => setView('lessons')} className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-xl">← Back</button>
          {a2Components[activeLessonIndex]}
        </div>
      );
    }
  }

  if (view === 'lessons') {
    const levelData = levels[activeLevel];
    const completed = completedLessons[activeLevel];
    const progress = (completed / levelData.lessons) * 100;
    const lessonNames = activeLevel === 'A1'? a1LessonNames : a2LessonNames;

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-blue-950 to-slate-950"></div>
        <div className="relative z-10 p-6 md:p-12">
          <button onClick={() => setView('dashboard')} className="text-white/70 hover:text-white mb-8 text-lg">← Back to Levels</button>

          <div className="text-center mb-12">
            <div className="text-7xl mb-4">{levelData.emoji}</div>
            <h1 className="text-5xl font-black text-white mb-2">Level {activeLevel}</h1>
            <p className="text-xl text-gray-400 mb-6">{levelData.name}</p>
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-white mb-2">
                <span>Progress</span>
                <span>{completed}/{levelData.lessons} Lessons</span>
              </div>
              <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                <div className={`h-3 rounded-full bg-gradient-to-r ${levelData.gradient}`} style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {lessonNames.map((lessonName, index) => {
              const isCompleted = index < completed;
              const isCurrent = index === completed;
              const isLocked = index > completed;

              return (
                <div key={index} onClick={() => {if (!isLocked) {setActiveLessonIndex(index); setView('lesson');}}}
                  className={`p-6 rounded-2xl border backdrop-blur ${isCompleted? 'bg-emerald-500/20 border-emerald-500/50 cursor-pointer hover:scale-105' : ''} ${isCurrent? 'bg-cyan-500/20 border-cyan-500/50 cursor-pointer hover:scale-105 animate-pulse' : ''} ${isLocked? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed' : ''} transition-all duration-300`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/50 text-sm mb-1">Lesson {index}</div>
                      <div className="text-white font-bold text-lg">{lessonName}</div>
                    </div>
                    <div className="text-3xl">{isCompleted && '✅'}{isCurrent && '▶️'}{isLocked && '🔒'}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {completed >= levelData.lessons && (
            <div className="text-center mt-12">
              <button onClick={() => {setActiveLessonIndex(levelData.lessons); setView('lesson');}} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition">
                {activeLevel === 'A1'? 'Get Certificate 🏆' : 'Complete Level 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-blue-950 to-slate-950"></div>
        <div className="absolute top-10 -left-20 w-[700px] h-[700px] bg-emerald-500/40 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-10 -right-20 w-[700px] h-[700px] bg-blue-500/40 rounded-full blur-[180px] animate-pulse"></div>
      </div>
      <div className="relative z-10 p-6 md:p-16">
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white mb-4">German Mit Fun</h1>
          <p className="text-xl text-gray-300 font-medium mb-6">Master German step by step 🇩🇪</p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
            <span className="text-yellow-400 text-2xl">⭐</span>
            <span className="text-white font-bold text-lg">Score: {score}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.entries(levels).map(([key, data]) => {
            const levelKey = key as LevelKey;
            const isUnlocked = levelKey === 'A1' || completedLessons['A1'] >= 5;
            const completed = completedLessons[levelKey];
            const progress = data.lessons > 0? (completed / data.lessons) * 100 : 0;
            return (
              <div key={key} onClick={() => {if (isUnlocked) {setActiveLevel(levelKey); setView('lessons');}}}
                className={`relative group bg-white/5 backdrop-blur-xl rounded-3xl p-10 border-white/10 ${isUnlocked? 'hover:border-white/40 hover:shadow-[0_0_50px_rgba(56,189,248,0.3)] hover:-translate-y-2 cursor-pointer' : 'opacity-40 cursor-not-allowed'} transition-all duration-300`}>
                {!isUnlocked && <div className="absolute top-6 right-6 text-2xl bg-black/50 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center">🔒</div>}
                <div className={`text-8xl mb-6 ${!isUnlocked && 'grayscale'}`}>{data.emoji}</div>
                <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${data.gradient} mb-4 shadow-lg`}>
                  <span className="text-white font-black text-sm">LEVEL {key}</span>
                </div>
                <h2 className={`text-3xl font-black text-white mb-2 ${!isUnlocked && 'text-gray-500'}`}>{data.name}</h2>
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-300 mb-2 font-medium">
                    <span>Progress</span>
                    <span className="text-white">{completed}/{data.lessons}</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className={`h-3 rounded-full bg-gradient-to-r ${data.gradient}`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}