"use client";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import SearchBar from "./Searchbar";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Books", path: "/books" },
    { label: "Borrow", path: "/borrow" },
    {label: "About", path: "/about" },
  ];

  const handleSearch = (query: string) => {
    console.log("Search:", query);
    // Future: navigate to /books?search=query or set in redux
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="bg-amber-600 text-white px-2 py-1 rounded font-bold text-lg tracking-wide">
                Beacon <span className="text-white font-light">Library</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex space-x-6 mr-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover:text-amber-400 transition ${
                    pathname === link.path ? "text-amber-400 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Mobile Toggler */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-amber-400 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2 mt-2 bg-gray-700 rounded-md p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`hover:text-amber-400 transition ${
                  pathname === link.path ? "text-amber-400 font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
