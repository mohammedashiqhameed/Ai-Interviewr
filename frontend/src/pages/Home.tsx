import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import {
    FiArrowRight,
    FiPlay,
    FiUploadCloud,
    FiAward,
    FiCheckCircle,
    FiChevronDown,
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiTerminal,
    FiLock,
    FiCheck,
    FiMic,
    FiActivity,
    FiTrendingUp,
    FiShield
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

// Demo Questions & Simulation Data
const DEMO_ROLES = [
    {
        id: "frontend",
        title: "Frontend React Developer",
        question: "Explain the difference between useEffect and useMemo, and when you would use each.",
        sampleAnswer: "useEffect is designed to handle side effects in your functional components (like data fetching, manual DOM edits, or subscriptions) after rendering completes. On the other hand, useMemo is used for memoization of expensive computational results. It cache-stores values and recalculates only when dependencies change, optimizing render performances.",
        evaluation: {
            score: 9.2,
            accuracy: 94,
            communication: 90,
            keywords: ["side effects", "memoization", "render optimization", "functional components"],
            feedback: "Strong explanation of the purpose of both hooks. Accurately identified that useEffect triggers post-render, while useMemo returns cached values during render. Good highlight of side effects vs performance caching.",
            modelAnswer: "useEffect runs side effects after the layout and render paint, tracking updates to external states. useMemo runs during render to cache computationally intensive objects or calculations, returning the same reference unless dependencies change."
        }
    },
    {
        id: "backend",
        title: "Backend Node/Go Engineer",
        question: "How do you handle horizontal database scaling, and what are the main trade-offs of Sharding?",
        sampleAnswer: "To scale databases horizontally, sharding is used to partition data across multiple servers based on a shard key. The trade-off is high complexity in queries, difficulty in managing joins across shards, and risk of hot spots if the partition key is not uniformly distributed.",
        evaluation: {
            score: 8.7,
            accuracy: 88,
            communication: 86,
            keywords: ["partitioning", "shard key", "cross-shard joins", "data distribution"],
            feedback: "Great identification of shard key importance and queries complexity. You could improve this response by discussing transactional consistency (ACID constraints across shards) and re-sharding procedures.",
            modelAnswer: "Horizontal database scaling is achieved through sharding (range, directory, or hash-based) or read-replicas. Sharding splits tables into independent partitions. Key trade-offs are the loss of joins, cross-shard transaction rollbacks, routing tier overhead, and secondary indexes limitations."
        }
    },
    {
        id: "fullstack",
        title: "Fullstack AI Engineer",
        question: "What is Retrieval-Augmented Generation (RAG), and how does it compare to Fine-Tuning an LLM?",
        sampleAnswer: "RAG retrieves relevant documents from an external vector store based on semantic search of the user query, injecting them into the context window of the LLM. Fine-Tuning alters the neural weights of the LLM itself on a dataset. RAG is better for dynamic/private data, while Fine-Tuning is best for modifying style, formatting, or behavior.",
        evaluation: {
            score: 9.5,
            accuracy: 96,
            communication: 94,
            keywords: ["vector store", "semantic search", "context window", "weight adjustment", "dynamic data"],
            feedback: "Excellent contrast of external dynamic search (RAG) vs internal model weights adaptation (Fine-Tuning). Spot-on categorization of when to use each approach.",
            modelAnswer: "RAG is an information retrieval technique that combines vector embeddings with semantic databases to update prompt context at runtime without changing model weights. Fine-tuning adjusts the parameters of a model to adapt to a domain's tone, syntax, or formatting. RAG offers low hallucination rates and real-time data access."
        }
    }
];

const FAQS = [
    {
        q: "How does the AI generate personalized questions?",
        a: "Our system parses your uploaded resume using advanced LLM processing. It maps your listed technologies, experience levels, and past projects to generate targeted technical questions that replicate real-world interview scenarios for your target role."
    },
    {
        q: "Is my resume and chat transcript secure?",
        a: "Absolutely. We encrypt all uploaded resumes and transcripts both in transit and at rest. Your interview answers are processed securely through sandboxed APIs and are never used to train public models."
    },
    {
        q: "Can I do voice-based interviews?",
        a: "Yes! The Pro tier includes full Speech-to-Text capabilities, allowing you to speak your answers naturally. The system transcriptions are analyzed for pacing, communication style, and structural clarity."
    },
    {
        q: "What types of roles are supported?",
        a: "We support a wide array of technical and product positions: Frontend, Backend, Fullstack, AI/ML Engineers, Mobile Developers, DevOps, QA, and Product Managers across all seniority levels."
    }
];

function Home() {
    // Demo State
    const [selectedRole, setSelectedRole] = useState(DEMO_ROLES[0]);
    const [answerInput, setAnswerInput] = useState("");
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationStep, setSimulationStep] = useState(0);
    const [showEvaluation, setShowEvaluation] = useState(false);

    // Pricing State
    const [isYearly, setIsYearly] = useState(false);

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const startSimulation = () => {
        setIsSimulating(true);
        setSimulationStep(1);
        setShowEvaluation(false);

        setTimeout(() => {
            setSimulationStep(2); // semantic check
        }, 1000);

        setTimeout(() => {
            setSimulationStep(3); // grade output
        }, 2000);

        setTimeout(() => {
            setIsSimulating(false);
            setShowEvaluation(true);
        }, 2800);
    };

    const loadSampleAnswer = () => {
        setAnswerInput(selectedRole.sampleAnswer);
    };

    return (
        <>
            <Navbar />

            {/* Main Container */}
            <div className="bg-grid-pattern min-h-screen text-slate-100 font-sans pt-20">

                {/* Background Ambient Blobs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
                <div className="absolute top-60 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>

                {/* 1. HERO SECTION */}
                <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Tagline Badge */}
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-indigo-400 shadow-md">
                            <HiSparkles className="w-3.5 h-3.5 text-indigo-400" />
                            AI-Powered Interview Coach
                        </span>

                        {/* Headline */}
                        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white max-w-4xl">
                            Master Your Next Technical{" "}
                            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
                                Interview with AI
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="max-w-2xl text-lg text-slate-400 leading-relaxed">
                            Upload your resume and experience an adaptive, real-time technical interview tailored directly to your past projects and target roles. Land the offer with step-by-step scoring.
                        </p>

                        {/* CTAs */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                            <a
                                href="#demo"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo via-indigo-600 to-brand-violet text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-102 active:scale-98 transition-all duration-300"
                            >
                                Try Interactive Demo
                                <FiArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white font-semibold border border-slate-800 hover:border-slate-750 transition-all duration-200"
                            >
                                <FiPlay className="w-4 h-4 text-indigo-400 fill-indigo-400/25" />
                                How It Works
                            </a>
                        </div>
                    </motion.div>

                    {/* Hero Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-16 md:mt-20 glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-slate-950 max-w-5xl mx-auto border border-slate-800/80"
                    >
                        {/* Browser Header */}
                        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-900 flex justify-between items-center">
                            <div className="flex gap-2">
                                <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></span>
                                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></span>
                            </div>
                            <div className="px-8 py-1 rounded-lg bg-slate-900 text-xs text-slate-500 font-mono tracking-wider truncate max-w-xs md:max-w-md">
                                interviewai.com/live-assessment/react-senior
                            </div>
                            <div className="w-14"></div>
                        </div>

                        {/* Browser Content Grid */}
                        <div className="grid md:grid-cols-12 bg-slate-900/40 text-left min-h-[420px]">

                            {/* Mock Sidebar */}
                            <div className="md:col-span-3 border-r border-slate-800/80 bg-slate-950/20 p-5 hidden md:flex flex-col gap-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Interview Progress
                                </span>
                                <div className="flex flex-col gap-2.5">
                                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-slate-200">
                                        <span className="w-5 h-5 rounded-full bg-indigo-500 text-[10px] font-bold flex items-center justify-center text-white">1</span>
                                        <span className="text-xs font-medium truncate">React Internals</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-transparent text-slate-400">
                                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center">2</span>
                                        <span className="text-xs font-medium truncate">State Architecture</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-transparent text-slate-400">
                                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center">3</span>
                                        <span className="text-xs font-medium truncate">API Integrations</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-transparent text-slate-400">
                                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center">4</span>
                                        <span className="text-xs font-medium truncate">System Optimization</span>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-slate-850 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[11px] text-slate-400">Recording audio live</span>
                                </div>
                            </div>

                            {/* Mock Main Panel */}
                            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 text-indigo-400">
                                        <FiTerminal className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">AI Interviewer</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                                        \"How does reconciliation work in React when a state change occurs, and what is the role of key props in lists?\"
                                    </h3>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-3">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>Your Answer (Voice transcription)</span>
                                        <span className="flex items-center gap-1 text-slate-400"><FiMic className="w-3 h-3 text-brand-indigo" /> Transcribed</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed italic">
                                        \"React compares the Virtual DOM trees using a diffing algorithm. When state updates, it recalculates nodes. Keys help React identify which items have changed, been added, or been removed, avoiding unnecessary re-renders...\"
                                    </p>
                                </div>
                            </div>

                            {/* Mock Assessment Panel */}
                            <div className="md:col-span-3 p-6 bg-slate-950/45 border-t md:border-t-0 md:border-l border-slate-800/80 flex flex-col gap-5 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                        <FiActivity className="w-3.5 h-3.5 text-indigo-400" /> Real-time Feedback
                                    </span>

                                    {/* Circular Score Mockup */}
                                    <div className="flex items-center gap-3.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                                        <div className="relative w-12 h-12 rounded-full bg-slate-850 flex items-center justify-center border-2 border-emerald-500">
                                            <span className="text-sm font-black text-emerald-400">9.0</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Excellent Answer</h4>
                                            <p className="text-[10px] text-slate-400">Concepts fully captured.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Accuracy</span>
                                                <span className="text-emerald-400 font-semibold">92%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 w-[92%] rounded-full"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Communication</span>
                                                <span className="text-indigo-400 font-semibold">88%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 w-[88%] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/35 text-[11px] text-indigo-300 leading-relaxed">
                                    💡 <strong>Tip:</strong> Mention the term <em>\"fiber node tree\"</em> or <em>\"reconciler\"</em> to show advanced engineering depth.
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </section>

                {/* 2. DYNAMIC DEMO WIDGET */}
                <section id="demo" className="py-20 bg-slate-950/40 relative border-t border-b border-slate-900/80 scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-6">

                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                                Interactive Simulator
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-3">
                                Experience the Evaluation Engine
                            </h2>
                            <p className="text-slate-400 text-sm md:text-base mt-2">
                                Select a target role, load a sample response or type your own, and click submit to trigger a simulated AI evaluation.
                            </p>
                        </div>

                        {/* Simulator Box */}
                        <div className="grid md:grid-cols-12 gap-8 items-start">

                            {/* Role Selectors & Input */}
                            <div className="md:col-span-7 flex flex-col gap-5">

                                {/* Role Tabs */}
                                <div className="flex gap-2.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
                                    {DEMO_ROLES.map((role) => (
                                        <button
                                            key={role.id}
                                            onClick={() => {
                                                setSelectedRole(role);
                                                setAnswerInput("");
                                                setShowEvaluation(false);
                                            }}
                                            className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${selectedRole.id === role.id
                                                    ? "bg-gradient-to-r from-brand-indigo to-indigo-600 text-white shadow-md"
                                                    : "text-slate-400 hover:text-white hover:bg-slate-850"
                                                }`}
                                        >
                                            {role.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Question Display Card */}
                                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-850 flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">Question Target</span>
                                        <span className="text-[10.5px] px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 font-medium">Difficulty: Hard</span>
                                    </div>
                                    <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                                        {selectedRole.question}
                                    </h3>
                                </div>

                                {/* Textarea Input */}
                                <div className="relative p-5 rounded-2xl bg-slate-900 border border-slate-850 flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Answer</label>
                                        <button
                                            onClick={loadSampleAnswer}
                                            className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors focus:outline-none"
                                        >
                                            Load Professional Answer
                                        </button>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={answerInput}
                                        onChange={(e) => setAnswerInput(e.target.value)}
                                        placeholder="Type your explanation here, or load the pre-written answer..."
                                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo resize-none"
                                    ></textarea>

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-[11.5px] text-slate-500">
                                            {answerInput.length} characters
                                        </span>

                                        <button
                                            onClick={startSimulation}
                                            disabled={!answerInput.trim() || isSimulating}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-xs font-bold hover:shadow-lg hover:shadow-indigo-500/20 active:scale-97 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                                        >
                                            Submit Response
                                        </button>
                                    </div>
                                </div>

                            </div>

                            {/* Assessment / Loading Outputs */}
                            <div className="md:col-span-5">
                                <div className="min-h-[360px] rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-center relative overflow-hidden">

                                    {/* Default State */}
                                    {!isSimulating && !showEvaluation && (
                                        <div className="text-center py-10 flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                                                <FiActivity className="w-7 h-7" />
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-400">Waiting for Submission</h4>
                                            <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
                                                Input your technical response and click submit to trigger AI feedback analytics.
                                            </p>
                                        </div>
                                    )}

                                    {/* Loading State */}
                                    {isSimulating && (
                                        <div className="flex flex-col gap-6 text-center py-8">
                                            <div className="mx-auto w-12 h-12 border-2 border-brand-indigo border-t-transparent rounded-full animate-spin"></div>

                                            <div className="space-y-2.5">
                                                <h4 className="text-sm font-bold text-white">Analyzing Answer Content</h4>
                                                <div className="flex flex-col gap-1.5 max-w-[260px] mx-auto text-xs text-slate-400">
                                                    <div className={`flex items-center justify-center gap-1.5 transition-opacity duration-300 ${simulationStep >= 1 ? "opacity-100" : "opacity-35"}`}>
                                                        {simulationStep > 1 ? <FiCheck className="text-emerald-400" /> : <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>}
                                                        Parsing structural grammar...
                                                    </div>
                                                    <div className={`flex items-center justify-center gap-1.5 transition-opacity duration-300 ${simulationStep >= 2 ? "opacity-100" : "opacity-35"}`}>
                                                        {simulationStep > 2 ? <FiCheck className="text-emerald-400" /> : simulationStep === 2 ? <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span> : null}
                                                        Comparing against model taxonomy...
                                                    </div>
                                                    <div className={`flex items-center justify-center gap-1.5 transition-opacity duration-300 ${simulationStep >= 3 ? "opacity-100" : "opacity-35"}`}>
                                                        {simulationStep === 3 ? <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span> : null}
                                                        Compiling overall evaluation metrics...
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Results Screen */}
                                    <AnimatePresence>
                                        {showEvaluation && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col gap-5 text-left h-full"
                                            >
                                                {/* Rating Row */}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Scorecard</span>
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        {selectedRole.evaluation.score} / 10
                                                    </span>
                                                </div>

                                                {/* Metrics Bar */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
                                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Accuracy</span>
                                                        <span className="text-base font-extrabold text-white">{selectedRole.evaluation.accuracy}%</span>
                                                        <div className="h-1 w-full bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                                                            <div className="h-full bg-teal-400 rounded-full" style={{ width: `${selectedRole.evaluation.accuracy}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
                                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Communication</span>
                                                        <span className="text-base font-extrabold text-white">{selectedRole.evaluation.communication}%</span>
                                                        <div className="h-1 w-full bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                                                            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${selectedRole.evaluation.communication}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Keyword Chips */}
                                                <div className="flex flex-wrap gap-1.5 items-center">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">Verified:</span>
                                                    {selectedRole.evaluation.keywords.map((kw, i) => (
                                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-750 text-slate-300">
                                                            {kw}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Feedback Detail */}
                                                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
                                                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Feedback Summary</span>
                                                    <p className="text-xs text-slate-300 leading-relaxed">
                                                        {selectedRole.evaluation.feedback}
                                                    </p>
                                                </div>

                                                {/* Model Comparison */}
                                                <div className="p-3.5 rounded-xl bg-indigo-950/10 border border-indigo-900/30">
                                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Ideal Model Answer</span>
                                                    <p className="text-xs text-slate-400 leading-relaxed italic line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                                                        \"{selectedRole.evaluation.modelAnswer}\"
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* 3. CORE FEATURES GRID */}
                <section id="features" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                            Platform Features
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mt-4">
                            Everything You Need to Land the Offer
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg mt-3">
                            An all-in-one preparation engine built around your direct career credentials.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                <FiUploadCloud className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">Resume Parsing</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Upload your resume in PDF/Word format. Our parser extracts programming languages, tools, and project highlights instantly.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-violet-500/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                <HiSparkles className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">Adaptive AI Questioning</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                No fixed scripts. The AI generates follow-up technical questions in real-time, matching details from your actual answers.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-teal-500/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                <FiMic className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">Speech-to-Text Support</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Practice voice responses under realistic time constraints. Speak your code explanations naturally and let the AI transcribe.
                            </p>
                        </motion.div>

                        {/* Feature 4 */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                <FiAward className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">Granular Performance Reports</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Review key syntax suggestions, model answer contrasts, and detailed grades mapping accuracy, design depth, and phrasing.
                            </p>
                        </motion.div>

                        {/* Feature 5 */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-rose-500/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                <FiTrendingUp className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">SaaS Analytics Dashboard</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Track your scores across frontend frameworks, backend architecture, and databases over weeks to map structural improvement.
                            </p>
                        </motion.div>

                        {/* Feature 6 */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                <FiShield className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-display">Secure Interview Storage</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Keep an active history of past interview sessions, grades, transcripts, and custom correction pathways for absolute safety.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 4. HOW IT WORKS TIMELINE */}
                <section id="how-it-works" className="py-20 bg-slate-950/20 border-t border-slate-900/80 scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-6">

                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                                Preparation Path
                            </span>
                            <h2 className="font-display text-4xl font-extrabold text-white mt-4">
                                Four Steps to Interview Mastery
                            </h2>
                            <p className="text-slate-400 text-base mt-2">
                                A structured, guided workflow built to convert credentials into career offers.
                            </p>
                        </div>

                        {/* Timeline Steps Layout */}
                        <div className="grid md:grid-cols-4 gap-8 relative">
                            {/* Timeline Connector Line */}
                            <div className="absolute top-1/4 left-10 right-10 h-0.5 bg-slate-850 hidden md:block z-0"></div>

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 shadow-xl font-display font-black text-xl mb-5 hover:border-brand-indigo hover:scale-105 transition-all duration-300">
                                    1
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Upload Resume</h4>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                                    Drop in your PDF. The AI reads your tech stack, job titles, and experiences instantly.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-violet-400 shadow-xl font-display font-black text-xl mb-5 hover:border-brand-violet hover:scale-105 transition-all duration-300">
                                    2
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Customize Role</h4>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                                    Select seniority, target company tier, and specialized language domains.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shadow-xl font-display font-black text-xl mb-5 hover:border-brand-teal hover:scale-105 transition-all duration-300">
                                    3
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Conduct Assessment</h4>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                                    Complete a 15-minute voice or text interview. Questions adapt dynamically based on your quality.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shadow-xl font-display font-black text-xl mb-5 hover:border-emerald-500 hover:scale-105 transition-all duration-300">
                                    4
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Review Analytics</h4>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                                    Get detailed concept ratings, optimized code solutions, and model responses for quick revisions.
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* 5. PRICING TIER SECTION */}
                <section id="pricing" className="py-20 max-w-6xl mx-auto px-6 scroll-mt-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                            Pricing Options
                        </span>
                        <h2 className="font-display text-4xl font-extrabold text-white mt-4">
                            Simple, Transparent Pricing Plans
                        </h2>
                        <p className="text-slate-400 text-base mt-2">
                            Invest in your engineering career. Cancel or upgrade anytime.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-3.5 mt-8">
                            <span className={`text-xs font-semibold ${!isYearly ? "text-white" : "text-slate-400"}`}>Monthly</span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className="w-11 h-6 rounded-full bg-slate-800 p-0.5 focus:outline-none transition-colors duration-200 flex items-center relative"
                            >
                                <div className={`w-5 h-5 rounded-full bg-indigo-500 shadow-md transform transition-transform duration-200 ${isYearly ? "translate-x-5" : "translate-x-0"}`}></div>
                            </button>
                            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? "text-white" : "text-slate-400"}`}>
                                Yearly
                                <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 text-[9px] font-bold uppercase">
                                    Save 20%
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">

                        {/* Plan 1 - Free */}
                        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white">Starter</h3>
                                <p className="text-xs text-slate-400 mt-1">Perfect for trying out the AI engine</p>
                                <div className="mt-6 flex items-baseline gap-1 text-white">
                                    <span className="text-4xl font-black font-display">$0</span>
                                    <span className="text-xs text-slate-500">/ forever</span>
                                </div>
                                <hr className="border-slate-800 my-6" />
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        3 adaptive interviews / month
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Text-only responses
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Basic overall score summary
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-500 line-through">
                                        <FiLock className="w-3.5 h-3.5 shrink-0" />
                                        Speech-to-Text evaluations
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-500 line-through">
                                        <FiLock className="w-3.5 h-3.5 shrink-0" />
                                        Granular feedback & corrections
                                    </li>
                                </ul>
                            </div>
                            <button className="w-full py-3 rounded-xl border border-slate-850 hover:border-slate-750 text-slate-300 font-semibold text-xs mt-8 hover:bg-slate-900 transition-colors">
                                Start Free Preparation
                            </button>
                        </div>

                        {/* Plan 2 - Pro (Popular) */}
                        <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-950/20 to-slate-900/40 border-2 border-brand-indigo relative flex flex-col justify-between shadow-xl shadow-brand-indigo/5">
                            <span className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                                Highly Popular
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                                    Professional
                                    <HiSparkles className="w-4 h-4 text-indigo-400" />
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Full access to adaptive interviews</p>
                                <div className="mt-6 flex items-baseline gap-1 text-white">
                                    <span className="text-4xl font-black font-display">
                                        ${isYearly ? "15" : "19"}
                                    </span>
                                    <span className="text-xs text-slate-500">/ month</span>
                                </div>
                                <hr className="border-slate-800 my-6" />
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        <strong>Unlimited</strong> mock interviews
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Full voice speech-to-text input
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Deep grading & key-term check
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Optimized code & model answers
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Historic performance tracking
                                    </li>
                                </ul>
                            </div>
                            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-bold text-xs mt-8 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-300">
                                Go Pro Now
                            </button>
                        </div>

                        {/* Plan 3 - Team */}
                        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white">Enterprise</h3>
                                <p className="text-xs text-slate-400 mt-1">For bootcamps, agencies, and hiring teams</p>
                                <div className="mt-6 flex items-baseline gap-1 text-white">
                                    <span className="text-4xl font-black font-display">Custom</span>
                                </div>
                                <hr className="border-slate-800 my-6" />
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Everything in Professional plan
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Custom question banks & parameters
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Bulk student / developer tracking
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Shared dashboards & reporting APIs
                                    </li>
                                    <li className="flex items-center gap-2.5 text-xs text-slate-300">
                                        <FiCheckCircle className="text-indigo-400 w-4 h-4 shrink-0" />
                                        Priority account support
                                    </li>
                                </ul>
                            </div>
                            <button className="w-full py-3 rounded-xl border border-slate-850 hover:border-slate-750 text-slate-300 font-semibold text-xs mt-8 hover:bg-slate-900 transition-colors">
                                Contact Sales Team
                            </button>
                        </div>

                    </div>
                </section>

                {/* 6. FAQS ACCORDION */}
                <section id="faq" className="py-20 bg-slate-950/20 border-t border-slate-900/80 scroll-mt-20">
                    <div className="max-w-4xl mx-auto px-6">

                        <div className="text-center mb-16">
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                                Support Hub
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-4">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        {/* Accordion List */}
                        <div className="flex flex-col gap-4">
                            {FAQS.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-slate-850 bg-slate-900/40 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                            className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-slate-900/60 focus:outline-none transition-colors"
                                        >
                                            <span className="font-semibold text-sm md:text-base text-white">
                                                {faq.q}
                                            </span>
                                            <FiChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-950/30 pt-3">
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

                {/* 7. BOTTOM CTA SECTION */}
                <section className="py-20 max-w-5xl mx-auto px-6 text-center relative">
                    <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950/40 border border-slate-800/80 shadow-2xl relative overflow-hidden flex flex-col items-center gap-6">

                        {/* Glowing Accent Blur */}
                        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-brand-indigo/15 rounded-full blur-3xl pointer-events-none"></div>

                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                            Limited Access Launch
                        </span>

                        <h2 className="font-display text-3xl md:text-5xl font-black text-white max-w-2xl leading-tight">
                            Ready to land your dream technical engineering offer?
                        </h2>

                        <p className="text-slate-400 text-sm md:text-base max-w-lg leading-relaxed">
                            Upload your skills credentials, run customized technical tests, and analyze performance before sitting in the official loop.
                        </p>

                        <a
                            href="#demo"
                            className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo via-indigo-600 to-brand-violet text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-102 transition-all duration-300"
                        >
                            Start Your First Session Free
                            <FiArrowRight className="w-4.5 h-4.5" />
                        </a>

                    </div>
                </section>

                {/* 8. FOOTER */}
                <footer className="border-t border-slate-900/80 bg-slate-950/40 py-12 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 items-start mb-12">

                        {/* Brand Logo Info */}
                        <div className="col-span-2 flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet text-white shadow-md">
                                    <HiSparkles className="w-4 h-4" />
                                </div>
                                <span className="font-display text-lg font-bold tracking-tight text-white">
                                    Interview<span className="text-indigo-400">AI</span>
                                </span>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                                Next-generation, adaptive AI preparation coach tailored to optimize interview confidence and technical taxonomy verification.
                            </p>
                        </div>

                        {/* Col 1 */}
                        <div className="flex flex-col gap-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Product</h5>
                            <a href="#features" className="text-xs text-slate-500 hover:text-white transition-colors">Features</a>
                            <a href="#demo" className="text-xs text-slate-500 hover:text-white transition-colors">Live Demo</a>
                            <a href="#pricing" className="text-xs text-slate-500 hover:text-white transition-colors">Pricing Options</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Beta Changelog</a>
                        </div>

                        {/* Col 2 */}
                        <div className="flex flex-col gap-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Resources</h5>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Resume Optimizer</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Preparation Guides</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">API Docs</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">System Status</a>
                        </div>

                        {/* Col 3 */}
                        <div className="flex flex-col gap-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Company</h5>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">About Us</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Careers</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Security Details</a>
                            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
                        </div>

                        {/* Col 4 - Social Links */}
                        <div className="flex flex-col gap-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Follow Us</h5>
                            <div className="flex gap-3">
                                <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors">
                                    <FiGithub className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors">
                                    <FiTwitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors">
                                    <FiLinkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Copyright Bottom */}
                    <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                        <span>© 2026 InterviewAI Inc. All rights reserved.</span>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-400 transition-colors">Cookie settings</a>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}

export default Home;