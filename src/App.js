import React, { useState } from "react";
import { motion } from "framer-motion"; // Animation Library

// cimport React, { useState } from "react";

// Functional component 'App' - This is the main component of our React application.
const App = () => {
  // State to store the Pokémon data (name and image URL)
  const [pokemon, setPokemon] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to fetch Pokémon data
  const fetchPokemon = async () => {
    // Generate a random number between 1 and 100
    const randomId = Math.floor(Math.random() * 100) + 1;

    // Start loading before fetching data
    setLoading(true);

    try {
      // Fetch data from Pokémon API
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      // Update the state with the Pokémon data
      setPokemon({
        name: data.name, // Pokémon name
        image: data.sprites.other["official-artwork"].front_default, // HD Image
      });

    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      // Stop loading after fetching data
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Pokémon Randomizer</h1>

      {/* Button to fetch a new Pokémon */}
      <button onClick={fetchPokemon} style={styles.button}>
        Get Random Pokémon
      </button>

      {/* Show loading indicator when fetching */}
      {loading && <p>Loading...</p>}

      {/* Display Pokémon if available */}
      <div> {pokemon && (
        <div style={styles.card}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.image} alt={pokemon.name} style={styles.image} />
        </div>
      )}</div>
     
    </div>
  );
};

// Simple CSS Styling using JavaScript object
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "50px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ffcb05",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    border: "2px solid black",
    display: "inline-block",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "200px",
    height: "200px",
    marginTop: "10px",
  },
};

export default App;
