import { FitProvider } from '@/context/FitContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'FitLog - Workout Library & Planner',
  description: 'Track and plan your daily workouts effortlessly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitProvider>
          <Toaster position="top-right" />
          {children}
        </FitProvider>
      </body>
    </html>
  );
}