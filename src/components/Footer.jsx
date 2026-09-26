import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#121417] border-t border-slate-800/80 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left side: Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-base font-black tracking-wider text-white uppercase">
            FitLog
          </span>
        </Link>

        {/* Right side: Copyright and slogan text */}
        <p className="text-xs text-slate-400 font-medium">
          &copy; 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}