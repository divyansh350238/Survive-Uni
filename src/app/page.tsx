'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { scenarios, Choice, Scenario } from '../data/scenarios';

export default function Home() {
  const [money, setMoney] = useState<number>(50);
  const [time, setTime] = useState<number>(50);
  const [sanity, setSanity] = useState<number>(50);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Swipe & gesture states
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activePointerIdRef = useRef<number | null>(null);

  const clampStat = (val: number): number => Math.max(0, Math.min(100, val));

  const isGameOver = money <= 0 || time <= 0 || sanity <= 0;
  const isWon = currentIndex >= scenarios.length && !isGameOver;
  const currentScenario: Scenario | undefined = scenarios[currentIndex];

  const handleChoice = useCallback((choice: Choice) => {
    setMoney((prev) => clampStat(prev + choice.impact.money));
    setTime((prev) => clampStat(prev + choice.impact.time));
    setSanity((prev) => clampStat(prev + choice.impact.sanity));
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const triggerSwipe = useCallback((direction: 'left' | 'right') => {
    if (!currentScenario || exitDirection) return;
    const choiceIndex = direction === 'left' ? 0 : 1;
    const choice = currentScenario.choices[choiceIndex];
    if (!choice) return;

    setExitDirection(direction);
    setTimeout(() => {
      handleChoice(choice);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
      setExitDirection(null);
    }, 220);
  }, [currentScenario, exitDirection, handleChoice]);

  // Pointer event handlers for card dragging
  const SWIPE_THRESHOLD = 80;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exitDirection) return;
    activePointerIdRef.current = e.pointerId;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== e.pointerId || exitDirection) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== e.pointerId) return;
    setIsDragging(false);
    activePointerIdRef.current = null;

    if (dragOffset.x < -SWIPE_THRESHOLD) {
      triggerSwipe('left');
    } else if (dragOffset.x > SWIPE_THRESHOLD) {
      triggerSwipe('right');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    activePointerIdRef.current = null;
    setDragOffset({ x: 0, y: 0 });
  };

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || isWon || !currentScenario || exitDirection) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        triggerSwipe('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        triggerSwipe('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, isWon, currentScenario, exitDirection, triggerSwipe]);

  const handleRestart = () => {
    setMoney(50);
    setTime(50);
    setSanity(50);
    setCurrentIndex(0);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setExitDirection(null);
  };

  const getGameOverReason = (): string => {
    if (money <= 0) return 'You ran out of Money! The landlord evicted you and you had to drop out.';
    if (time <= 0) return 'You ran out of Time! Extreme exhaustion caused you to miss critical finals.';
    if (sanity <= 0) return 'You ran out of Sanity! Burnout took over and you packed your bags.';
    return 'Game Over!';
  };

  const calculateFinalGrade = (): { grade: string; title: string } => {
    const avg = (money + time + sanity) / 3;
    if (avg >= 75) return { grade: 'A+', title: 'Balanced Legend' };
    if (avg >= 60) return { grade: 'A', title: 'Dean’s List Survivor' };
    if (avg >= 45) return { grade: 'B', title: 'Caffeinated Veteran' };
    if (avg >= 30) return { grade: 'C', title: 'Barely Scraped By' };
    return { grade: 'D', title: 'Academic Probation Miracle' };
  };

  // Compute card transforms & drag intensity
  const rotation = exitDirection === 'left' ? -20 : exitDirection === 'right' ? 20 : dragOffset.x * 0.08;
  const translateX = exitDirection === 'left' ? -600 : exitDirection === 'right' ? 600 : dragOffset.x;
  const translateY = exitDirection ? 0 : dragOffset.y * 0.2;
  const cardOpacity = exitDirection ? 0 : 1;

  const leftIntensity = Math.min(1, Math.max(0, -dragOffset.x / 75));
  const rightIntensity = Math.min(1, Math.max(0, dragOffset.x / 75));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="w-full max-w-2xl flex flex-col items-center text-center pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span>Semester Survival Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
          Survive Uni
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
          Balance your Money, Time, and Sanity across 10 campus dilemmas. Don&apos;t let any stat hit zero!
        </p>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center my-auto space-y-6">
        {/* Top Stat Bars */}
        <section
          aria-label="Student Stat Meters"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm shadow-xl"
        >
          {/* Money Meter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span>💰</span> Money
              </span>
              <span className="text-slate-300 font-mono">{money}/100</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                style={{ width: `${money}%` }}
              />
            </div>
          </div>

          {/* Time Meter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-sky-400">
                <span>⏰</span> Time
              </span>
              <span className="text-slate-300 font-mono">{time}/100</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                style={{ width: `${time}%` }}
              />
            </div>
          </div>

          {/* Sanity Meter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-pink-400">
                <span>🧠</span> Sanity
              </span>
              <span className="text-slate-300 font-mono">{sanity}/100</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-pink-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                style={{ width: `${sanity}%` }}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Screen View: In-Game Swipe vs Game Over vs Victory */}
        {!isGameOver && !isWon && currentScenario && (
          <div className="flex flex-col items-center w-full space-y-4">
            {/* Gesture Hint Bar */}
            <div className="flex items-center justify-between w-full px-2 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span>👈</span> Slide Left for Option A
              </span>
              <span className="hidden sm:inline-block text-slate-500 font-mono text-[11px]">
                (drag card or use ← &amp; → keys)
              </span>
              <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                Slide Right for Option B <span>👉</span>
              </span>
            </div>

            {/* Swipeable Card Stage */}
            <div className="relative w-full min-h-[400px] flex items-center justify-center select-none touch-none py-2">
              <article
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotation}deg)`,
                  opacity: cardOpacity,
                  transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
                  touchAction: 'none',
                }}
                className={`relative w-full bg-slate-900/95 border rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between cursor-grab active:cursor-grabbing transition-colors duration-150 ${
                  leftIntensity > 0.25
                    ? 'border-emerald-500/70 shadow-[0_0_35px_rgba(16,185,129,0.25)]'
                    : rightIntensity > 0.25
                    ? 'border-indigo-500/70 shadow-[0_0_35px_rgba(99,102,241,0.25)]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Dynamic Stamp Overlays While Dragging */}
                <div
                  style={{ opacity: leftIntensity }}
                  className="pointer-events-none absolute top-6 left-6 z-30 px-3.5 py-1.5 rounded-xl border-2 border-emerald-400 bg-emerald-950/90 text-emerald-300 font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg transform -rotate-12 transition-opacity"
                >
                  👈 OPTION A
                </div>

                <div
                  style={{ opacity: rightIntensity }}
                  className="pointer-events-none absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-xl border-2 border-indigo-400 bg-indigo-950/90 text-indigo-300 font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg transform rotate-12 transition-opacity"
                >
                  OPTION B 👉
                </div>

                {/* Scenario Header Tracker */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-900/60 px-2.5 py-1 rounded-md">
                    Scenario #{currentScenario?.id}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Step {currentIndex + 1} of {scenarios.length}
                  </span>
                </div>

                {/* Scenario Narrative */}
                <div className="py-6 flex-1 flex flex-col justify-center text-center">
                  <p className="text-lg sm:text-2xl font-medium text-slate-100 leading-relaxed sm:leading-normal">
                    {currentScenario?.description}
                  </p>
                </div>

                {/* Choice Preview Cards inside the scenario card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/70">
                  {/* Left Choice (Option A) */}
                  <div
                    className={`p-3.5 rounded-xl border transition-all duration-150 text-left ${
                      leftIntensity > 0.15
                        ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-100 shadow-inner'
                        : 'bg-slate-950/60 border-slate-800/70 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        👈 Option A (Left)
                      </span>
                      <div className="flex gap-1 text-[11px] font-mono">
                        {currentScenario.choices[0] && (
                          <>
                            <span className={currentScenario.choices[0].impact.money < 0 ? 'text-rose-400' : currentScenario.choices[0].impact.money > 0 ? 'text-emerald-400' : 'text-slate-500'}>
                              💰{currentScenario.choices[0].impact.money > 0 ? `+${currentScenario.choices[0].impact.money}` : currentScenario.choices[0].impact.money}
                            </span>
                            <span className={currentScenario.choices[0].impact.time < 0 ? 'text-rose-400' : currentScenario.choices[0].impact.time > 0 ? 'text-sky-400' : 'text-slate-500'}>
                              ⏰{currentScenario.choices[0].impact.time > 0 ? `+${currentScenario.choices[0].impact.time}` : currentScenario.choices[0].impact.time}
                            </span>
                            <span className={currentScenario.choices[0].impact.sanity < 0 ? 'text-rose-400' : currentScenario.choices[0].impact.sanity > 0 ? 'text-pink-400' : 'text-slate-500'}>
                              🧠{currentScenario.choices[0].impact.sanity > 0 ? `+${currentScenario.choices[0].impact.sanity}` : currentScenario.choices[0].impact.sanity}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-snug">
                      {currentScenario.choices[0]?.label}
                    </p>
                  </div>

                  {/* Right Choice (Option B) */}
                  <div
                    className={`p-3.5 rounded-xl border transition-all duration-150 text-left ${
                      rightIntensity > 0.15
                        ? 'bg-indigo-950/40 border-indigo-600/70 text-indigo-100 shadow-inner'
                        : 'bg-slate-950/60 border-slate-800/70 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Option B (Right) 👉
                      </span>
                      <div className="flex gap-1 text-[11px] font-mono">
                        {currentScenario.choices[1] && (
                          <>
                            <span className={currentScenario.choices[1].impact.money < 0 ? 'text-rose-400' : currentScenario.choices[1].impact.money > 0 ? 'text-emerald-400' : 'text-slate-500'}>
                              💰{currentScenario.choices[1].impact.money > 0 ? `+${currentScenario.choices[1].impact.money}` : currentScenario.choices[1].impact.money}
                            </span>
                            <span className={currentScenario.choices[1].impact.time < 0 ? 'text-rose-400' : currentScenario.choices[1].impact.time > 0 ? 'text-sky-400' : 'text-slate-500'}>
                              ⏰{currentScenario.choices[1].impact.time > 0 ? `+${currentScenario.choices[1].impact.time}` : currentScenario.choices[1].impact.time}
                            </span>
                            <span className={currentScenario.choices[1].impact.sanity < 0 ? 'text-rose-400' : currentScenario.choices[1].impact.sanity > 0 ? 'text-pink-400' : 'text-slate-500'}>
                              🧠{currentScenario.choices[1].impact.sanity > 0 ? `+${currentScenario.choices[1].impact.sanity}` : currentScenario.choices[1].impact.sanity}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-snug">
                      {currentScenario.choices[1]?.label}
                    </p>
                  </div>
                </div>

                {/* Drag Hint Footer */}
                <div className="text-center pt-3 text-[11px] text-slate-500 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
                  <span>Drag or flick the card horizontally</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
                </div>
              </article>
            </div>

            {/* Tap Triggers (Accessible Fallback Controls) */}
            <div className="grid grid-cols-2 gap-3 w-full pt-1">
              <button
                type="button"
                onClick={() => triggerSwipe('left')}
                className="group flex flex-col items-center text-center p-3.5 rounded-2xl border border-emerald-900/60 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-700 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-md"
              >
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <span>👈</span> Slide Left
                </span>
                <span className="text-xs text-slate-300 line-clamp-2">
                  {currentScenario.choices[0]?.label}
                </span>
              </button>

              <button
                type="button"
                onClick={() => triggerSwipe('right')}
                className="group flex flex-col items-center text-center p-3.5 rounded-2xl border border-indigo-900/60 bg-indigo-950/20 hover:bg-indigo-950/40 hover:border-indigo-700 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-md"
              >
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wider mb-1">
                  Slide Right <span>👉</span>
                </span>
                <span className="text-xs text-slate-300 line-clamp-2">
                  {currentScenario.choices[1]?.label}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <article className="bg-rose-950/30 border border-rose-900/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-5">
            <span className="text-4xl sm:text-5xl">💀</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-400 tracking-tight">
                Semester Failed
              </h2>
              <p className="text-sm sm:text-base text-rose-200/90 mt-2 max-w-md">
                {getGameOverReason()}
              </p>
            </div>

            <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-400 space-y-1">
              <p>
                Final Stats: Money: <span className="text-emerald-400 font-mono">{money}</span> | Time:{' '}
                <span className="text-sky-400 font-mono">{time}</span> | Sanity:{' '}
                <span className="text-pink-400 font-mono">{sanity}</span>
              </p>
              <p>Survived {currentIndex} of {scenarios.length} scenarios</p>
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              Try Next Semester
            </button>
          </article>
        )}

        {/* Victory / Report Card Screen */}
        {isWon && (
          <article className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-6">
            <span className="text-4xl sm:text-5xl">🎓</span>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                Official Report Card
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                You Survived The Semester!
              </h2>
              <p className="text-sm sm:text-base text-indigo-400 font-medium mt-1">
                Title Earned: {calculateFinalGrade().title}
              </p>
            </div>

            {/* Grade Display */}
            <div className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 shadow-inner">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Final Grade</span>
              <span className="text-3xl sm:text-4xl font-black text-indigo-300">
                {calculateFinalGrade().grade}
              </span>
            </div>

            {/* Stat Summary Breakdown */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400">Money</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{money}</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-800">
                <span className="text-xs text-slate-400">Time</span>
                <span className="text-base sm:text-lg font-bold text-sky-400 font-mono">{time}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400">Sanity</span>
                <span className="text-base sm:text-lg font-bold text-pink-400 font-mono">{sanity}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Re-enroll for Another Semester
            </button>
          </article>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-2xl text-center py-4 border-t border-slate-900 text-xs text-slate-500">
        Survive Uni &bull; Built with Next.js, TypeScript &amp; Tailwind CSS
      </footer>
    </main>
  );
}
