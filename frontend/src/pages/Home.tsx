import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  FiArrowRight,
  FiUploadCloud,
  FiChevronDown,
  FiTerminal,
  FiAward,
  FiShield,
  FiBarChart2,
  FiLayers,
  FiCode
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

// Frequently Asked Questions
const FAQS = [
  {
    q: "How does the AI tailor questions to my resume?",
    a: "When you upload your PDF resume, our system analyzes your listed technologies, projects, and career level. It then prompts Google Gemini to generate 10 questions (5 theory, 5 multiple choice) that test your real-world stack."
  },
  {
    q: "What format are the interview questions in?",
    a: "Each session has exactly 10 questions: Questions 1 to 5 are deep technical theory prompts where you explain architectural decisions and concepts. Questions 6 to 10 are technical multiple-choice questions with 4 distinct options."
  },
  {
    q: "Is my resume and interview data secure?",
    a: "Yes. All uploaded resumes are stored privately in encrypted AWS S3 buckets. Resumes and transcripts are never shared publicly or used to train public models."
  },
  {
    q: "How does the evaluation and scoring work?",
    a: "At the end of your session, the AI evaluates every answer against technical accuracy, depth, and clarity. You receive a final score from 0 to 100, followed by question-by-question feedback and senior-level model answers."
  }
];

// Interactive Preview Tabs
type PreviewTab = "resume" | "questions" | "evaluation";

function Home() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<PreviewTab>("questions");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const targetLink = token && user ? "/candidate" : "/signup";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 px-6 overflow-hidden">
        {/* Subtle Background Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <HiSparkles className="w-3.5 h-3.5" />
              AI Technical Interview Preparation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]"
          >
            Master Your Technical Interview with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
              Intelligent AI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            Upload your resume to generate real-world technical questions tailored directly
            to your experience. Practice theory and multiple-choice questions with instant 0–100 scoring
            and senior-engineer model answers.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Link
              to={targetLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200"
            >
              Start Free Interview
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full max-w-4xl"
          >
            <div>
              <p className="text-xl font-bold text-white">10 Questions</p>
              <p className="text-xs text-slate-400 mt-1">5 Theory + 5 MCQs per session</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Resume-Driven</p>
              <p className="text-xs text-slate-400 mt-1">Parsed via Google Gemini</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">0–100 Score</p>
              <p className="text-xs text-slate-400 mt-1">Graded with rubric accuracy</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">AWS S3 Cloud</p>
              <p className="text-xs text-slate-400 mt-1">Encrypted resume storage</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Showcase / Preview Section */}
      <section id="preview" className="py-20 px-6 border-t border-slate-800/80 bg-slate-900/30 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Product Walkthrough
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              See the Candidate Experience
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Switch between tabs below to preview the interview workflow from resume upload to evaluation.
            </p>
          </div>

          {/* Preview Navigation Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setActiveTab("resume")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === "resume"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1. Resume Parsing
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === "questions"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2. Live Questions (Theory & MCQ)
              </button>
              <button
                onClick={() => setActiveTab("evaluation")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === "evaluation"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                3. AI Scorecard & Feedback
              </button>
            </div>
          </div>

          {/* Preview Display Window */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-xl">
            {/* Window Header */}
            <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                interviewai.com/session/demo-preview
              </span>
              <span className="w-12" />
            </div>

            {/* Window Body */}
            <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-center">
              {activeTab === "resume" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <FiUploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        Resume Successfully Extracted
                      </h3>
                      <p className="text-xs text-slate-400">
                        resume_john_doe.pdf • Stored securely in AWS S3
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Detected Stack
                      </p>
                      <p className="text-sm font-medium text-white mt-1">
                        React, Node.js, TypeScript, PostgreSQL
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Seniority Level
                      </p>
                      <p className="text-sm font-medium text-white mt-1">
                        Senior Full-Stack Engineer (4+ yrs)
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Question Set
                      </p>
                      <p className="text-sm font-medium text-emerald-400 mt-1">
                        10 Questions Ready (5 Theory / 5 MCQ)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                    <span className="text-slate-500">// Extracted summary snippet:</span>
                    <br />
                    Candidate has extensive experience scaling distributed Node.js APIs and designing modular React state architectures with TypeScript.
                  </div>
                </div>
              )}

              {activeTab === "questions" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-blue-400 uppercase tracking-wider">
                      Question 2 of 10 • Technical Theory
                    </span>
                    <span className="text-slate-400">Progress: 20%</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white leading-relaxed">
                    \"How do you optimize state management in a large React application to avoid unnecessary re-renders across sibling components?\"
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs text-slate-400 mb-2">Candidate Response:</p>
                    <p className="text-sm text-slate-200 leading-relaxed italic">
                      \"I isolate frequently updating state into dedicated sub-contexts or local state, use React.memo with custom comparison functions when rendering expensive subtrees, and memoize callbacks and derived data using useCallback and useMemo...\"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Questions 1–5: Open Technical Theory</span>
                    <span className="text-blue-400 font-medium">Questions 6–10: 4-Option MCQs</span>
                  </div>
                </div>
              )}

              {activeTab === "evaluation" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        Interview Evaluation Report
                      </h3>
                      <p className="text-xs text-slate-400">Candidate: John Doe • Role: Full-Stack Engineer</p>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold">
                      <FiAward className="w-4 h-4" />
                      Score: 92 / 100
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      AI Feedback & Strengths:
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Strong demonstration of React performance optimization patterns. Successfully addressed component memoization, selector-based state subscriptions, and trade-offs of deep component trees. All 5 multiple-choice questions were answered correctly.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40">
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                      Senior Model Answer Recommendation:
                    </p>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      \"For massive-scale applications, emphasize atomic state libraries (Zustand, Recoil) to completely bypass unnecessary context provider tree re-renders, and use virtualization (react-virtual) for long lists.\"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              How InterviewAI Works
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From uploading your resume to receiving detailed technical scoring in under 15 minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-base mb-4">
                  1
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provide your resume in PDF format. Our parser extracts your languages, libraries, and project highlights and stores it securely in AWS S3.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-base mb-4">
                  2
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Take the 10-Question Test
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Answer 5 open theory questions testing deep concepts, followed by 5 multiple-choice questions testing syntax and edge cases.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-base mb-4">
                  3
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Receive Your Score & Feedback
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Get a transparent score out of 100 with comprehensive feedback on each answer and model solutions to study before your official interview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="features" className="py-20 px-6 border-t border-slate-800/80 bg-slate-900/20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Built for Technical Excellence
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Everything needed to sharpen technical explanations and interview with confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <FiTerminal className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Resume-Tailored Questions
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Questions are never generic. They reflect the actual frameworks, languages, and tools listed on your resume.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <FiLayers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Theory & MCQ Format
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                5 technical theory questions test architectural reasoning, while 5 MCQs test conceptual accuracy.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <FiBarChart2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                0–100 Objective Scoring
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scored automatically by LLM evaluation criteria based on accuracy, structure, and technical depth.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <FiCode className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Senior Model Answers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review model answers for each question to learn how top tech engineers structure high-scoring explanations.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <FiShield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                AWS S3 Cloud Security
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your resume PDF is encrypted and stored in private S3 buckets, never stored on ephemeral local container disks.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <FiAward className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Actionable Feedback
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant results after submitting. No waiting days for feedback; improve and iterate immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-4 px-5 flex justify-between items-center text-left hover:bg-slate-900/70 transition-colors"
                  >
                    <span className="font-medium text-sm text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 border border-slate-800 p-8 sm:p-12 text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-xl">
            Ready to test your technical skills before your real interview?
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md">
            Upload your resume, complete 10 personalized questions, and analyze your performance with instant scoring.
          </p>
          <Link
            to={targetLink}
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all duration-200"
          >
            Start Free Session
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-800/80 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <HiSparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-300">
              Interview<span className="text-blue-500">AI</span>
            </span>
          </div>

          <p>© {new Date().getFullYear()} InterviewAI. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#how-it-works" className="hover:text-slate-300 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-slate-300 transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-slate-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
