import Link from 'next/link';
import Image from 'next/image';

export default function WorkoutCard({ workout }) {
  return (
    <div className="bg-[#16181d] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl">
      {/* Workout Image */}
      {workout.image && (
        <div className="relative w-full h-48 bg-slate-900">
          <Image
            src={workout.image}
            alt={workout.name || 'Workout'}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
        <div>
          {/* Category / Muscle Group Badge */}
          <span className="text-xs font-extrabold text-[#ccff00] uppercase tracking-wider">
            {workout.category || workout.muscle || 'General'}
          </span>

          {/* Workout Title Link */}
          <Link href={`/workout/${workout.id}`}>
            <h3 className="text-lg font-black text-white hover:text-[#ccff00] transition-colors mt-1">
              {workout.name}
            </h3>
          </Link>

          {/* Equipment Info */}
          <p className="text-slate-400 text-xs font-medium mt-1">
            {workout.equipment || workout.bodyPart || 'Bodyweight'}
          </p>
        </div>

        {/* Card Footer with Duration, Calories and Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-300 font-semibold">
          <span>⏱ {workout.duration || '15 min'}</span>
          <span>🔥 {workout.caloriesBurned || workout.calories || 100} kcal</span>
          {workout.rating && (
            <span className="text-amber-400 font-bold">★ {workout.rating}</span>
          )}
        </div>
      </div>
    </div>
  );
}