import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";


interface SearchBarProps {
  searchIcon: string;
  onSearch: (query: string) => void;
  onAddEvent: () => void;
  main: Boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIcon, onSearch, onAddEvent , main}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center overflow-hidden bg-white rounded-2xl min-h-[65px] w-full max-w-[791px] px-4 py-2.5 gap-4">
      {/* Search Input */}
      <form
        className="flex grow shrink gap-2 items-center self-stretch px-4 py-2.5 text-sm tracking-tight leading-none text-gray-400 whitespace-nowrap bg-violet-50 rounded-[60px] flex-grow"
        onSubmit={(e) => e.preventDefault()}
      >
        <CiSearch className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />

        <label htmlFor="searchInput" className="sr-only">
          חפש
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="חפש"
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow self-stretch my-auto rounded-none bg-transparent border-none focus:outline-none"
        />
      </form>

      {/* Add Event Button */}
      {!main&&<button
        onClick={onAddEvent}
        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-50 text-violet-700 rounded-full hover:bg-violet-100"
      >
        <span className="text-2xl font-bold mr-1">+</span>
      </button>}
    </div>
  );
};

export default SearchBar;