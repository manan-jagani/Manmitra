import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Diary() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("diaryEntries");
    return saved ? JSON.parse(saved) : [];
  });

  // Save whenever entries change
  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (entry.trim() !== "") {
      const newEntry = { text: entry, date: new Date().toLocaleDateString() };
      setEntries([newEntry, ...entries]);
      setEntry("");
    }
  };

  return (
    <div className="pt-20 bg-beige min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Diary</h1>
      
      <textarea
        className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sage"
        rows="6"
        placeholder="Write your thoughts here..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <button
        onClick={saveEntry}
        className="px-6 py-3 bg-sage text-white rounded-full hover:bg-sage-dark hover:scale-105 transition"
      >
        Save Entry
      </button>

      <div className="mt-8 space-y-4">
        <AnimatePresence>
          {entries.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 rounded-lg shadow"
            >
              <p className="text-gray-700">{e.text}</p>
              <p className="text-sm text-gray-500 mt-2">{e.date}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
