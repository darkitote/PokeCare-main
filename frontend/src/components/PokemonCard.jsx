import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import axios from 'axios';

const PokemonCard = ({ pokemon, index, onRemove, onMove, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'POKEMON',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'POKEMON',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleRemove = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pokemon/${pokemon.id}`);
      onRemove(pokemon.id); // Actualiza la lista después de eliminar en el backend
    } catch (error) {
      console.error("Error al eliminar Pokémon:", error);
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`pokemon-card ${isDragging ? 'dragging' : ''}`}
      onClick={() => onClick(pokemon.id)}
    >
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="pokemon-image"
      />
      <h3>{pokemon.name}</h3>
      <button onClick={handleRemove} className="remove-btn">
        Liberar
      </button>
    </div>
  );
};

export default PokemonCard;
