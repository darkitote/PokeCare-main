import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const PokemonCard = ({ pokemon, index, onRemove, onMove, onClick }) => {
  const cardRef = useRef(null);

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
      if (!draggedItem || draggedItem.index === index) return;
      onMove(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  drag(drop(cardRef));

  return (
    <div ref={cardRef} className={`pokemon-card ${isDragging ? 'dragging' : ''}`} onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
      <h3>{pokemon.name}</h3>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove(pokemon.id);
        }} 
        className="remove-btn" 
        aria-label={`Liberar a ${pokemon.name}`}
      >
        Liberar
      </button>
    </div>
  );
};

export default PokemonCard;
