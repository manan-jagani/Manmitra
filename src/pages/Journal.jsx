// src/pages/Journal.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Helpers */
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const newEntryRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("journalEntries");
      if (saved) setEntries(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load journal entries:", e);
    }
  }, []);

  // keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem("journalEntries", JSON.stringify(entries));
    } catch (e) {
      console.error("Failed to save journal entries:", e);
    }
  }, [entries]);

  const handleSave = () => {
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: entry.trim(),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setEntry("");
    setQuery("");

    // scroll to top when new entry is added
    setTimeout(() => {
      newEntryRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this entry?")) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = (id) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, text: editingText } : e))
    );
    setEditingId(null);
    setEditingText("");
  };

  // filter by search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? entries.filter((e) => e.text.toLowerCase().includes(q)) : entries;
  }, [entries, query]);

  // group by date (descending)
  const groups = useMemo(() => {
    const map = new Map();
    for (const e of filtered) {
      const dateKey = formatDate(e.createdAt);
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey).push(e);
    }
    return Array.from(map.entries()).sort((a, b) => {
      const da = new Date(a[1][0].createdAt);
      const db = new Date(b[1][0].createdAt);
      return db - da;
    });
  }, [filtered]);

  return (
    <div className="pt-20 min-h-screen bg-beige-50 px-4 md:px-8 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-sage-900 mb-6 text-center">
          Journal
        </h1>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-2xl shadow p-5 border border-beige-200 mb-6"
          layout
        >
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts, plans, reflections..."
            className="w-full min-h-[9rem] p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sage-400 outline-none text-gray-800 resize-none"
          />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
            {/* Search */}
            <div className="flex gap-2 items-center w-full md:w-1/2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search entries..."
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sage-400 outline-none text-gray-700"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-sm text-sage-600 hover:text-sage-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-end w-full md:w-auto">
              <button
                type="button"
                onClick={() => setEntry("")}
                className="px-4 py-2 bg-gray-100 rounded-full text-sage-700 hover:bg-gray-200"
              >
                Clear
              </button>

              <motion.button
                onClick={handleSave}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow"
              >
                Save Entry
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Entries grouped by date */}
        <div className="space-y-6">
          <AnimatePresence>
            {groups.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-6 h-24 w-24 text-sage-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20h9M12 4v16m0-16H6.75a2.25 2.25 0 00-2.25 2.25v11.25A2.25 2.25 0 006.75 20H12"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-sage-700">
                  Your journal is empty
                </h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                  Start writing your thoughts, reflections, or even small daily wins. 
                  Your journey begins with your first entry ✨
                </p>
              </motion.div>
            ) : (
              groups.map(([date, items]) => (
                <div key={date}>
                  <h2 className="text-sm text-sage-700 font-semibold mb-2">{date}</h2>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.article
                        key={item.id}
                        ref={index === 0 ? newEntryRef : null}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.28 }}
                        layout
                        className="bg-white border border-beige-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                      >
                        {editingId === item.id ? (
                          <div>
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sage-400 outline-none text-gray-800 resize-none"
                            />
                            <div className="flex gap-3 mt-2 justify-end">
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="text-xs text-sage-600 hover:text-sage-800"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start gap-4">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                              {item.text}
                            </p>

                            <div className="text-right flex flex-col items-end gap-2">
                              <div className="text-xs text-gray-500">
                                {formatTime(item.createdAt)}
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => navigator.clipboard?.writeText(item.text)}
                                  className="text-xs text-sage-600 hover:text-sage-800"
                                  title="Copy entry"
                                >
                                  Copy
                                </button>
                                <button
                                  onClick={() => handleEdit(item.id, item.text)}
                                  className="text-xs text-blue-500 hover:text-blue-600"
                                  title="Edit entry"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-xs text-red-500 hover:text-red-600"
                                  title="Delete entry"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.article>
                    ))}
                  </div>
                </div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
