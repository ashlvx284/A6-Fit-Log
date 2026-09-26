'use client';

import Link from 'next/link';
import { useFit } from '@/context/FitContext';

export default function RoutinePage() {
  const { routine, removeFromRoutine, clearRoutine } = useFit();

  const totalCalories = routine.reduce(
    (acc, item) => acc + parseInt(item.calories || 0),
    0
  );

  if (routine.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-300">Your Routine is Empty!</h2>
        <p className="text-slate-400">
          You haven't added any workouts to your routine yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          Explore Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Daily Routine</h1>
          <p className="text-slate-400 text-sm mt-1">
            Total {routine.length} exercise{routine.length > 1 ? 's' : ''} planned
          </p>
        </div>

        <button
          onClick={clearRoutine}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Routine List */}
      <div className="space-y-4">
        {routine.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-1">
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {item.category}
              </span>
              <h3 className="text-lg font-bold text-white">{item.name}</h3>
              <div className="flex gap-4 text-xs text-slate-400">
                <span>⏱️ {item.duration}</span>
                <span>🔥 {item.calories} kcal</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link
                href={`/workout/${item.id}`}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-3 py-2 rounded-lg transition-colors"
              >
                View
              </Link>
              <button
                onClick={() => removeFromRoutine(item.id)}
                className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-medium px-3 py-2 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-emerald-950/30 to-slate-900">
        <div>
          <h4 className="text-slate-400 text-sm font-medium">Estimated Total Energy</h4>
          <p className="text-2xl font-extrabold text-emerald-400">
            🔥 {totalCalories} kcal
          </p>
        </div>
        <Link
          href="/"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-colors text-sm w-full sm:w-auto text-center"
        >
          Add More Exercises
        </Link>
      </div>
    </div>
  );
}