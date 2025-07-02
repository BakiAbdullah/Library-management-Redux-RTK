"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-xs"
    >
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-1.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-800"
      />
      <button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md flex items-center text-sm"
      >
        <Search size={16} className="mr-1" />
        Search
      </button>
    </form>
  );
}
