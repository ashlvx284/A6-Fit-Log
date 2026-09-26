'use client';

import Image from 'next/image';
import { useFit } from '@/context/FitContext';
import WorkoutCard from '@/components/WorkoutCard';

export default function HomePage() {
  const { workouts } = useFit();

  return (
    <div className="space-y-10">
      {/* Banner Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-slate-800 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Track Your Workouts, <br />
            <span className="text-emerald-400">Reach Your Peak.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Explore hundreds of workouts, build your custom daily routines, and achieve your fitness goals step by step.
          </p>
        </div>

        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0">
          <Image
            src="/assets/banner.png"
            alt="FitLog Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Workout Grid Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white">Workout Library</h2>
          <span className="text-sm text-slate-400 font-medium">
            Total: {workouts.length} exercises
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  );
}
