import { FitProvider } from '@/context/FitContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'FitLog - Workout Library & Planner',
  description: 'Track and plan your daily workouts effortlessly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <FitProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          <Footer />
        </FitProvider>
      </body>
    </html>
  );
}