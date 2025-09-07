import { useState } from "react";

export default function Dashboard() {
  const [moods, setMoods] = useState([]);

  const addMood = (mood) => {
    setMoods([...moods, { mood, date: new Date().toLocaleDateString() }]);
  };

  return (
    <div className="pt-20 bg-beige min-h-screen px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Mood Buttons */}
      <div className="flex space-x-4 mb-8">
        {["😊 Happy", "😐 Neutral", "😢 Sad", "😡 Angry"].map((m, i) => (
          <button
            key={i}
            onClick={() => addMood(m)}
            className="px-5 py-3 bg-sage text-white rounded-full shadow hover:bg-sage-dark transition"
          >
            {m}
          </button>
        ))}
      </div>

      {/* Mood History */}
      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood History</h2>
        {moods.length === 0 ? (
          <p className="text-gray-600">No moods logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {moods.map((entry, i) => (
              <li key={i} className="flex justify-between text-gray-700">
                <span>{entry.mood}</span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
