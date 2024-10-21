import React, { memo } from 'react';
import { FaLeaf, FaFire, FaTint, FaBug, FaSkullCrossbones, FaFeather, FaMountain, FaBolt, FaCircle, FaMagic, FaFistRaised, FaBrain, FaGem, FaShieldAlt, FaSnowflake, FaGhost, FaDragon, FaMoon } from 'react-icons/fa';

const typeColors = {
    grass: 'bg-green-200',
    fire: 'bg-red-200',
    water: 'bg-blue-200',
    bug: 'bg-green-300',
    poison: 'bg-purple-200',
    flying: 'bg-indigo-200',
    ground: 'bg-yellow-200',
    electric: 'bg-yellow-300',
    normal: 'bg-gray-200',
    fairy: 'bg-pink-200',
    fighting: 'bg-red-300',
    psychic: 'bg-pink-300',
    rock: 'bg-gray-400',
    steel: 'bg-gray-500',
    ice: 'bg-blue-300',
    ghost: 'bg-purple-300',
    dragon: 'bg-indigo-300',
    dark: 'bg-gray-600',
};

const typeIcons = {
    grass: <FaLeaf />,
    fire: <FaFire />,
    water: <FaTint />,
    bug: <FaBug />,
    poison: <FaSkullCrossbones />,
    flying: <FaFeather />,
    ground: <FaMountain />,
    electric: <FaBolt />,
    normal: <FaCircle />,
    fairy: <FaMagic />,
    fighting: <FaFistRaised />,
    psychic: <FaBrain />,
    rock: <FaGem />,
    steel: <FaShieldAlt />,
    ice: <FaSnowflake />,
    ghost: <FaGhost />,
    dragon: <FaDragon />,
    dark: <FaMoon />,
};

const PokemonCard = memo(({ pokemon, onClick }) => (
    <div
        key={pokemon.id}
        className="relative cursor-pointer shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-2xl overflow-hidden"
        onClick={() => onClick(pokemon)}
    >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 z-[-1]"></div>
        <div className="relative bg-white border border-gray-300 rounded-2xl w-[300px] p-6 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:translate-y-[-4px]">
            <div className="relative mt-16 z-10 w-40 h-40 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 to-green-500 p-1 shadow-lg">
                <img
                    className="w-full h-full rounded-full object-fill"
                    src={pokemon.image}
                    alt={pokemon.name}
                />
            </div>
            <div className="mt-4 text-gray-800 z-20">
                <div className="font-semibold capitalize text-lg tracking-wide text-shadow-md">{pokemon.name}</div>
                <div className="text-gray-500" style={{ fontFamily: 'Courier New, Courier, monospace'}}>
                  #{pokemon.id.toString().padStart(4, "0")}
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {(pokemon.types || []).map((type) => (
                        <span
                            key={type}
                            className={`px-3 py-1 text-sm font-semibold capitalize rounded-full ${typeColors[type] || 'bg-gray-200'} flex items-center gap-1 shadow-md border border-gray-300`}
                        >
                            {typeIcons[type]} {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
));

export default PokemonCard;