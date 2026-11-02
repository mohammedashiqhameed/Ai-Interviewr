import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiArrowRight, FiLogOut } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-200">
            <HiSparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Interview<span className="text-blue-500">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#preview"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Preview
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Auth CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {token && user ? (
            <>
              <Link
                to="/candidate"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                Start Interview
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="Logout"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                Get Started
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 py-5 px-6 flex flex-col gap-4">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#preview"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white"
          >
            Preview
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-white"
          >
            FAQ
          </a>
          <hr className="border-slate-800 my-1" />
          {token && user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/candidate"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center rounded-lg bg-blue-600 text-white font-medium text-sm"
              >
                Start Interview
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full py-2 text-center text-slate-400 hover:text-white text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center rounded-lg border border-slate-800 text-slate-300 hover:text-white text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center rounded-lg bg-blue-600 text-white font-medium text-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
