export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="text-emerald-400 font-semibold">FitLog</span>. All rights reserved.
        </p>
        <p className="text-xs text-slate-500">
          Build your strength, track your workouts, and hit your goals.
        </p>
      </div>
    </footer>
  );
}