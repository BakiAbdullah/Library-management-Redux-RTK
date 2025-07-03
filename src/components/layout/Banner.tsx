"use client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Banner() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="https://cdn.pixabay.com/photo/2014/10/14/20/14/library-488690_1280.jpg "
        alt="Library Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 sm:px-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
          Welcome to <span className="text-amber-400">Beacon Library</span>
        </h1>
        <p className="text-lg sm:text-2xl text-gray-200 max-w-2xl mb-8 drop-shadow">
          Explore thousands of books. Borrow, read, and grow your knowledge.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/all-books">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md text-lg">
              Browse Books
            </Button>
          </Link>
          <Link to="/borrow-summary">
            <Button
              variant="outline"
              className="border-white text-amber-500 hover:bg-white/10 px-6 py-3 text-lg"
            >
              Borrow History
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
