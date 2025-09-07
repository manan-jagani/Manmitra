// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Smile, Users } from "lucide-react";
import "../styles/animations.css";

const PALETTE = {
  loafer: "#f4f6ea",
  beryl: "#d7dead",
  pine: "#c3c984",
  sage: "#99ac87",
  chrome: "#e7edcf",
  headline: "#33513f",
  copy: "#556050",
};

export default function Home() {
  const features = [
    {
      icon: <Smile className="w-10 h-10" style={{ color: PALETTE.sage }} />,
      title: "Mood Tracker",
      desc: "Log emotions daily and understand trends with visuals.",
      link: "/moodtracker",
    },
    {
      icon: <BookOpen className="w-10 h-10" style={{ color: PALETTE.sage }} />,
      title: "Journal",
      desc: "Private space to reflect, note wins, and track growth.",
      link: "/journal",
    },
    {
      icon: <Users className="w-10 h-10" style={{ color: PALETTE.sage }} />,
      title: "Therapists",
      desc: "Connect with trained professionals for support.",
      link: "/therapists",
    },
  ];

  return (
    <div
      className="pt-20 min-h-screen flex flex-col items-center text-center px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${PALETTE.chrome} 0%, ${PALETTE.loafer} 60%)`,
      }}
    >
      {/* Animated background blob container (SVG gradients referenced by CSS) */}
      <svg
        className="bg-animated"
        width="900"
        height="420"
        viewBox="0 0 900 420"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="bgGrad1" x1="0" x2="1">
            <stop offset="0%" stopColor={PALETTE.sage} stopOpacity="0.30" />
            <stop offset="60%" stopColor={PALETTE.beryl} stopOpacity="0.18" />
            <stop offset="100%" stopColor={PALETTE.chrome} stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="bgGrad2" x1="0" x2="1">
            <stop offset="0%" stopColor={PALETTE.beryl} stopOpacity="0.28" />
            <stop offset="80%" stopColor={PALETTE.loafer} stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="bgGrad3" x1="0" x2="1">
            <stop offset="0%" stopColor={PALETTE.sage} stopOpacity="0.22" />
            <stop offset="100%" stopColor={PALETTE.pine} stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* big soft ellipses — each given a CSS class for animation */}
        <ellipse className="bg-blob blob-1 blob-fill-1" cx="520" cy="120" rx="260" ry="120" />
        <ellipse className="bg-blob blob-2 blob-fill-2" cx="720" cy="160" rx="210" ry="110" />
        <ellipse className="bg-blob blob-3 blob-fill-3" cx="200" cy="140" rx="180" ry="100" />
      </svg>

      {/* Subtle shimmer overlay */}
      <div className="hero-shimmer" aria-hidden />

      {/* tiny floating dots */}
      <div className="floating-dot dot-a" aria-hidden />
      <div className="floating-dot dot-b" aria-hidden />
      <div className="floating-dot dot-c" aria-hidden />
      <div className="floating-dot dot-d" aria-hidden />

      {/* content (z-index above background) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
          style={{ color: PALETTE.headline }}
        >
          Your Mind,{" "}
          <span style={{ color: PALETTE.sage /* Sage accent */ }}>
            Your Companion
          </span>
        </h1>

        <p className="text-base md:text-lg mb-8 max-w-xl mx-auto" style={{ color: PALETTE.copy }}>
          Track moods, journal freely, and find gentle support — a calm, grounding
          space built around your wellbeing.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/features"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold shadow-md transition-transform transform"
            style={{
              backgroundColor: PALETTE.sage,
              color: PALETTE.loafer,
              boxShadow: "0 10px 30px rgba(51,81,63,0.08)",
            }}
            aria-label="Explore features"
          >
            Explore Features
          </Link>

          <Link
            to="/journal"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold border-2"
            style={{
              borderColor: PALETTE.sage,
              color: PALETTE.headline,
              backgroundColor: "transparent",
            }}
            aria-label="Go to journal"
          >
            Go to Journal
          </Link>
        </div>
      </motion.header>

      {/* Feature cards (unchanged) */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl w-full relative z-10"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {features.map((f, i) => (
          <motion.article
            key={i}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-8 card-elevate"
          >
            <Link to={f.link} className="block h-full">
              <div className="flex justify-center mb-4">{f.icon}</div>

              <h3 className="text-2xl font-bold mb-2" style={{ color: PALETTE.headline }}>
                {f.title}
              </h3>

              <p className="text-sm mb-6" style={{ color: PALETTE.copy }}>{f.desc}</p>

              <div>
                <span className="inline-block font-semibold" style={{ color: PALETTE.sage }}>
                  Open →
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.section>

      <div className="h-24" />
    </div>
  );
}
