import './globals.css';
import { WorkoutProvider } from '@/context/FitContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0f12] text-white flex flex-col min-h-screen">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
            {children}
          </main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}