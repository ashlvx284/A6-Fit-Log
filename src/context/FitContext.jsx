'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FitContext = createContext();

const initialWorkouts = [
  {
    id: '1',
    name: 'Push-Ups',
    category: 'Upper Body',
    description: 'Standard chest and triceps push-up exercises.',
    duration: '15 mins',
    calories: 120,
    instructions: 'Keep body straight and lower chest near the floor.'
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Lower Body',
    description: 'Bodyweight squats targeting quads and glutes.',
    duration: '20 mins',
    calories: 150,
    instructions: 'Lower hips until thighs are parallel to the floor.'
  },
  {
    id: '3',
    name: 'Plank Hold',
    category: 'Core',
    description: 'Core stability isometric hold.',
    duration: '10 mins',
    calories: 60,
    instructions: 'Engage core and hold body in straight line.'
  }
];

export function FitProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fitlog_workouts');
    const savedRoutine = localStorage.getItem('fitlog_routine');

    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    } else {
      setWorkouts(initialWorkouts);
      localStorage.setItem('fitlog_workouts', JSON.stringify(initialWorkouts));
    }

    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine));
    }
  }, []);

  const saveRoutineToStorage = (updatedRoutine) => {
    setRoutine(updatedRoutine);
    localStorage.setItem('fitlog_routine', JSON.stringify(updatedRoutine));
  };

  const addToRoutine = (workout) => {
    const exists = routine.find((item) => item.id === workout.id);
    if (exists) {
      toast.error(`${workout.name} is already in your routine!`);
      return;
    }
    const updated = [...routine, workout];
    saveRoutineToStorage(updated);
    toast.success(`${workout.name} added to routine!`);
  };

  const removeFromRoutine = (id) => {
    const updated = routine.filter((item) => item.id !== id);
    saveRoutineToStorage(updated);
    toast.success('Workout removed from routine.');
  };

  const clearRoutine = () => {
    saveRoutineToStorage([]);
    toast.success('Routine cleared.');
  };

  const addCustomWorkout = (newWorkout) => {
    const updated = [...workouts, { ...newWorkout, id: Date.now().toString() }];
    setWorkouts(updated);
    localStorage.setItem('fitlog_workouts', JSON.stringify(updated));
    toast.success('New workout created successfully!');
  };

  return (
    <FitContext.Provider
      value={{
        workouts,
        routine,
        addToRoutine,
        removeFromRoutine,
        clearRoutine,
        addCustomWorkout
      }}
    >
      {children}
    </FitContext.Provider>
  );
}

export function useFit() {
  return useContext(FitContext);
}