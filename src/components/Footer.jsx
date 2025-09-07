// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#99ac87] via-[#d7dead] to-[#f4f6ea] text-[#33513f] py-6 mt-auto border-t-4 border-[#c3c984]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Manmitra. All rights reserved.
        </p>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <a href="/privacy" className="text-sm hover:text-[#556050] transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-sm hover:text-[#556050] transition-colors">
            Terms of Service
          </a>
          <a href="/contact" className="text-sm hover:text-[#556050] transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
