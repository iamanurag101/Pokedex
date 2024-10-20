import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-orange text-white rounded-md px-3 py-2'
      : 'text-white rounded-md px-3 py-2';

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
            image: details.data.sprites.front_default,
          };
        })
      );
      setSearchResults(detailedResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <>
      <nav className="bg-themeWhite border-b border-black">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              {/* <!-- Logo --> */}
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img
                  className="h-10 w-auto"
                  src='/Logo.png'
                  alt="Pokedex"
                />
              </NavLink>
              {/* Search Input */}
              <input
                type="text"
                className="ml-4 p-2 rounded-md border border-gray-300"
                placeholder="Search Pokémon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full max-w-md">
              <ul>
                {searchResults.map((pokemon) => (
                  <li
                    key={pokemon.name}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handlePokemonClick(pokemon)}
                  >
                    {pokemon.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
      {/* Selected Pokémon Details */}
      {selectedPokemon && (
        <div className="selected-pokemon-details p-4">
          <h2 className="text-2xl font-bold">{selectedPokemon.name}</h2>
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          <p>ID: {selectedPokemon.id}</p>
        </div>
      )}
    </>
  );
};

export default Navbar;