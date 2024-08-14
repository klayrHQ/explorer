'use client';
import { useState } from 'react';
import { SearchLg } from '../../../assets/icons/general/search-lg';

export const SearchDesktop = () => {
  const [query, setQuery] = useState('');
  return (
    <div className="w-full bg-lobster flex items-center gap-4  focus:ring focus:border-blue-300">
      <div className="relative">
        <SearchLg className="ml-2 absolute top-1 left-0" />
        <input
          className="bg-lobster px-6 border rounded-md  "
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search block, user, transaction, chain, token..."
          type="text"
          value={query}
        />
      </div>
    </div>
  );
};

{
  /* <div class="w-full p-3">       
<div class="relative">
  <i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
  <input type="text" class="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" name="">
</div>
</div> */
}
