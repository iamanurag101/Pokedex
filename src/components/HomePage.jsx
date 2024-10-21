import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import PaginationControls from './PagignationControls';
import Modal from './Modal';
import Spinner from './Spinner';
import { PokemonContext } from './PokemonProvider';

const usePokemon = () => useContext(PokemonContext);

const HomePage = ({ searchResults, setShowSearchResults }) => {
    const { allPokemon, loading } = usePokemon();
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterType, setFilterType] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const itemsPerPage = 50;

    useEffect(() => {
        const loadData = async () => {
            if (searchResults && searchResults.length > 0) {
                setPokemonList(searchResults);
                setTotalPages(Math.ceil(searchResults.length / itemsPerPage));
            } else {
                setPokemonList(allPokemon);
                setTotalPages(Math.ceil(allPokemon.length / itemsPerPage));
            }
        };
        loadData();
    }, [searchResults, allPokemon]);

    const handleCardClick = useCallback(async (pokemon) => {
        if (!pokemon.height || !pokemon.weight) {
            try {
                const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
                pokemon = {
                    ...pokemon,
                    height: pokemonDetails?.data?.height,
                    weight: pokemonDetails?.data?.weight,
                    base_experience: pokemonDetails?.data?.base_experience,
                    types: pokemonDetails?.data?.types.map((typeInfo) => typeInfo.type.name),
                    stats: pokemonDetails.data.stats.reduce((acc, stat) => {
                        acc[stat.stat.name] = stat.base_stat;
                        return acc;
                    }, {})
                };
            } catch (error) {
                console.error('Error fetching detailed data:', error);
            }
        }
        setSelectedPokemon(pokemon);
        setShowModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setSelectedPokemon(null);
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredAndSortedPokemonList = pokemonList
        .filter(pokemon => filterType === '' || pokemon.types.includes(filterType))
        .sort((a, b) => {
            let comparison = 0;
            if (sortOption === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortOption === 'id') {
                comparison = a.id - b.id;
            } else if (sortOption === 'height') {
                comparison = a.height - b.height;
            } else if (sortOption === 'weight') {
                comparison = a.weight - b.weight;
            } else if (sortOption === 'base_experience') {
                comparison = a.base_experience - b.base_experience;
            } else if (sortOption === 'hp') {
                comparison = a.stats.hp - b.stats.hp;
            } else if (sortOption === 'attack') {
                comparison = a.stats.attack - b.stats.attack;
            } else if (sortOption === 'defense') {
                comparison = a.stats.defense - b.stats.defense;
            } else if (sortOption === 'special-attack') {
                comparison = a.stats['special-attack'] - b.stats['special-attack'];
            } else if (sortOption === 'special-defense') {
                comparison = a.stats['special-defense'] - b.stats['special-defense'];
            } else if (sortOption === 'speed') {
                comparison = a.stats.speed - b.stats.speed;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

    const paginatedPokemonList = filteredAndSortedPokemonList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col gap-5 p-5 h-full overflow-auto bg-gray-100">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <label htmlFor="filter" className="mr-2">Filter by Type:</label>
                    <select id="filter" value={filterType} onChange={handleFilterChange} className="px-2 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All</option>
                        <option value="grass">Grass</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="bug">Bug</option>
                        <option value="poison">Poison</option>
                        <option value="flying">Flying</option>
                        <option value="ground">Ground</option>
                        <option value="electric">Electric</option>
                        <option value="normal">Normal</option>
                        <option value="fairy">Fairy</option>
                        <option value="fighting">Fighting</option>
                        <option value="psychic">Psychic</option>
                        <option value="rock">Rock</option>
                        <option value="steel">Steel</option>
                        <option value="ice">Ice</option>
                        <option value="ghost">Ghost</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select id="sort" value={sortOption} onChange={handleSortChange} className="px-2 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">None</option>
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                        <option value="base_experience">Base Experience</option>
                        <option value="hp">HP</option>
                        <option value="attack">Attack</option>
                        <option value="defense">Defense</option>
                        <option value="special-attack">Special Attack</option>
                        <option value="special-defense">Special Defense</option>
                        <option value="speed">Speed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sortOrder" className="mr-2">Order:</label>
                    <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className="px-2 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <>
                    <div className="flex flex-wrap gap-5 h-full justify-center">
                        {paginatedPokemonList.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={handleCardClick} />
                        ))}
                    </div>

                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

                    {showModal && selectedPokemon && (
                        <Modal
                            pokemon={selectedPokemon}
                            closeModal={closeModal}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;