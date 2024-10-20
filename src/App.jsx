import React from 'react';
import PokeCard from './components/HomePage';
import NavBar from './components/Navbar';

const App = () => {
  return (
    <>
      <NavBar />
      <main className='bg-themeWhite font-poppins'>
        <PokeCard />
      </main>
    </>
  );
}

export default App;