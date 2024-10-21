import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { MagnifyingGlass } from 'phosphor-react';

const Navbar = ({ setSearchResults, setShowSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = async (query) => {
    if (query.length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const filteredResults = response.data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      const detailedResults = await Promise.all(
        filteredResults.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            id: details.data.id,
            image: details.data.sprites.other.dream_world.front_default || details.data.sprites.front_default,
          };
        })
      );
      setSearchResults(detailedResults);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  return (
    <nav className="bg-gradient-to-r from-white via-gray-100 to-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <NavLink className="flex items-center" to="/">
              <img
                className="h-12 w-auto transition-transform duration-300 transform hover:scale-125"
                src='/Logo.png'
                alt="Pokedex"
              />
            </NavLink>
          </div>

          {/* Search Input */}
          <div className="ml-auto flex items-center">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="p-2 pl-10 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 shadow-lg hover:shadow-xl"
                placeholder="Search Pokémon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;