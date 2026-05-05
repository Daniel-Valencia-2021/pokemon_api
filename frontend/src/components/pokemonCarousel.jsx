import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/swiper.css";

import PokemonCard from "./PokemonCard";

function PokemonCarousel({ pokemons = [] }) {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {pokemons.map((pokemon) => (
        <SwiperSlide key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default PokemonCarousel;