import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearchPopup = ({ onAddPokemon, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const searchPokemon = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setError(null); // Limpia errores previos

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      setSearchResults([response.data]);
    } catch (error) {
      setSearchResults([]);
      setError('Pokémon no encontrado');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdd = async (pokemon) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/pokemon`, {
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
      });

      onAddPokemon(pokemon);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      setError('Error al agregar Pokémon.');
      console.error('Error en la API:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="search-popup">
        <button className="close-popup" onClick={onClose}>×</button>
        <h3>Buscar Pokémon para agregar</h3>
        <div className="popup-search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nombre o número"
            onKeyPress={(e) => e.key === 'Enter' && searchPokemon()}
          />
          <button onClick={searchPokemon} disabled={isSearching}>
            {isSearching ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {searchResults.length > 0 && (
          <div className="popup-search-results">
            {searchResults.map((pokemon) => (
              <div key={pokemon.id} className="popup-pokemon-result">
                <img 
                  src={pokemon.sprites.front_default} 
                  alt={pokemon.name} 
                />
                <h4>{pokemon.name}</h4>
                <button onClick={() => handleAdd(pokemon)}>
                  Agregar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonSearchPopup;
