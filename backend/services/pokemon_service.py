from sqlalchemy.orm import Session
from sqlalchemy import asc, desc, func
from models.pokemon_model import Pokemon

def get_all_pokemons(db: Session):
    return db.query(Pokemon).filter(Pokemon.is_active == True).all()

def get_pokemons(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    name: str = None,
    type1: str = None,
    min_attack: int = None,
    max_attack: int = None,
    legendary: bool = None,
    order_by: str = "id",
    order_dir: str = "asc"
):
    query = db.query(Pokemon).filter(Pokemon.is_active == True)

    # 🔍 FILTROS
    if name:
        query = query.filter(Pokemon.name.ilike(f"%{name}%"))

    if type1:
        query = query.filter(Pokemon.type1 == type1)

    if min_attack is not None:
        query = query.filter(Pokemon.attack >= min_attack)

    if max_attack is not None:
        query = query.filter(Pokemon.attack <= max_attack)

    if legendary is not None:
        query = query.filter(Pokemon.legendary == legendary)

    # 🔽 ORDENAMIENTO
    if hasattr(Pokemon, order_by):
        column = getattr(Pokemon, order_by)
        if order_dir == "desc":
            query = query.order_by(desc(column))
        else:
            query = query.order_by(asc(column))

    # 📄 PAGINACIÓN
    return query.offset(skip).limit(limit).all()

def get_random_pokemon(db: Session):
    return db.query(Pokemon)\
        .filter(Pokemon.is_active == True)\
        .order_by(func.random())\
        .first()

def get_pokemon_by_id(db: Session, pokemon_id: int):
    return db.query(Pokemon).filter(
        Pokemon.id == pokemon_id,
        Pokemon.is_active == True
    ).first() 

def get_pokemon_by_name(db: Session, pokemon_name: str):
    return db.query(Pokemon).filter(
        Pokemon.name.ilike(f"%{pokemon_name}%"),
        Pokemon.is_active == True
    ).first()

def update_pokemon(db: Session, pokemon_id: int, update_data: dict):
    pokemon = db.query(Pokemon).filter(
        Pokemon.id == pokemon_id,
        Pokemon.is_active == True
    ).first()

    if not pokemon:
        return None

    # 🔥 Actualización dinámica
    for key, value in update_data.items():
        if hasattr(pokemon, key):
            setattr(pokemon, key, value)

    db.commit()
    db.refresh(pokemon)

    return pokemon

def add_pokemon(db: Session, pokemon: dict):

    # 🔢 generar pokedex_number
    max_number = db.query(func.max(Pokemon.pokedex_number)).scalar()
    pokemon["pokedex_number"] = (max_number or 0) + 1

    # 📊 calcular total
    pokemon["total"] = (
        pokemon["hp"]
        + pokemon["attack"]
        + pokemon["defense"]
        + pokemon["sp_atk"]
        + pokemon["sp_def"]
        + pokemon["speed"]
    )

    new_pokemon = Pokemon(**pokemon)

    db.add(new_pokemon)
    db.commit()
    db.refresh(new_pokemon)

    return new_pokemon

def delete_pokemon(db: Session, pokemon_id: int):
    pokemon = db.query(Pokemon).filter(Pokemon.id == pokemon_id).first()

    if not pokemon:
        return None

    if not pokemon.is_active:
        return None  # ya está eliminado

    pokemon.is_active = False

    db.commit()
    db.refresh(pokemon)

    return pokemon