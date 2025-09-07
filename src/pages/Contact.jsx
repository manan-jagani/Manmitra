// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div
      className="pt-24 min-h-screen px-6 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #f4f6ea 0%, #e7edcf 100%)",
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c3c984] opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-[#99ac87] opacity-20 rounded-full blur-3xl"></div>

        <h1
          className="text-4xl font-extrabold mb-4 relative inline-block"
          style={{ color: "#33513f" }}
        >
          Contact Us
          <span className="block h-1 w-20 bg-[#c3c984] mt-2 rounded"></span>
        </h1>

        <p className="text-lg mb-10" style={{ color: "#556050" }}>
          Have questions, feedback, or need help? Fill out the form below and
          we’ll get back to you soon.
        </p>

        <form className="space-y-6 relative z-10">
          {/* Name */}
          <div>
            <label className="block font-medium mb-2" style={{ color: "#33513f" }}>
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-[#d7dead] bg-[#f4f6ea] focus:outline-none focus:ring-2 focus:ring-[#99ac87] transition"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2" style={{ color: "#33513f" }}>
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border border-[#d7dead] bg-[#f4f6ea] focus:outline-none focus:ring-2 focus:ring-[#99ac87] transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-2" style={{ color: "#33513f" }}>
              Message
            </label>
            <textarea
              rows="5"
              className="w-full p-3 rounded-lg border border-[#d7dead] bg-[#f4f6ea] focus:outline-none focus:ring-2 focus:ring-[#99ac87] transition"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #99ac87, #c3c984)",
              color: "#f4f6ea",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
