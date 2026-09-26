'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkouts } from '@/context/FitContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = useWorkouts();
  const isActive = (path) => pathname === path;

  return (
    <header className="w-full bg-[#121417] border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/assets/logo.png" alt="Logo" width={28} height={28} className="w-7 h-7 object-contain" />
          <span className="text-lg font-black tracking-wider text-white uppercase">FITLOG</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className={`text-xs font-extrabold uppercase px-4 py-2 rounded-xl transition-all ${isActive('/') ? 'bg-[#ccff00] text-slate-950 font-black' : 'text-slate-300 hover:text-white'}`}>
            Workouts
          </Link>
          <Link href="/my-plan" className={`text-xs font-extrabold uppercase px-4 py-2 rounded-xl transition-all ${isActive('/my-plan') ? 'bg-[#ccff00] text-slate-950 font-black' : 'text-slate-300 hover:text-white'}`}>
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/my-plan" className="flex items-center gap-2 bg-[#1b1e24] hover:bg-[#22262e] border border-slate-800 px-3.5 py-1.5 rounded-full transition-all">
            <span className="text-xs font-bold text-white tracking-wide">Plan</span>
            <span className="w-6 h-6 bg-[#ccff00] text-slate-950 font-black text-xs rounded-full flex items-center justify-center">
              {todayPlan?.length || 0}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2 bg-[#1b1e24] hover:bg-[#22262e] border border-slate-800 px-3.5 py-1.5 rounded-full transition-all">
            <span className="text-xs font-bold text-white tracking-wide">Saved</span>
            <span className="w-6 h-6 bg-transparent border border-slate-600 text-white font-black text-xs rounded-full flex items-center justify-center">
              {savedWorkouts?.length || 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}