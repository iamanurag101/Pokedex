import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Importing the Modal component

const PokeCard = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null); // For handling the selected Pokémon
    const [showModal, setShowModal] = useState(false); // For modal visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20'); // Fetch first 20 Pokémon
                const pokemonData = await Promise.all(
                    response.data.results.map(async (pokemon) => {
                        const pokemonDetails = await axios.get(pokemon.url);
                        return {
                            id: pokemonDetails.data.id,
                            name: pokemonDetails.data.name,
                            image: pokemonDetails.data.sprites.front_default,
                            height: pokemonDetails.data.height,
                            weight: pokemonDetails.data.weight,
                            types: pokemonDetails.data.types.map((typeInfo) => typeInfo.type.name) // Get Pokémon types
                        };
                    })
                );
                setPokemonList(pokemonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle clicking on a Pokémon card
    const handleCardClick = (pokemon) => {
        setSelectedPokemon(pokemon);
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedPokemon(null);
    };


    return (
        <div className="flex flex-col gap-5 p-5 h-full overflow-auto">
            <div className="flex flex-col gap-5 h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pokemonList.map((pokemon) => (
                        <div
                            key={pokemon.id}
                            className="relative cursor-pointer"
                            onClick={() => handleCardClick(pokemon)} // Open modal on click
                        >
                            {/* Shadow div for the offset shadow */}
                            <div className="absolute top-[8px] left-[8px] w-full h-full bg-black rounded-lg z-[-1] opacity-20"></div>

                            {/* Main card with background and hover effect */}
                            <div className="relative bg-white border border-black rounded-lg w-[300px] p-5 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:translate-y-[-2px]">
                                {/* Pokemon Image */}
                                <img
                                    className="w-40 h-40 rounded-full object-cover border-4 border-white mt-16 z-10 relative"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                />
                                {/* Content */}
                                <div className="mt-4 text-gray-800 z-20">
                                    <div className="font-semibold capitalize">{pokemon.name}</div>
                                    <div>#{pokemon.id.toString().padStart(4, "0")}</div>
                                    
                                    {/* Display Pokémon types */}
                                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                                        {pokemon.types.map((type) => (
                                            <span
                                                key={type}
                                                className={`px-3 py-1 text-sm font-semibold capitalize rounded-full`}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedPokemon && (
                <Modal
                    pokemon={selectedPokemon} // Pass selected Pokémon data to the Modal
                    closeModal={closeModal}   // Pass the close function to the Modal
                />
            )}
        </div>
    );
};

export default PokeCard;
