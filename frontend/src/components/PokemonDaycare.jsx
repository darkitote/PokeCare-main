import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import PokemonSearchPopup from './PokemonSearchPopup';
import { IoIosAddCircleOutline } from 'react-icons/io';
import DaycareSearch from './DaycareSearch';
import PokemonDetailsPopup from './PokemonDetailsPopup';

const PokemonDaycare = ({ pokemons, onRemovePokemon, onMovePokemon, onAddPokemon }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([...pokemons]);

  useEffect(() => {
    const filtered = searchTerm 
      ? pokemons.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : [...pokemons];
    setFilteredPokemons(filtered);
  }, [pokemons, searchTerm]);

  const handleAddPokemon = async (pokemon) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/pokemon`, pokemon);
      onAddPokemon(response.data); // Actualiza el estado con la respuesta del backend
      setSearchTerm('');
      setShowPopup(false);
    } catch (error) {
      console.error("Error al agregar Pokémon:", error);
    }
  };

  const handleRemovePokemon = async (pokemonId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`);
      onRemovePokemon(pokemonId);
    } catch (error) {
      console.error("Error al eliminar Pokémon:", error);
    }
  };

  return (
    <div className="daycare-container">
      <div className="daycare-header">
        <div className="header-top-row">
          <h2>Guardería ({pokemons.length})</h2>
          <button 
            className="add-pokemon-btn"
            onClick={() => setShowPopup(true)}
            title="Agregar Pokémon"
          >
            <IoIosAddCircleOutline className='add-icon'/> 
          </button>
        </div>

        <DaycareSearch onSearch={setSearchTerm} currentSearch={searchTerm} />
      </div>

      {showPopup && (
        <PokemonSearchPopup
          onAddPokemon={handleAddPokemon}
          onClose={() => setShowPopup(false)}
        />
      )}

      {selectedPokemonId && (
        <PokemonDetailsPopup
          pokemonId={selectedPokemonId}
          onClose={() => setSelectedPokemonId(null)}
        />
      )}

      <div className="daycare-grid">
        {filteredPokemons.length === 0 ? (
          <p className="no-results">
            {pokemons.length === 0 
              ? 'No hay Pokémon en la guardería. ¡Agrega algunos!' 
              : 'No se encontraron Pokémon que coincidan con la búsqueda'}
          </p>
        ) : (
          filteredPokemons.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              index={index}
              onRemove={handleRemovePokemon}
              onMove={onMovePokemon}
              onClick={setSelectedPokemonId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonDaycare;
