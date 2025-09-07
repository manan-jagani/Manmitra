// src/pages/Features.jsx
import { motion } from "framer-motion";
import { Smile, BookOpen, Users, MessageCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Mood Tracker",
      description: "Log your emotions daily and see your mood trends with beautiful visuals.",
      icon: <Smile className="w-10 h-10 text-[#99ac87]" />,
    },
    {
      title: "Diary Journaling",
      description: "Write privately, reflect on your journey, and track your growth over time.",
      icon: <BookOpen className="w-10 h-10 text-[#99ac87]" />,
    },
    {
      title: "Therapist Booking",
      description: "Book 2 free sessions with professionals and get expert support.",
      icon: <Users className="w-10 h-10 text-[#99ac87]" />,
    },
    {
      title: "Supportive Chatbot",
      description: "Get instant emotional support anytime with our AI-powered companion.",
      icon: <MessageCircle className="w-10 h-10 text-[#99ac87]" />,
    },
  ];

  return (
    <div
      className="relative pt-24 min-h-screen px-6 pb-20"
      style={{
        background: "linear-gradient(180deg, #f4f6ea 0%, #e7edcf 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#c3c984] opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#99ac87] opacity-20 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
          style={{ color: "#33513f" }}
        >
          Features that <span className="text-[#99ac87]">Support You</span>
        </motion.h1>

        <p className="text-lg md:text-xl mb-14 max-w-2xl mx-auto" style={{ color: "#556050" }}>
          Built for students and individuals to track moods, reflect, and connect with support —
          all in one calming space.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-105 transition transform border border-[#e7edcf]"
            >
              <div className="flex items-center gap-4 mb-4">
                {f.icon}
                <h3 className="text-2xl font-semibold" style={{ color: "#33513f" }}>
                  {f.title}
                </h3>
              </div>
              <p style={{ color: "#556050" }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
