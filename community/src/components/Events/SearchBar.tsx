import * as React from 'react';
import { SearchBarProps } from './types';

const SearchBar: React.FC<SearchBarProps> = ({ searchIcon, filterIcon }) => {
  return (
    <div className="flex overflow-hidden flex-wrap gap-10 items-center py-3 pr-3.5 pl-4 max-w-full bg-white rounded-2xl min-h-[65px] w-[731px]">
      <form className="flex grow shrink gap-2 items-center self-stretch px-4 py-2.5 my-auto text-sm tracking-tight leading-none text-gray-400 whitespace-nowrap bg-violet-50 rounded-[60px] w-[214px]">
        <img loading="lazy" src={searchIcon} alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        <label htmlFor="searchInput" className="sr-only">חפש</label>
        <input 
          id="searchInput"
          type="search"
          placeholder="חפש"
          className="self-stretch my-auto w-7 rounded-none bg-transparent border-none focus:outline-none"
        />
      </form>
      <button className="flex grow shrink gap-2 items-center self-stretch p-2.5 my-auto w-9 bg-violet-50 h-[45px] rounded-[60px]" aria-label="filter">
        <img loading="lazy" src={filterIcon} alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
      </button>
    </div>
  );
};

export default SearchBar;