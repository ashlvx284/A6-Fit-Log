'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFit } from '@/context/FitContext';

export default function MyPlan() {
  const { todayPlan, routine, removeFromRoutine, savedWorkouts, removeFromSaved } = useFit();
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'saved'
  const [sortBy, setSortBy] = useState('duration');
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  const currentList = activeTab === 'plan' ? (todayPlan || routine || []) : (savedWorkouts || []);

  const toggleDone = (id) => {
    setCompletedWorkouts((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Parsing duration
  const parseDuration = (item) => {
    const raw = item.duration || item.time || item.mins;
    if (!raw) return 15;
    const num = parseInt(String(raw).replace(/[^0-9]/g, ''));
    return isNaN(num) ? 15 : num;
  };

  // Parsing calories (Updated to check caloriesBurned from API)
  const parseCalories = (item) => {
    const raw = item.caloriesBurned || item.calories || item.kcal || item.calorie;
    if (!raw) return 100;
    const num = parseInt(String(raw).replace(/[^0-9]/g, ''));
    return isNaN(num) ? 100 : num;
  };

  // Calculations
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + parseDuration(item), 0);
  const totalCalories = currentList.reduce((acc, item) => acc + parseCalories(item), 0);

  // Sorting
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      return parseDuration(a) - parseDuration(b);
    } else if (sortBy === 'calories') {
      return parseCalories(b) - parseCalories(a);
    } else if (sortBy === 'rating') {
      return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    }
    return 0;
  });

  const handleRemove = (id) => {
    if (activeTab === 'plan') {
      removeFromRoutine(id);
    } else {
      removeFromSaved(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider mb-2">MY PLAN</h1>
          <p className="text-slate-400 text-sm font-medium">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats Overview Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#16181d] border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 uppercase text-xs font-bold tracking-wider block mb-1">Exercises</span>
            <span className="text-4xl font-black text-[#ccff00]">{totalExercises}</span>
          </div>
          <div className="bg-[#16181d] border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 uppercase text-xs font-bold tracking-wider block mb-1">Minutes</span>
            <span className="text-4xl font-black text-white">{totalMinutes}</span>
          </div>
          <div className="bg-[#16181d] border border-slate-800 p-6 rounded-2xl">
            <span className="text-slate-400 uppercase text-xs font-bold tracking-wider block mb-1">Calories</span>
            <span className="text-4xl font-black text-white">{totalCalories}</span>
          </div>
        </div>

        {/* Tabs & Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <div className="flex bg-[#16181d] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-2 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'plan' ? 'bg-[#ccff00] text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-2 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all ${
                activeTab === 'saved' ? 'bg-[#ccff00] text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#16181d] border border-slate-800 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* List of Workouts */}
        <div className="space-y-4">
          {sortedList.length === 0 ? (
            <div className="bg-[#16181d] border border-slate-800 p-12 text-center rounded-2xl">
              <p className="text-slate-400 font-bold text-sm">No workouts added here yet.</p>
            </div>
          ) : (
            sortedList.map((workout) => {
              const isDone = completedWorkouts[workout.id];
              const durVal = parseDuration(workout);
              const calVal = parseCalories(workout);
              const displayDuration = `${durVal} min`;
              const displayCalories = `${calVal} kcal`;
              const displayRating = workout.rating || '4.8';

              return (
                <div
                  key={workout.id}
                  className="bg-[#16181d] border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
                >
                  {/* Left: Image & Info */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-24 h-20 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={workout.image || '/assets/banner.png'}
                        alt={workout.name || 'Workout'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-black uppercase tracking-wider text-white mb-1">
                        {workout.name}
                      </h3>
                      <p className="text-slate-400 text-xs font-semibold mb-2">
                        {workout.category || workout.equipment || 'Bodyweight'}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
                        <span>⏱ {displayDuration}</span>
                        <span>🔥 {displayCalories}</span>
                        <span>⭐ {displayRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="border border-slate-700 hover:border-slate-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => toggleDone(workout.id)}
                      className={`font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all ${
                        isDone ? 'bg-emerald-500 text-white' : 'bg-[#ccff00] hover:bg-[#b3e600] text-slate-950'
                      }`}
                    >
                      {isDone ? '✓ Completed' : 'Mark as Done'}
                    </button>

                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="w-9 h-9 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-xl flex items-center justify-center font-black transition-all cursor-pointer"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}