import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerVertical, faWeight, faStar, faBolt, faHeart, faShieldAlt, faMagic, faShieldVirus, faTachometerAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const statRanges = {
    hp: { min: 1, max: 255 },
    attack: { min: 5, max: 190 },
    defense: { min: 5, max: 250 },
    'special-attack': { min: 10, max: 194 },
    'special-defense': { min: 20, max: 250 },
    speed: { min: 5, max: 200 },
};

const calculateBarWidth = (statName, statValue) => {
    const { min, max } = statRanges[statName];
    return ((statValue - min) / (max - min)) * 100;
};

const Modal = memo(({ pokemon: { name, image, height, weight, id }, closeModal }) => {
    const modalRef = useRef(null);
    const [additionalData, setAdditionalData] = useState(null);

    useEffect(() => {
        const fetchAdditionalData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                setAdditionalData(data);
            } catch (error) {
                console.error('Error fetching additional data:', error);
            }
        };

        fetchAdditionalData();

        document.body.style.overflow = 'hidden';

        const handleTabKey = (e) => {
            const focusableModalElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableModalElements[0];
            const lastElement = focusableModalElements[focusableModalElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        const keyListener = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'Tab') {
                handleTabKey(e);
            }
        };

        document.addEventListener('keydown', keyListener);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', keyListener);
        };
    }, [closeModal, id]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg relative w-96 z-60 border-4 border-indigo-500">
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-2xl">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">{name}</h2>
                <img src={image} alt={name} className="w-32 h-32 rounded-full object-fill mt-4 mx-auto border-4 border-indigo-500 shadow-lg" />
                <div className="mt-4 text-gray-700 text-center">
                    <p><FontAwesomeIcon icon={faRulerVertical} /> Height: {height}</p>
                    <p className="mt-2"><FontAwesomeIcon icon={faWeight} /> Weight: {weight}</p>
                </div>
                {additionalData && (
                    <div className="mt-4 text-gray-700 text-center">
                        <p><FontAwesomeIcon icon={faStar} /> Base Experience: {additionalData.base_experience}</p>
                        <p className="mt-2"><FontAwesomeIcon icon={faBolt} /> Abilities: {additionalData.abilities.map(ability => ability.ability.name).join(', ')}</p>
                        <p className="mt-2"> Stats:</p>
                        <ul className="list-disc list-inside text-center">
                            {additionalData.stats.map(stat => (
                                <ul key={stat.stat.name} className="mt-2">
                                    <FontAwesomeIcon icon={
                                        stat.stat.name === 'hp' ? faHeart :
                                        stat.stat.name === 'attack' ? faBolt :
                                        stat.stat.name === 'defense' ? faShieldAlt :
                                        stat.stat.name === 'special-attack' ? faMagic :
                                        stat.stat.name === 'special-defense' ? faShieldVirus :
                                        faTachometerAlt
                                    } /> {stat.stat.name}: {stat.base_stat}
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${calculateBarWidth(stat.stat.name, stat.base_stat)}%`, boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)' }}></div>
                                    </div>
                                </ul>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
});

Modal.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;