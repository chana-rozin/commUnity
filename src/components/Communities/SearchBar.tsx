import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";


interface SearchBarProps {
  searchIcon: string;
  onSearch: (query: string) => void;
  onAddEvent: () => void;
  main: Boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIcon, onSearch, onAddEvent , main, placeholder}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl min-h-[65px] w-full max-w-[791px] px-6 py-3 gap-4">
      {/* Search Input */}
      <form
        className="flex flex-grow items-center bg-violet-50 rounded-full px-4 py-2 gap-3 mt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <CiSearch className="text-gray-500 text-xl" />
        <label htmlFor="searchInput" className="sr-only">
          חפש
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder={placeholder? placeholder : "חפש"}
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow bg-transparent text-gray-700 placeholder-gray-400 border-none focus:outline-none"
        />
      </form>

      {/* Add Event Button */}
      {!main&&<button
        onClick={onAddEvent}
        className="flex items-center justify-center px-4 py-2 bg-violet-50 text-violet-700 rounded-full hover:bg-violet-100 transition-colors"
        >
        <span className="text-2xl font-bold">+</span>
      </button>}
    </div>
  );
};

export default SearchBar;