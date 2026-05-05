import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import "../styles/home.css";

function Home() {
  const [randomPokemon, setRandomPokemon] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pokemon/random")
      .then((res) => res.json())
      .then((data) => setRandomPokemon(data))
      .catch((err) => console.error(err));
  }, [location.pathname]);

  return (
    <div className="home-container">
      
      {/* CARD ARRIBA */}
      <div className="card-container">
        {randomPokemon ? (
          <PokemonCard pokemon={randomPokemon} />
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      {/* TEXTO ABAJO */}
      <div className="home-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>

    </div>
  );
}

export default Home;