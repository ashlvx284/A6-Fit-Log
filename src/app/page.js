'use client';

import Image from 'next/image';
import WorkoutCard from '@/components/WorkoutCard';
import { useFit } from '@/context/FitContext';

export default function Home() {
  const { workouts } = useFit();

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <div className="bg-[#16181d] border border-slate-800/80 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            TRAIN WITH INTENT. <br /> LOG EVERY SET.
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work add up.
          </p>
          <div>
            <button className="bg-[#ccff00] hover:bg-[#b8e600] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded transition-colors">
              BROWSE WORKOUTS
            </button>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative w-full md:w-[320px] h-48 md:h-56">
          <Image
            src="/assets/banner.png"
            alt="FitLog Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Library Grid Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider">
            THE LIBRARY
          </h2>
          <p className="text-xs text-slate-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* 3 Columns Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
}
