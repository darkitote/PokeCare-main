import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import PokemonSearchPopup from './PokemonSearchPopup';
import { IoIosAddCircleOutline } from 'react-icons/io';
import DaycareSearch from './DaycareSearch';
import PokemonDetailsPopup from './PokemonDetailsPopup';

const PokemonDaycare = ({ pokemons, onRemovePokemon, onMovePokemon, onAddPokemon }) => {
  const [popupType, setPopupType] = useState(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  // Optimizar el filtro de búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPokemons(pokemons);
    } else {
      setFilteredPokemons(pokemons.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [pokemons, searchTerm]);

  return (
    <div className="daycare-container">
      <div className="daycare-header">
        <div className="header-top-row">
          <h2>Guardería ({pokemons.length})</h2>
          <button 
            className="add-pokemon-btn"
            onClick={() => setPopupType("add")}
            title="Agregar Pokémon"
            aria-label="Agregar Pokémon a la guardería"
          >
            <IoIosAddCircleOutline className="add-icon"/>
          </button>
        </div>

        <DaycareSearch onSearch={setSearchTerm} currentSearch={searchTerm} />
      </div>

      {popupType === "add" && (
        <PokemonSearchPopup
          onAddPokemon={(pokemon) => {
            onAddPokemon(pokemon);
            setPopupType(null);
          }}
          onClose={() => setPopupType(null)}
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
              onRemove={onRemovePokemon}
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
