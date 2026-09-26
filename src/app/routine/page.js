'use client';

import Link from 'next/link';
import { useFit } from '@/context/FitContext';

export default function RoutinePage() {
  const { routine, removeFromRoutine, clearRoutine } = useFit();

  const totalCalories = routine.reduce((acc, item) => {
    const cal = parseInt(item.calories) || 0;
    return acc + cal;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">
            TODAY'S PLAN
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {routine.length} {routine.length === 1 ? 'exercise' : 'exercises'} selected
          </p>
        </div>

        {routine.length > 0 && (
          <button
            onClick={clearRoutine}
            className="text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {routine.length === 0 ? (
        <div className="bg-[#16181d] border border-slate-800/80 rounded-2xl p-12 text-center space-y-4">
          <p className="text-slate-400 text-sm">Your plan is empty right now.</p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-colors"
          >
            Browse Workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* List */}
          <div className="space-y-3">
            {routine.map((item) => (
              <div
                key={item.id}
                className="bg-[#16181d] border border-slate-800/80 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mt-1">
                    <span>⏱ {item.duration}</span>
                    <span>🔥 {item.calories}</span>
                    <span>🏋️ {item.equipment}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromRoutine(item.id)}
                  className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="bg-[#181a1f] border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ESTIMATED TOTAL BURN
            </span>
            <span className="text-lg font-black text-lime-400">
              {totalCalories} kcal
            </span>
          </div>
        </div>
      )}
    </div>
  );
}