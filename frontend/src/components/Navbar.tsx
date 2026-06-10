import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-slate-850/60 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet text-white shadow-lg shadow-brand-indigo/20 group-hover:scale-105 transition-transform duration-300">
            <HiSparkles className="w-5 h-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Interview<span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#demo" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Live Demo
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Pricing
          </a>
          <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            FAQ
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-sm font-semibold shadow-lg shadow-brand-indigo/20 hover:shadow-brand-indigo/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-brand-violet to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-800 py-6 px-6 flex flex-col gap-5 shadow-2xl backdrop-blur-lg">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-slate-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#demo"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-slate-300 hover:text-white"
          >
            Live Demo
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-slate-300 hover:text-white"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-slate-300 hover:text-white"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-slate-300 hover:text-white"
          >
            FAQ
          </a>
          <hr className="border-slate-800" />
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="py-3 text-center rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="py-3 text-center rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-semibold shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;