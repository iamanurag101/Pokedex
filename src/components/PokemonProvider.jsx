import React, { useEffect, useState, useCallback, createContext } from 'react';
import axios from 'axios';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const allPokemonData = [];
      for (let offset = 0; offset < 1320; offset += 50) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
              id: pokemonDetails?.data.id,
              name: pokemonDetails.data.name,
              image: pokemonDetails.data.sprites.other.dream_world.front_default || pokemonDetails.data.sprites.front_default,
              height: pokemonDetails.data.height,
              weight: pokemonDetails.data.weight,
              base_experience: pokemonDetails.data.base_experience,
              types: pokemonDetails.data.types.map((typeInfo) => typeInfo.type.name),
              stats: pokemonDetails.data.stats.reduce((acc, stat) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc;
              }, {})
            };
          })
        );
        allPokemonData.push(...pokemonData);
      }
      setAllPokemon(allPokemonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  return (
    <PokemonContext.Provider value={{ allPokemon, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonProvider, PokemonContext };

// Custom hook to use Pokemon context
const usePokemon = () => useContext(PokemonContext);

export default usePokemon;