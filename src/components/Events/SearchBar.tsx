import React, { useState } from 'react';

interface SearchBarProps {
  searchIcon: string;
  filterIcon: string;
  onSearch: (query: string) => void; // Function to handle search queries
  onFilter?: () => void;            // Optional function to handle filter action
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIcon, filterIcon, onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update local state
    onSearch(e.target.value);       // Trigger parent's search handler
  };

  const handleFilterClick = () => {
    if (onFilter) {
      onFilter(); // Trigger parent's filter handler
    }
  };

  return (
    <div className="flex overflow-hidden flex-wrap gap-10 items-center py-3 pr-3.5 pl-4 max-w-full bg-white rounded-2xl min-h-[65px] w-[731px]">
      {/* Search Input */}
      <form
        className="flex grow shrink gap-2 items-center self-stretch px-4 py-2.5 my-auto text-sm tracking-tight leading-none text-gray-400 whitespace-nowrap bg-violet-50 rounded-[60px] w-[214px]"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
      >
        <img
          loading="lazy"
          src={searchIcon}
          alt="Search Icon"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
        />
        <label htmlFor="searchInput" className="sr-only">
          חפש
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="חפש"
          value={searchQuery} // Bind input value to state
          onChange={handleSearchChange} // Update query on change
          className="self-stretch my-auto w-7 rounded-none bg-transparent border-none focus:outline-none"
        />
      </form>

      {/* Filter Button */}
      <button
        className="flex grow shrink gap-2 items-center self-stretch p-2.5 my-auto w-9 bg-violet-50 h-[45px] rounded-[60px]"
        aria-label="filter"
        onClick={handleFilterClick} // Trigger filter action
      >
        <img
          loading="lazy"
          src={filterIcon}
          alt="Filter Icon"
          className="object-contain self-stretch my-auto w-6 aspect-square"
        />
      </button>
    </div>
  );
};

export default SearchBar;
