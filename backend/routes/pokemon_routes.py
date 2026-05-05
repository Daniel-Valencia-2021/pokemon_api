
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi import Query
from sqlalchemy.orm import Session
from db.conexion import SessionLocal
from schemas.pokemon_schema import PokemonCreate, PokemonResponse, PokemonUpdate
from db.conexion import SessionLocal
import services.pokemon_service as pokemon_service
from typing import Optional, List


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/pokemon",  # Esto significa que todas las rutas que definamos aquí empezarán con "/pokemon"
    tags=["pokemon"]  # Esto es solo para organizar nuestras rutas, no afecta el funcionamiento
)

#fake database de pokemons, esto es solo un ejemplo, en una aplicación real podríamos conectar a una base de datos real

# Aquí hay otro endpoint, para "/pokemon/"
@router.get("/", response_model=List[PokemonResponse])
def get_pokemons(
    skip: int = 0,
    limit: int = Query(10, le=100),  # máximo 100
    name: Optional[str] = None,
    type1: Optional[str] = None,
    min_attack: Optional[int] = None,
    max_attack: Optional[int] = None,
    legendary: Optional[bool] = None,
    order_by: str = "id",
    order_dir: str = "asc",
    db: Session = Depends(get_db)
):
    return pokemon_service.get_pokemons(
        db,
        skip,
        limit,
        name,
        type1,
        min_attack,
        max_attack,
        legendary,
        order_by,
        order_dir
    )

@router.get("/random", response_model=PokemonResponse)
def get_random_pokemon(db: Session = Depends(get_db)):
    pokemon = pokemon_service.get_random_pokemon(db)
    
    if not pokemon:
        raise HTTPException(status_code=404, detail="No se encontraron pokemons")
    
    return pokemon

# Aqui un endpoint para recibir un pokemon por su id y devolver su información, esta id se pasará como un parámetro en la URL
@router.get("/{pokemon_id}", response_model=PokemonResponse)
def get_pokemon(pokemon_id: int, db: Session = Depends(get_db)):
    pokemon = pokemon_service.get_pokemon_by_id(db, pokemon_id)
    
    if not pokemon:
        raise HTTPException(status_code=404, detail="Pokemon no encontrado")
    
    return pokemon

# Ahora buscamos a un pokemon por su nombre, esta vez el nombre se pasará como un parámetro en la URL
@router.get("/name/{pokemon_name}", response_model=PokemonResponse)
def get_pokemon_by_name(pokemon_name: str, db: Session = Depends(get_db)):
    pokemon = pokemon_service.get_pokemon_by_name(db, pokemon_name)
    
    if not pokemon:
        raise HTTPException(status_code=404, detail="Pokemon no encontrado")
    
    return pokemon

@router.patch("/{pokemon_id}", response_model=PokemonResponse)
def update_pokemon(
    pokemon_id: int,
    pokemon: PokemonUpdate,
    db: Session = Depends(get_db)
):
    updated_pokemon = pokemon_service.update_pokemon(
        db,
        pokemon_id,
        pokemon.model_dump(exclude_unset=True)
    )

    if not updated_pokemon:
        raise HTTPException(status_code=404, detail="Pokemon no encontrado")

    return updated_pokemon

# Endpoint para agregar un nuevo pokemon a la lista, este pokemon se pasará como un cuerpo de la petición (request body)

@router.post("/", response_model=PokemonResponse)
def add_pokemon(pokemon: PokemonCreate, db: Session = Depends(get_db)):
    new_pokemon = pokemon_service.add_pokemon(db, pokemon.model_dump())

    if not new_pokemon:
        raise HTTPException(status_code=400, detail="Error al crear el pokemon")

    return new_pokemon

@router.delete("/{pokemon_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pokemon(
    pokemon_id: int,
    db: Session = Depends(get_db)
):
    deleted = pokemon_service.delete_pokemon(db, pokemon_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Pokemon no encontrado")

    # 🔥 204 = No Content → no se devuelve body
    return Response(status_code=status.HTTP_204_NO_CONTENT)