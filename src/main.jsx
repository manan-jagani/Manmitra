// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/animations.css"; // global animations, nav-gradient, hero blobs, etc.

/* Small scroll-to-top on route change helper */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // smooth scroll but respect users who prefer reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}

/* Simple spinner fallback for Suspense */
function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e7edcf] to-[#f4f6ea]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        <span className="text-sm text-[#33513f]">Loading…</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense fallback={<Loader />}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
