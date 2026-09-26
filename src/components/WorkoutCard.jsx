'use client';

import Link from 'next/link';
import { useFit } from '@/context/FitContext';

export default function WorkoutCard({ workout }) {
  const { routine, addToRoutine, removeFromRoutine } = useFit();

  const isAdded = routine.some((item) => item.id === workout.id);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-emerald-500/50 transition-all">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{workout.name}</h3>
          <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
            {workout.category}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {workout.description}
        </p>
        <div className="flex gap-4 text-xs text-slate-300 font-medium mb-5">
          <span>⏱️ {workout.duration}</span>
          <span>🔥 {workout.calories} kcal</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
        <Link
          href={`/workout/${workout.id}`}
          className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Details
        </Link>

        {isAdded ? (
          <button
            onClick={() => removeFromRoutine(workout.id)}
            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addToRoutine(workout)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-900 text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}