import { useState } from "react";
import "../styles/details.css";

function Details() {
  const [name, setName] = useState("");
  const [pokedex, setPokedex] = useState("");
  const [pokemon, setPokemon] = useState(null);

  const searchByName = () => {
    if (!name) return;

    fetch(`http://127.0.0.1:8000/pokemon/name/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => console.error(err));
  };

  const searchById = () => {
    if (!pokedex) return;

    fetch(`http://127.0.0.1:8000/pokemon/${pokedex}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="details-container">
      
      {/* 🔍 BUSCADORES */}
      <div className="search-box">
        <input
          placeholder="Buscar por nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={searchByName}>Buscar</button>

        <input
          placeholder="Buscar por número"
          value={pokedex}
          onChange={(e) => setPokedex(e.target.value)}
        />
        <button onClick={searchById}>Buscar</button>
      </div>

      {/* 🃏 CARD GRANDE */}
      {pokemon && (
        <div className="details-card">
          
          <img src={pokemon.img} alt={pokemon.name} />

          <h2>
            #{pokemon.pokedex_number} - {pokemon.name}
          </h2>

          <p className="types">
            {pokemon.type1} {pokemon.type2 !== "None" && ` / ${pokemon.type2}`}
          </p>

          <div className="stats">
            <p>HP: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Sp. Atk: {pokemon.sp_atk}</p>
            <p>Sp. Def: {pokemon.sp_def}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Total: {pokemon.total}</p>
          </div>

          <p className="lorem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

        </div>
      )}
    </div>
  );
}

export default Details;