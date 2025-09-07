// src/pages/MoodTracker.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Smile, Meh, Frown, Angry, Cloud } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MoodTracker() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem("moodEntries");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("moodEntries", JSON.stringify(entries));
    } catch (e) {
      console.error("Failed to save mood entries:", e);
    }
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return;
    const newEntry = {
      id: Date.now(),
      mood,
      notes,
      date: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setMood("");
    setNotes("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this entry?")) return;
    setEntries((prev) => prev.filter((en) => en.id !== id));
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard ✅");
    } catch {
      console.warn("Clipboard copy failed");
    }
  };

  const moodIcons = {
    "😊 Happy": <Smile className="w-6 h-6 text-yellow-500" />,
    "😐 Neutral": <Meh className="w-6 h-6 text-gray-500" />,
    "😢 Sad": <Frown className="w-6 h-6 text-blue-500" />,
    "😡 Angry": <Angry className="w-6 h-6 text-red-500" />,
    "😌 Calm": <Cloud className="w-6 h-6 text-green-500" />,
  };

  const monthlyData = useMemo(() => {
    const grouped = {};
    for (const entry of entries) {
      const d = new Date(entry.date);
      if (isNaN(d)) continue;
      const month = d.toLocaleString(undefined, { month: "short", year: "numeric" });
      if (!grouped[month]) {
        grouped[month] = { month, Happy: 0, Neutral: 0, Sad: 0, Angry: 0, Calm: 0 };
      }
      if (entry.mood.includes("Happy")) grouped[month].Happy++;
      if (entry.mood.includes("Neutral")) grouped[month].Neutral++;
      if (entry.mood.includes("Sad")) grouped[month].Sad++;
      if (entry.mood.includes("Angry")) grouped[month].Angry++;
      if (entry.mood.includes("Calm")) grouped[month].Calm++;
    }
    return Object.values(grouped);
  }, [entries]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-extrabold text-[#33513f] mb-10 text-center">
        Mood Tracker
      </h1>

      {/* Mood Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 mb-12 border border-[#e7edcf]"
      >
        <label className="block mb-3 font-semibold text-[#33513f]">
          How are you feeling today?
        </label>

        <div className="flex gap-2 flex-wrap mb-4">
          {Object.keys(moodIcons).map((m) => (
            <button
              key={m}
              type="button"
              aria-label={`Select mood: ${m}`}
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-full border text-sm sm:text-base flex items-center gap-2 transition ${
                mood === m
                  ? "bg-[#99ac87] text-white border-[#99ac87]"
                  : "bg-[#f4f6ea] text-[#33513f] border-[#d7dead] hover:bg-[#e7edcf]"
              }`}
            >
              {moodIcons[m]} <span>{m.replace(/^.*\s/, "")}</span>
            </button>
          ))}
        </div>

        <textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-[#d7dead] p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#99ac87] outline-none"
          rows="3"
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => {
              setMood("");
              setNotes("");
            }}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-[#99ac87] text-white rounded-lg font-semibold hover:bg-[#7f9270] transition"
          >
            Save Mood
          </button>
        </div>
      </form>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-12 border border-[#e7edcf]">
        <h2 className="text-xl font-semibold text-[#33513f] mb-4 text-center">
          Monthly Mood Overview
        </h2>

        {monthlyData.length === 0 ? (
          <p className="text-gray-500 text-center">No mood data yet. Add entries to see trends!</p>
        ) : (
          <div className="w-full h-[260px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Happy" fill="#facc15" />
                <Bar dataKey="Neutral" fill="#9ca3af" />
                <Bar dataKey="Sad" fill="#3b82f6" />
                <Bar dataKey="Angry" fill="#ef4444" />
                <Bar dataKey="Calm" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Past Entries */}
      <h2 className="text-2xl font-bold text-[#33513f] mb-6 text-center">
        Past Entries
      </h2>

      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No entries yet. Start tracking!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {entries.map((en) => (
            <div
              key={en.id}
              className="p-5 bg-white border border-[#e7edcf] rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {moodIcons[en.mood]}{" "}
                  <div className="text-lg font-semibold text-[#33513f]">{en.mood}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(en.date).toLocaleString()}
                </div>
              </div>

              {en.notes && <p className="text-gray-700 mb-3">{en.notes}</p>}

              <div className="flex gap-3 justify-end text-sm">
                <button
                  onClick={() => handleCopy(en.notes || en.mood)}
                  className="text-[#33513f] hover:underline"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(en.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
