'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

const fallbackWorkouts = [
  {
    id: '1',
    name: 'BARBELL BENCH PRESS',
    category: 'CHEST / ARMS',
    equipment: 'Barbell, Bench',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '8-10 reps',
    duration: '25 min',
    calories: '200 kcal',
    rating: 4.8,
    image: '/assets/banner.png',
    description: 'A compound push exercise targeting the chest, shoulders, and triceps.',
    instructions: [
      'Lie on the bench with your eyes under the bar.',
      'Grip the bar slightly wider than shoulder-width.',
      'Unrack the bar and lower it slowly to your mid-chest.',
      'Press the bar back up explosively to starting position.'
    ]
  },
  {
    id: '2',
    name: 'PULL-UP',
    category: 'BACK / ARMS',
    equipment: 'Pull-up Bar',
    difficulty: 'Advanced',
    sets: '3',
    reps: 'Max reps',
    duration: '15 min',
    calories: '120 kcal',
    rating: 4.7,
    image: '/assets/banner.png',
    description: 'An upper body compound exercise that builds back and arm strength.',
    instructions: [
      'Grab the pull-up bar with an overhand grip.',
      'Hang with your arms fully extended.',
      'Pull your chest up to the bar by driving your elbows down.',
      'Lower yourself back down with control.'
    ]
  },
  {
    id: '3',
    name: 'BACK SQUAT',
    category: 'LEGS / CORE',
    equipment: 'Barbell, Rack',
    difficulty: 'Advanced',
    sets: '4',
    reps: '6-8 reps',
    duration: '30 min',
    calories: '250 kcal',
    rating: 4.9,
    image: '/assets/banner.png',
    description: 'The king of lower body exercises for building leg and core strength.',
    instructions: [
      'Position the barbell across your upper back.',
      'Unrack and step back, feet shoulder-width apart.',
      'Descend by pushing your hips back and bending your knees.',
      'Drive through your heels to return to the starting position.'
    ]
  },
  {
    id: '4',
    name: 'OVERHEAD PRESS',
    category: 'SHOULDERS',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '8-10 reps',
    duration: '20 min',
    calories: '150 kcal',
    rating: 4.6,
    image: '/assets/banner.png',
    description: 'Build massive shoulder strength and stability.',
    instructions: [
      'Hold the barbell at shoulder height with a grip just outside shoulders.',
      'Brace your core and squeeze your glutes.',
      'Press the bar straight overhead until arms are locked out.',
      'Lower the bar back to the starting position safely.'
    ]
  },
  {
    id: '5',
    name: 'DUMBBELL BICEP CURL',
    category: 'ARMS',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    sets: '3',
    reps: '10-12 reps',
    duration: '12 min',
    calories: '80 kcal',
    rating: 4.3,
    image: '/assets/banner.png',
    description: 'Isolation movement for arm growth and definition.',
    instructions: [
      'Stand holding dumbbells at your sides with palms facing forward.',
      'Keep your elbows close to your torso.',
      'Curl the weights up toward your shoulders while contracting biceps.',
      'Lower slowly back to the starting position.'
    ]
  },
  {
    id: '6',
    name: 'HOLLOW-BODY PLANK',
    category: 'CORE',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    sets: '3',
    reps: '30-45s',
    duration: '10 min',
    calories: '60 kcal',
    rating: 4.5,
    image: '/assets/banner.png',
    description: 'A braced plank variation that trains anti-extension through the entire anterior core.',
    instructions: [
      'Set elbows under shoulders and squeeze glutes and quads.',
      'Tuck the pelvis so the lower back stays flat.',
      'Breathe into the brace without sagging the hips.',
      'Hold for the prescribed time, then rest and repeat.'
    ]
  },
  {
    id: '7',
    name: 'BURPEE',
    category: 'FULL BODY',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '10-15 reps',
    duration: '12 min',
    calories: '160 kcal',
    rating: 4.2,
    image: '/assets/banner.png',
    description: 'High-intensity full body conditioning.',
    instructions: [
      'Drop into a squat with your hands on the ground.',
      'Kick your feet back into a push-up position and perform a push-up.',
      'Jump your feet back to your hands.',
      'Explode upward into the air with arms overhead.'
    ]
  },
  {
    id: '8',
    name: 'CONVENTIONAL DEADLIFT',
    category: 'BACK / LEGS',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    sets: '3',
    reps: '5 reps',
    duration: '25 min',
    calories: '280 kcal',
    rating: 4.9,
    image: '/assets/banner.png',
    description: 'Ultimate total body pulling power movement.',
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot.',
      'Hinge at hips and bend knees to grip the bar.',
      'Keep your back flat, chest up, and pull the slack out of the bar.',
      'Drive through the floor to stand tall, locking out hips at the top.'
    ]
  },
  {
    id: '9',
    name: 'PUSH-UP',
    category: 'CHEST / ARMS',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    sets: '3',
    reps: '12-15 reps',
    duration: '10 min',
    calories: '90 kcal',
    rating: 4.5,
    image: '/assets/banner.png',
    description: 'Classic upper body bodyweight builder.',
    instructions: [
      'Get into a high plank position with hands slightly wider than shoulders.',
      'Lower your body until your chest nearly touches the floor.',
      'Keep your core tight and elbows tucked at a 45-degree angle.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: '10',
    name: 'WALKING LUNGE',
    category: 'LEGS',
    equipment: 'Dumbbells (optional)',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '10 reps/leg',
    duration: '15 min',
    calories: '170 kcal',
    rating: 4.4,
    image: '/assets/banner.png',
    description: 'Dynamic lower body unilateral movement.',
    instructions: [
      'Stand tall holding dumbbells by your sides.',
      'Step forward with one leg and lower your hips until both knees bend at 90 degrees.',
      'Push off with the back foot to step forward into the next lunge.',
      'Alternate legs continuously.'
    ]
  },
  {
    id: '11',
    name: 'RUSSIAN TWIST',
    category: 'CORE',
    equipment: 'Medicine Ball',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '20 reps',
    duration: '8 min',
    calories: '70 kcal',
    rating: 4.1,
    image: '/assets/banner.png',
    description: 'Oblique and rotational core strength.',
    instructions: [
      'Sit on the floor with knees bent and feet slightly lifted.',
      'Lean back slightly while keeping your spine straight.',
      'Hold a weight or medicine ball with both hands.',
      'Twist your torso to the right, then to the left to complete one rep.'
    ]
  },
  {
    id: '12',
    name: 'KETTLEBELL SWING',
    category: 'FULL BODY / SHOULDERS',
    equipment: 'Kettlebell',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '15 reps',
    duration: '15 min',
    calories: '200 kcal',
    rating: 4.7,
    image: '/assets/banner.png',
    description: 'Explosive hip hinge power and cardio endurance.',
    instructions: [
      'Stand with feet wider than shoulder-width, kettlebell on the floor in front.',
      'Hinge at the hips and grab the kettlebell with both hands.',
      'Hike the kettlebell back between your legs, then snap your hips forward.',
      'Swing the kettlebell up to chest height using explosive hip power.'
    ]
  }
];

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(fallbackWorkouts);
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_today_plan');
    const savedLater = localStorage.getItem('fitlog_saved');
    if (savedPlan) setTodayPlan(JSON.parse(savedPlan));
    if (savedLater) setSavedWorkouts(JSON.parse(savedLater));

    fetch('https://api.api-store.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Merge API data with fallback details if missing instructions/difficulty
          const merged = data.map((item) => {
            const match = fallbackWorkouts.find(
              (f) => String(f.id) === String(item.id) || f.name.toLowerCase() === item.name?.toLowerCase()
            );
            return {
              ...match,
              ...item,
              instructions: item.instructions || match?.instructions || [
                'Set up properly according to form guidelines.',
                'Maintain proper breathing and core engagement.',
                'Execute the movement with controlled tempo.',
                'Rest adequately between sets.'
              ],
              difficulty: item.difficulty || match?.difficulty || 'Intermediate',
              sets: item.sets || match?.sets || '3',
              reps: item.reps || match?.reps || '10 reps'
            };
          });
          setWorkouts(merged);
        }
      })
      .catch((err) => {
        console.warn('API fetch failed, using fallback workouts:', err);
      });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToTodayPlan = (workout) => {
    if (!todayPlan.some((item) => String(item.id) === String(workout.id))) {
      const updated = [...todayPlan, workout];
      setTodayPlan(updated);
      localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));
      showToast('Added to today\'s plan');
    } else {
      showToast('Already in today\'s plan');
    }
  };

  const removeFromRoutine = (id) => {
    const updated = todayPlan.filter((item) => String(item.id) !== String(id));
    setTodayPlan(updated);
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));
    showToast('Removed from plan');
  };

  const removeFromSaved = (id) => {
    const updated = savedWorkouts.filter((item) => String(item.id) !== String(id));
    setSavedWorkouts(updated);
    localStorage.setItem('fitlog_saved', JSON.stringify(updated));
    showToast('Removed from saved');
  };

  const clearRoutine = () => {
    setTodayPlan([]);
    localStorage.removeItem('fitlog_today_plan');
    showToast('Plan cleared');
  };

  const saveForLater = (workout) => {
    if (!savedWorkouts.some((item) => String(item.id) === String(workout.id))) {
      const updated = [...savedWorkouts, workout];
      setSavedWorkouts(updated);
      localStorage.setItem('fitlog_saved', JSON.stringify(updated));
      showToast('Saved for later');
    } else {
      showToast('Already saved');
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        todayPlan,
        routine: todayPlan,
        savedWorkouts,
        addToTodayPlan,
        removeFromRoutine,
        removeFromSaved,
        clearRoutine,
        saveForLater,
        toastMessage,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16181d] border border-slate-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="w-6 h-6 bg-[#ccff00] text-slate-950 rounded-full flex items-center justify-center font-black text-xs">
            ✓
          </span>
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}
    </WorkoutContext.Provider>
  );
}

export function useFit() {
  return useContext(WorkoutContext);
}

export function useWorkouts() {
  return useContext(WorkoutContext);
}