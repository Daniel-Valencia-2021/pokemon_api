import "../styles/pokemonCard.css";


const typeColors = {
  grass: "#78c850",
  poison: "#a040a0",
  fire: "#f08030",
  water: "#6890f0",
  electric: "#f8d030",
  bug: "#a8b820",
  normal: "#a8a878",
  flying: "#a890f0",
  fighting: "#c03028",
  psychic: "#f85888",
  rock: "#b8a038",
  ghost: "#705898",
  ice: "#98d8d8",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
  ground: "#e0c068",
};

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  // 🔥 Manejo directo (SIN arrays)
  const type1 = pokemon.type1?.toLowerCase();
  const type2 =
    pokemon.type2 && pokemon.type2 !== "None"
      ? pokemon.type2.toLowerCase()
      : null;

  const mainColor = typeColors[type1] || "#333";

  return (
    <div
      className="card"
      style={{
        border: `2px solid ${mainColor}`,
      }}
    >
      {/* Imagen */}
      <div className="card-image">
        <img
          src={pokemon.img || "https://placehold.co/200x200"}
          alt={pokemon.name}
        />
      </div>

      <div className="card-content">
        {/* Número Pokédex */}
        <span className="card-category">
          #{pokemon.pokedex_number}
        </span>

        {/* Nombre */}
        <h2 className="card-title">{pokemon.name}</h2>

        {/* Tipos */}
        <div className="card-types">
          {type1 && (
            <span
              className="type"
              style={{ backgroundColor: typeColors[type1] }}
            >
              {pokemon.type1}
            </span>
          )}

          {type2 && (
            <span
              className="type"
              style={{ backgroundColor: typeColors[type2] }}
            >
              {pokemon.type2}
            </span>
          )}
        </div>

        {/* Extra */}
        <div className="extra">
          <p>Gen: {pokemon.generation}</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;