'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFit } from '@/context/FitContext';

export default function WorkoutDetailsPage({ params }) {
  const { id } = use(params);
  const { workouts, routine, addToRoutine, removeFromRoutine } = useFit();

  const workout = workouts.find((item) => item.id === parseInt(id));
  const isAdded = routine.some((item) => item.id === workout?.id);

  if (!workout) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-red-400">Workout Not Found!</h2>
        <p className="text-slate-400">The workout you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm font-medium transition-colors"
      >
        ← Back to Workouts
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20 mb-2 inline-block">
              {workout.category}
            </span>
            <h1 className="text-3xl font-extrabold text-white">{workout.name}</h1>
          </div>

          {isAdded ? (
            <button
              onClick={() => removeFromRoutine(workout.id)}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold px-6 py-2.5 rounded-xl transition-colors w-full sm:w-auto"
            >
              Remove from Routine
            </button>
          ) : (
            <button
              onClick={() => addToRoutine(workout)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-colors w-full sm:w-auto"
            >
              + Add to Routine
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-xs text-slate-500 block">Duration</span>
            <span className="text-lg font-bold text-slate-200">⏱️ {workout.duration}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Calories Burned</span>
            <span className="text-lg font-bold text-slate-200">🔥 {workout.calories} kcal</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Description</h3>
          <p className="text-slate-300 leading-relaxed">{workout.description}</p>
        </div>

        {workout.instructions && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
              {workout.instructions.map((step, index) => (
                <li key={index} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}