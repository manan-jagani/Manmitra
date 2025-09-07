// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";           // make sure this file exists and exact casing matches
import Journal from "./pages/Journal";
import MoodTracker from "./pages/MoodTracker";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/LoginPage";
import Therapists from "./pages/Therapists"; // ensure file exists (case-sensitive)

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-beige-50 to-sage-50">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />                {/* ← added */}
          <Route path="/journal" element={<Journal />} />
          <Route path="/moodtracker" element={<MoodTracker />} />     {/* keep both if you used both links */}
          <Route path="/mood-tracker" element={<MoodTracker />} />    {/* alias for older links */}
          <Route path="/features" element={<Features />} />
          <Route path="/therapists" element={<Therapists />} />      {/* ← added */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* wildcard: redirect unknown paths to home (prevents the repeated "No routes matched location" spam) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
