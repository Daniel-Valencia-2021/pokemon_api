import { useState } from "react";
import "../styles/edit.css";

function Edit() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);

  // 🔍 BUSCADOR INTELIGENTE
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

  // ✏️ CAMBIOS EN FORM
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPokemon({
      ...pokemon,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // 💾 ACTUALIZAR
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pokemon) return;

    const payload = {
      name: pokemon.name,
      type1: pokemon.type1,
      type2: pokemon.type2,

      hp: parseInt(pokemon.hp),
      attack: parseInt(pokemon.attack),
      defense: parseInt(pokemon.defense),
      sp_atk: parseInt(pokemon.sp_atk),
      sp_def: parseInt(pokemon.sp_def),
      speed: parseInt(pokemon.speed),

      generation: parseInt(pokemon.generation),
      legendary: pokemon.legendary,

      img: pokemon.img
    };

    fetch(`http://127.0.0.1:8000/pokemon/${pokemon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          alert("Error al actualizar");
          return;
        }

        alert("Pokémon actualizado correctamente");
        console.log("UPDATED:", data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit-container">

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

      {/* 🧾 FORMULARIO */}
      {pokemon && (
        <form className="edit-card" onSubmit={handleSubmit}>
          <h2>Editar Pokémon</h2>

          <input name="name" value={pokemon.name} onChange={handleChange} />

          <input name="type1" value={pokemon.type1} onChange={handleChange} />
          <input name="type2" value={pokemon.type2} onChange={handleChange} />

          <input name="hp" type="number" placeholder={pokemon.hp} onChange={handleChange} />
          <input name="attack" type="number" placeholder={pokemon.attack} onChange={handleChange} />
          <input name="defense" type="number" placeholder={pokemon.defense} onChange={handleChange} />
          <input name="sp_atk" type="number" placeholder={pokemon.sp_atk} onChange={handleChange} />
          <input name="sp_def" type="number" placeholder={pokemon.sp_def} onChange={handleChange} />
          <input name="speed" type="number" placeholder={pokemon.speed} onChange={handleChange} />

          <input name="generation" type="number" placeholder={pokemon.generation} onChange={handleChange} />

          <input name="img" value={pokemon.img} onChange={handleChange} />

          <label className="checkbox">
            <input
              type="checkbox"
              name="legendary"
              checked={pokemon.legendary}
              onChange={handleChange}
            />
            Legendario
          </label>

          <button type="submit">Actualizar</button>
        </form>
      )}
    </div>
  );
}

export default Edit;