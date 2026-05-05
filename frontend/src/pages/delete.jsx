import { useState } from "react";
import "../styles/delete.css";

function Delete() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);

  // 🔍 BUSCAR
  const handleSearch = () => {
    if (!query) return;

    const isNumber = !isNaN(query);

    const url = isNumber
      ? `http://127.0.0.1:8000/pokemon/${query}`
      : `http://127.0.0.1:8000/pokemon/name/${query}`;

    fetch(url)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          alert("Pokémon no encontrado");
          setPokemon(null);
          return;
        }

        setPokemon(data);
      })
      .catch((err) => console.error(err));
  };

  // 🗑️ ELIMINAR
  const handleDelete = () => {
    if (!pokemon) return;

    const confirmDelete = window.confirm(
      `¿Seguro que quieres eliminar a ${pokemon.name}?`
    );

    if (!confirmDelete) return;

    fetch(`http://127.0.0.1:8000/pokemon/${pokemon.id}`, {
      method: "DELETE"
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          alert("Error al eliminar");
          return;
        }

        alert("Pokémon eliminado");
        setPokemon(null);
        setQuery("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="delete-container">

      {/* 🔍 BUSCADOR */}
      <div className="search-box">
        <input
          placeholder="Buscar por ID o nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* 🃏 CARD */}
      {pokemon && (
        <div className="delete-card">
          <img src={pokemon.img} alt={pokemon.name} />

          <h2>
            #{pokemon.pokedex_number} - {pokemon.name}
          </h2>

          <p>
            {pokemon.type1}{" "}
            {pokemon.type2 !== "None" && `/ ${pokemon.type2}`}
          </p>

          <button className="delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default Delete;