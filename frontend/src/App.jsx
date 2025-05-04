import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PokemonDaycare from './components/PokemonDaycare';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);

  // Cargar Pokémon desde el backend al inicio
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon`);
        setPokemons(response.data);
      } catch (error) {
        console.error("Error al obtener Pokémon:", error);
      }
    };

    fetchPokemons();
  }, []);

  const addPokemon = async (pokemonData) => {
    if (pokemons.some(p => p.id === pokemonData.id)) {
      alert('Este Pokémon ya está en la guardería');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/pokemon`, pokemonData);
      setPokemons(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Error al agregar Pokémon:", error);
    }
  };

  const removePokemon = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pokemon/${id}`);
      setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
    } catch (error) {
      console.error("Error al eliminar Pokémon:", error);
    }
  };

  const movePokemon = (dragIndex, hoverIndex) => {
    const draggedPokemon = pokemons[dragIndex];
    const updatedPokemons = [...pokemons];
    updatedPokemons.splice(dragIndex, 1);
    updatedPokemons.splice(hoverIndex, 0, draggedPokemon);
    setPokemons(updatedPokemons);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <title>PokeCare</title>
        <header className="app-header">
          <h1>Guardería Pokémon</h1>
        </header>

        <div className="main-content">
          <PokemonDaycare 
            pokemons={pokemons} 
            onRemovePokemon={removePokemon} 
            onMovePokemon={movePokemon}
            onAddPokemon={addPokemon}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
