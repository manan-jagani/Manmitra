// src/pages/Therapists.jsx
import { useState } from "react";

const sampleTherapists = [
  { name: "Dr. Asha Rao", speciality: "Cognitive Behavioral Therapy (CBT)" },
  { name: "Mr. Rohit Singh", speciality: "Counselling" },
  { name: "Dr. Priya Mehta", speciality: "Clinical Psychologist" },
];

export default function Therapists() {
  const [bookings, setBookings] = useState([]);
  const [therapist, setTherapist] = useState(sampleTherapists[0].name);
  const [date, setDate] = useState("");

  const book = (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date and time!");
    setBookings((prev) => [
      {
        id: Date.now(),
        therapistName: therapist,
        date,
        paid: false,
      },
      ...prev,
    ]);
    setDate("");
  };

  return (
    <div
      className="min-h-screen pt-20 px-6 py-12"
      style={{
        background: "linear-gradient(180deg, #e7edcf 0%, #f4f6ea 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#33513f] mb-8 text-center">
          Book a Session with Therapists
        </h1>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-12 border border-[#d7dead]">
          <form onSubmit={book} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-[#33513f]">
                Choose Therapist
              </label>
              <select
                value={therapist}
                onChange={(e) => setTherapist(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#c3c984] focus:ring-2 focus:ring-[#99ac87] focus:outline-none"
              >
                {sampleTherapists.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} — {t.speciality}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#33513f]">
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#c3c984] focus:ring-2 focus:ring-[#99ac87] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#99ac87] text-white rounded-lg font-semibold hover:bg-[#7f906d] transition shadow"
            >
              Book Session
            </button>
          </form>
        </div>

        {/* Past Bookings */}
        <h2 className="text-2xl font-bold text-[#33513f] mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">
            No sessions booked yet. Start by scheduling one above.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-[#d7dead] rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-[#33513f]">
                    {b.therapistName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(b.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-[#556050]">
                  Session Status:{" "}
                  <span className="font-medium">
                    {b.paid ? "Paid" : "Pending Payment"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
