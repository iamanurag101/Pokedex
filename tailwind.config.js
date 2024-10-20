/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        themeWhite: '#f8f9f0',
        themeRed: '#fe1c1d',
        normal: '#A8A77A',    // Pastel Yellow Green
        fire: '#F5AC78',      // Pastel Peach
        water: '#9DB7F5',     // Pastel Blue
        electric: '#FAE078',  // Pastel Yellow
        grass: '#A7DB8D',     // Pastel Green
        ice: '#BCE6E6',       // Pastel Cyan
        fighting: '#D67873',  // Pastel Red
        poison: '#C183C1',    // Pastel Purple
        ground: '#EBD69D',    // Pastel Beige
        flying: '#C6B7F5',    // Pastel Lavender
        psychic: '#FA92B2',   // Pastel Pink
        bug: '#C6D16E',       // Pastel Olive
        rock: '#D1C17D',      // Pastel Gold
        ghost: '#A292BC',     // Pastel Violet
        dragon: '#A27DFA',    // Pastel Purple-Blue
        dark: '#A29288',      // Pastel Brown-Gray
        steel: '#D1D1E0',     // Pastel Silver
        fairy: '#F4BDC9',     // Pastel Pink     
      }
    },
  },
  plugins: [],
}
