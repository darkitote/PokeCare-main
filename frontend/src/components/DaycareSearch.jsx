import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaycareSearch = ({ onSearch, currentSearch }) => {
  const [inputValue, setInputValue] = useState(currentSearch);
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInputValue(currentSearch);
  }, [currentSearch]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
    await fetchPokemon(value);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
    setPokemonData(null);
  };

  const fetchPokemon = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error obteniendo Pokémon:", error);
      setError("No se pudo obtener el Pokémon.");
    }
  };

  return (
    <div className="daycare-search">
      <input
        type="text"
        placeholder="Buscar Pokémon en guardería..."
        value={inputValue}
        onChange={handleChange}
        className="search-input"
      />
      {inputValue && (
        <button onClick={handleClear} className="clear-search-btn">
          ×
        </button>
      )}

      {pokemonData && (
        <div className="pokemon-info">
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DaycareSearch;
