// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ensure this file exists

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="nav-gradient h-16 flex items-center border-b border-[#d7dead] shadow-md"
        style={{ minHeight: "64px" }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Manmitra"
              className="w-16 h-16 sm:w-12 sm:h-12 rounded-full border-3 border-white"
              style={{ boxShadow: "0 0 12px rgb(255, 255, 255)" }}
            />
            <span className="font-semibold text-[#33513f] text-lg sm:text-2xl">
              Manmitra
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link to="/" className="text-[#33513f] hover:text-[#556050]">
              Home
            </Link>
            <Link to="/about" className="text-[#33513f] hover:text-[#556050]">
              About
            </Link>
            <Link to="/features" className="text-[#33513f] hover:text-[#556050]">
              Features
            </Link>
            <Link
              to="/therapists"
              className="text-[#33513f] hover:text-[#556050]"
            >
              Therapists
            </Link>
            <Link to="/contact" className="text-[#33513f] hover:text-[#556050]">
              Contact
            </Link>
            <Link to="/login" className="text-[#33513f] hover:text-[#556050]">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-[#33513f]"
                viewBox="0 0 24 24"
                fill="none"
              >
                {open ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden transform transition-all duration-300 origin-top ${
          open
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-3 bg-[#f4f6ea] border-t border-[#e7edcf] shadow-inner">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block text-[#33513f] font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block text-[#33513f] font-medium"
          >
            About
          </Link>
          <Link
            to="/features"
            onClick={() => setOpen(false)}
            className="block text-[#33513f] font-medium"
          >
            Features
          </Link>
          <Link
            to="/therapists"
            onClick={() => setOpen(false)}
            className="block text-[#33513f] font-medium"
          >
            Therapists
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-[#33513f] font-medium"
          >
            Contact
          </Link>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-[#33513f] font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
