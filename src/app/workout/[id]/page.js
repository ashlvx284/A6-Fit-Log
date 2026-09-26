'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useFit } from '@/context/FitContext';

export default function WorkoutDetail() {
  const params = useParams();
  const id = params?.id;

  const { addToTodayPlan, saveForLater } = useFit();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Updated to the new alternative API link
    fetch('https://api.api-store.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item, index) => 
          String(item.id) === String(id) || 
          String(item._id) === String(id) || 
          String(index + 1) === String(id) ||
          String(index) === String(id)
        );
        
        setWorkout(found || data[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workout:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-white flex items-center justify-center">
        <p className="text-lime-400 font-bold text-lg">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-white flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-wider">Workout not found</h2>
        <Link href="/" className="bg-[#ccff00] text-slate-950 font-extrabold px-5 py-2.5 rounded-xl uppercase text-xs tracking-wider">
          Back to Workouts
        </Link>
      </div>
    );
  }

  // Safe formatting outside JSX
  const equipmentText = workout.equipment ? String(workout.equipment) : 'N/A';
  const difficultyText = workout.difficulty ? String(workout.difficulty) : 'Beginner';
  const setsText = workout.sets ? String(workout.sets) : '3';
  const repsText = workout.reps ? String(workout.reps) : '10-12';
  const durationText = workout.duration ? String(workout.duration) : '15 min';
  const caloriesText = workout.caloriesBurned ? workout.caloriesBurned + ' kcal' : (workout.calories ? String(workout.calories) : '100 kcal');
  const ratingText = workout.rating ? String(workout.rating) : '4.8';

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Side: Image */}
          <div className="relative w-full h-[450px] bg-[#16181d] rounded-3xl overflow-hidden border border-slate-800">
            <Image
              src={workout.image || '/assets/banner.png'}
              alt={workout.name || 'Workout'}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Details & Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-wide mb-2">
                {workout.name}
              </h1>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                {workout.description || 'A comprehensive workout designed to build strength and endurance.'}
              </p>
            </div>

            {/* Muscle Group Badge */}
            {workout.muscleGroups && workout.muscleGroups.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {workout.muscleGroups.map((muscle, idx) => (
                  <span key={idx} className="bg-[#ccff00] text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-md">
                    {muscle}
                  </span>
                ))}
              </div>
            )}

            {/* Stats Table / Box */}
            <div className="bg-[#16181d] border border-slate-800/80 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Equipment</span>
                <span className="text-white font-bold">{equipmentText}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Difficulty</span>
                <span className="text-white font-bold capitalize">{difficultyText}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Sets</span>
                <span className="text-white font-bold">{setsText}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Reps</span>
                <span className="text-white font-bold">{repsText}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Duration</span>
                <span className="text-white font-bold">{durationText}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Calories</span>
                <span className="text-white font-bold">{caloriesText}</span>
              </div>
              <div className="flex justify-between items-center px-6 py-4 text-sm font-semibold">
                <span className="text-slate-400 uppercase text-xs tracking-wider">Rating</span>
                <span className="text-white font-bold">{ratingText}</span>
              </div>
            </div>

            {/* Instructions Section */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-black uppercase tracking-wider">Instructions</h3>
                <ol className="space-y-2 text-slate-300 text-sm font-medium">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-lime-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => addToTodayPlan(workout)}
                className="flex-1 bg-[#ccff00] hover:bg-[#b3e600] text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all uppercase tracking-wider text-sm cursor-pointer"
              >
                Add to today&apos;s plan
              </button>
              <button 
                onClick={() => saveForLater(workout)}
                className="border border-slate-700 hover:border-slate-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm cursor-pointer"
              >
                Save for later
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}