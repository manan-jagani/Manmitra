// src/pages/About.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartHandshake, BookOpen, Users } from "lucide-react";

const PALETTE = {
  loafer: "#f4f6ea",
  beryl: "#d7dead",
  pine: "#c3c984",
  sage: "#99ac87",
  chrome: "#e7edcf",
  headline: "#33513f",
  copy: "#556050",
};

const values = [
  {
    Icon: HeartHandshake,
    title: "Compassion First",
    text: "We prioritize empathy — safe, non-judgmental spaces for every voice.",
  },
  {
    Icon: BookOpen,
    title: "Evidence-Based",
    text: "Tools and resources are grounded in proven practices like CBT and mindfulness.",
  },
  {
    Icon: Users,
    title: "Accessible Support",
    text: "Bridging students and professionals with easy booking and free sessions where available.",
  },
];

const team = [
  {
    name: "Dr. Asha Rao",
    role: "Clinical Psychologist — CBT Specialist",
    bio: "Works with students on anxiety, exam stress and cognitive reframing.",
  },
  {
    name: "Mr. Rohit Singh",
    role: "Counselor — Wellbeing Support",
    bio: "Focuses on supportive counselling, coping strategies and study-life balance.",
  },
  {
    name: "Dr. Priya Mehta",
    role: "Therapist — Emotional Regulation",
    bio: "Helps clients build resilience, manage mood and strengthen relationships.",
  },
];

export default function About() {
  return (
    <main
      className="pt-20 min-h-screen px-6 pb-16"
      style={{
        background: `linear-gradient(180deg, ${PALETTE.chrome} 0%, ${PALETTE.loafer} 100%)`,
      }}
    >
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{ color: PALETTE.headline }}
        >
          About Manmitra
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="max-w-2xl mx-auto text-base md:text-lg"
          style={{ color: PALETTE.copy }}
        >
          Manmitra is a calm, student-centered platform for tracking mood, journaling,
          and connecting to supportive professionals. Our mission: make mental health
          tools approachable, private, and rooted in compassion.
        </motion.p>

        {/* decorative subtle blob (keeps design language consistent) */}
        <div
          aria-hidden
          className="hidden md:block absolute -right-12 -top-10 w-48 h-40 rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, ${PALETTE.sage}22, ${PALETTE.beryl}12, transparent 60%)`,
            filter: "blur(28px)",
            opacity: 0.14,
          }}
        />
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, i) => {
          const Icon = v.Icon;
          return (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow card-elevate"
              style={{ border: `1px solid ${PALETTE.chrome}` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-full flex items-center justify-center"
                  style={{
                    background: PALETTE.sage,
                    color: PALETTE.loafer,
                    minWidth: 56,
                    minHeight: 56,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold" style={{ color: PALETTE.headline }}>
                    {v.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: PALETTE.copy }}>
                    {v.text}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Mission / Story */}
      <section className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-2xl card-elevate border" style={{ borderColor: PALETTE.beryl }}>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-2xl font-bold mb-4" style={{ color: PALETTE.headline }}>
          Our Story
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08, duration: 0.6 }} className="text-base leading-relaxed" style={{ color: PALETTE.copy }}>
          We built Manmitra to support students navigating pressure, uncertainty and the ups
          and downs of life. Small, daily practices — noting moods, reflecting in a journal,
          and seeking guided support — can create meaningful change. We partner with trained
          professionals and keep the experience private and human-centered.
        </motion.p>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto mt-12">
        <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: PALETTE.headline }}>
          Meet a few of our practitioners
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + idx * 0.06 }}
              className="bg-white rounded-2xl p-5 card-elevate border"
              style={{ borderColor: PALETTE.beryl }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ background: PALETTE.sage }}
                >
                  {t.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: PALETTE.headline }}>{t.name}</div>
                  <div className="text-sm" style={{ color: PALETTE.copy }}>{t.role}</div>
                </div>
              </div>

              <p className="mt-3 text-sm text-[#5b6356]">{t.bio}</p>

              <div className="mt-4 flex justify-end">
                <Link
                  to="/therapists"
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    background: PALETTE.sage,
                    color: PALETTE.loafer,
                    boxShadow: "0 8px 18px rgba(51,81,63,0.06)",
                  }}
                >
                  Book → 
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto mt-12 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="bg-white p-6 rounded-2xl card-elevate border" style={{ borderColor: PALETTE.chrome }}>
          <h4 className="text-xl font-semibold mb-2" style={{ color: PALETTE.headline }}>Ready to start?</h4>
          <p className="text-sm mb-4" style={{ color: PALETTE.copy }}>Try the mood tracker, write a short journal entry, or book a free session with a practitioner.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/moodtracker" className="px-5 py-2 rounded-full font-semibold" style={{ background: PALETTE.sage, color: PALETTE.loafer }}>Track Mood</Link>
            <Link to="/journal" className="px-5 py-2 rounded-full font-semibold border-2" style={{ borderColor: PALETTE.sage, color: PALETTE.headline }}>Open Journal</Link>
          </div>
        </motion.div>
      </section>

      <div className="h-20" />
    </main>
  );
}
