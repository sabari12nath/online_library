'use client';

import Link from 'next/link';
import { BookOpen, Shield, Sparkles, Zap, Users, TrendingUp, Menu, X, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme-context';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative transition-colors duration-300">
      {/* Mouse-following spotlight (dark mode only) */}
      {theme === 'dark' && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`
          }}
        />
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Digital Library
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-4 rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-300 dark:border-white/10 shadow-2xl">
            <div className="flex flex-col gap-3">
              <Link href="/library" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all text-left">
                  <BookOpen className="w-5 h-5 text-cyan-500" />
                  <span>Browse Library</span>
                </button>
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all text-left text-white">
                  <Shield className="w-5 h-5" />
                  <span>Admin Portal</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className={`text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm text-cyan-400">Your Academic Resource Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Access Knowledge
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Discover a vast collection of academic materials, notes, and resources.
            Your journey to excellence starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/library">
              <button className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                Explore Library
                <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/admin">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Admin Access
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="group p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-300 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">Vast Collection</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Access thousands of notes, papers, and study materials across all departments and semesters.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-300 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">Instant Access</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              No login required for students. Browse and download materials instantly with smart filters.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-300 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-400 to-emerald-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">Community Driven</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Materials contributed by students and faculty, ensuring quality and relevance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">1000+</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Study Materials</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">500+</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Active Users</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent">50+</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Subjects Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
            Ready to Start Learning?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Join thousands of students accessing quality academic resources.
          </p>
          <Link href="/library">
            <button className="group px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/30 flex items-center gap-3 mx-auto">
              Get Started Now
              <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
