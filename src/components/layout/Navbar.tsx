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
    { label: "All Books", path: "/all-books" },
    { label: "Borrow Summary", path: "/borrow-summary" },
    { label: "Add Book", path: "/add-book" },
  ];

  const handleSearch = (query: string) => {
    console.log("Search:", query);
    // Future: navigate to /books?search=query or set in redux
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between h-auto py-4 gap-y-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-amber-600 text-white px-2 py-1 rounded font-bold text-lg tracking-wide">
              Beacon <span className="text-white font-light">Library</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-amber-400 transition duration-200 ${
                  pathname === link.path ? "text-amber-400 font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* SearchBar */}
          <div className="hidden lg:block">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-amber-400 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-4">
          <div className="flex flex-col space-y-2 pt-2 rounded-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-1 hover:text-amber-400 transition ${
                  pathname === link.path ? "text-amber-400 font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile SearchBar */}
            <div className="pt-2">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
