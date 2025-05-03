import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetailsPopup = ({ pokemonId, onClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.REACT_APP_BASE_URL || 'http://poke-care-backend:3000/api/pokemon'}/${pokemonId}`;
        const response = await axios.get(apiUrl);
        setPokemonDetails(response.data);
      } catch (err) {
        setError('Error al cargar los detalles del Pokémon');
        console.error("Error en API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (loading) return <div className="popup-loading">Cargando...</div>;
  if (error) return <div className="popup-error">{error}</div>;

  return (
    <div className="pokemon-details-popup">
      <button className="close-popup" onClick={onClose}>×</button>
      <h2>{pokemonDetails.name}</h2>
      <img src={pokemonDetails.sprites?.front_default} alt={pokemonDetails.name} />
    </div>
  );
};

export default PokemonDetailsPopup;
