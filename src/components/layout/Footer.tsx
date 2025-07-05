import { Dribbble, Facebook, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-100 mt-20 pt-12 pb-6 border-t border-slate-300">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-wrap justify-between text-left md:text-left">
          {/* Contact Section */}
          <div className="w-full md:w-6/12 px-4 mb-10 md:mb-0">
            <h4 className="text-2xl font-bold text-slate-800">
              Stay Connected
            </h4>
            <p className="text-slate-600 mt-2">
              Reach us on social platforms. We usually respond within 1-2
              business days.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Twitter">
                <Twitter className="w-6 h-6 text-sky-500 hover:text-sky-600 transition" />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-700 transition" />
              </a>
              <a href="#" aria-label="Dribbble">
                <Dribbble className="w-6 h-6 text-pink-500 hover:text-pink-600 transition" />
              </a>
              <a href="#" aria-label="Github">
                <Github className="w-6 h-6 text-gray-800 hover:text-black transition" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="w-full md:w-6/12 flex flex-wrap">
            {/* Useful Links */}
            <div className="w-full sm:w-6/12 px-4 mb-6">
              <h5 className="uppercase text-sm font-semibold text-slate-600 mb-3">
                Library Links
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    About Library
                  </a>
                </li>
                <li>
                  <a
                    href="/books"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    Browse Books
                  </a>
                </li>
                <li>
                  <a
                    href="/borrow-history"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    Borrow History
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Policy Links */}
            <div className="w-full sm:w-6/12 px-4">
              <h5 className="uppercase text-sm font-semibold text-slate-600 mb-3">
                Policies & Info
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/guidelines"
                    className="text-slate-600 hover:text-slate-800 transition text-sm"
                  >
                    Library Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-slate-300" />

        {/* Copyright Section */}
        <div className="text-center text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} Library Management System by Baki
          Abdullah
        </div>
      </div>
    </footer>
  );
}
