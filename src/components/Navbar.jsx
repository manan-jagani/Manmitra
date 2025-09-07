// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ensure this exists

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="nav-gradient backdrop-blur-sm border-b border-[#d7dead] shadow-sm"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Manmitra"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                style={{ boxShadow: "0 0 14px rgba(153,172,135,0.18)" }}
              />
              <span className="font-semibold text-[#33513f] text-lg sm:text-2xl">
                Manmitra
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-[#33513f] hover:text-[#556050]">Home</Link>
              <Link to="/about" className="text-[#33513f] hover:text-[#556050]">About</Link>
              <Link to="/features" className="text-[#33513f] hover:text-[#556050]">Features</Link>
              <Link to="/therapists" className="text-[#33513f] hover:text-[#556050]">Therapists</Link>
              <Link to="/contact" className="text-[#33513f] hover:text-[#556050]">Contact</Link>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center">
              <Link to="/login" className="mr-3 text-sm text-[#33513f]">Login</Link>

              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
                className="p-2 rounded-md inline-flex items-center justify-center hover:bg-white/10"
              >
                {/* icon */}
                <svg className="w-6 h-6 text-[#33513f]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {open ? (
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (slide down) */}
        <div
          className={`md:hidden transform-gpu transition-all duration-300 origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
          style={{ transformOrigin: "top" }}
        >
          <div className="px-4 pb-6 pt-2 space-y-2 bg-white/60 backdrop-blur-sm border-t border-[#e7edcf]">
            <Link to="/" onClick={() => setOpen(false)} className="block py-2 text-[#33513f]">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block py-2 text-[#33513f]">About</Link>
            <Link to="/features" onClick={() => setOpen(false)} className="block py-2 text-[#33513f]">Features</Link>
            <Link to="/therapists" onClick={() => setOpen(false)} className="block py-2 text-[#33513f]">Therapists</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block py-2 text-[#33513f]">Contact</Link>
            <div className="pt-2 border-t border-[#e7edcf]">
              <Link to="/login" onClick={() => setOpen(false)} className="block py-2 text-[#33513f] font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
