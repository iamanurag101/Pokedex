import React, { useState } from 'react';
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import { PokemonProvider } from './components/PokemonProvider';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <PokemonProvider>
      <NavBar setSearchResults={setSearchResults} setShowSearchResults={setShowSearchResults} />
      <main className='bg-themeWhite font-poppins'>
        <HomePage searchResults={searchResults} setShowSearchResults={setShowSearchResults} />
      </main>
    </PokemonProvider>
  );
}

export default App;