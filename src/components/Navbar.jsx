'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useFit } from '@/context/FitContext';

export default function Navbar() {
  const { routine } = useFit();

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-wide text-emerald-400">
            FitLog
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-emerald-400 transition-colors font-medium text-sm sm:text-base"
          >
            Home
          </Link>
          
          <Link
            href="/my-routine"
            className="relative hover:text-emerald-400 transition-colors font-medium text-sm sm:text-base"
          >
            My Routine
            {routine.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-emerald-500 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {routine.length}
              </span>
            )}
          </Link>

          <Link
            href="/add-workout"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold px-4 py-1.5 rounded-lg text-sm transition-all"
          >
            + Add Workout
          </Link>
        </div>

      </div>
    </nav>
  );
}