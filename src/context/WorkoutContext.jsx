'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_today_plan');
    const savedLater = localStorage.getItem('fitlog_saved');
    if (savedPlan) setTodayPlan(JSON.parse(savedPlan));
    if (savedLater) setSavedWorkouts(JSON.parse(savedLater));
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToTodayPlan = (workout) => {
    if (!todayPlan.some((item) => item.id === workout.id)) {
      const updated = [...todayPlan, workout];
      setTodayPlan(updated);
      localStorage.setItem('fitlog_today_plan', JSON.stringify(updated));
      showToast('Added to today\'s plan');
    } else {
      showToast('Already in today\'s plan');
    }
  };

  const saveForLater = (workout) => {
    if (!savedWorkouts.some((item) => item.id === workout.id)) {
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
        todayPlan,
        savedWorkouts,
        addToTodayPlan,
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

export function useWorkouts() {
  return useContext(WorkoutContext);
}