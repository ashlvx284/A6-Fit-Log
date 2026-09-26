'use client';

import { useState } from 'react';
import { useFit } from '@/context/FitContext';
import Link from 'next/link';

export default function MyPlanPage() {
  const { todayPlan, savedWorkouts } = useFit();
  const [activeTab, setActiveTab] = useState('today');
  const [sortBy, setSortBy] = useState('duration');

  const currentList = activeTab === 'today' ? (todayPlan || []) : (savedWorkouts || []);

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') return (b.duration || 0) - (a.duration || 0);
    if (sortBy === 'calories') return (b.caloriesBurned || b.calories || 0) - (a.caloriesBurned || a.calories || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
    return 0;
  });

  const totalMinutes = currentList.reduce((acc, curr) => acc + (Number(curr.duration) || 15), 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + (Number(curr.caloriesBurned || curr.calories) || 100), 0);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wide">My Plan</h1>
          <p className="text-slate-400 text-sm mt-1">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#16181d] border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs uppercase text-slate-400 font-bold">Exercises</p>
            <p className="text-3xl font-black text-[#ccff00] mt-2">{currentList.length}</p>
          </div>
          <div className="bg-[#16181d] border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs uppercase text-slate-400 font-bold">Minutes</p>
            <p className="text-3xl font-black text-white mt-2">{totalMinutes}</p>
          </div>
          <div className="bg-[#16181d] border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs uppercase text-slate-400 font-bold">Calories</p>
            <p className="text-3xl font-black text-white mt-2">{totalCalories}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-[#16181d] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-5 py-2 text-xs font-black uppercase rounded-lg transition-all ${activeTab === 'today' ? 'bg-[#ccff00] text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-2 text-xs font-black uppercase rounded-lg transition-all ${activeTab === 'saved' ? 'bg-[#ccff00] text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-slate-400">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#16181d] border border-slate-800 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="bg-[#16181d] border border-slate-800 rounded-3xl p-16 text-center space-y-4">
            <h3 className="text-xl font-black uppercase tracking-wider">Nothing Here Yet</h3>
            <p className="text-slate-400 text-sm">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="inline-block bg-[#ccff00] text-slate-950 font-extrabold px-6 py-3 rounded-xl uppercase text-xs tracking-wider">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedList.map((item, idx) => (
              <div key={idx} className="bg-[#16181d] border border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-black uppercase text-lg">{item.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                <div className="flex justify-between text-xs font-bold text-slate-300 border-t border-slate-800 pt-3">
                  <span>Duration: {item.duration || 15}m</span>
                  <span>Calories: {item.caloriesBurned || item.calories || 100} kcal</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}