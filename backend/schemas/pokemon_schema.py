from pydantic import BaseModel
from typing import Optional

# Base (campos comunes)

class PokemonBase(BaseModel):
    pokedex_number: int
    name: str
    type1: str
    type2: Optional[str] = None
    total: int
    hp: int
    attack: int
    defense: int
    sp_atk: int
    sp_def: int
    speed: int
    generation: int
    legendary: bool
    img: Optional[str] = None  # 🔥 NUEVO


# ✅ Para CREAR
class PokemonCreate(BaseModel):
    name: str
    type1: str
    type2: Optional[str] = None

    hp: int
    attack: int
    defense: int
    sp_atk: int
    sp_def: int
    speed: int

    generation: int
    legendary: bool

    img: Optional[str] = None

# ✅ Para ACTUALIZAR (todos opcionales)
class PokemonUpdate(BaseModel):
    pokedex_number: Optional[int] = None
    name: Optional[str] = None
    type1: Optional[str] = None
    type2: Optional[str] = None
    total: Optional[int] = None
    hp: Optional[int] = None
    attack: Optional[int] = None
    defense: Optional[int] = None
    sp_atk: Optional[int] = None
    sp_def: Optional[int] = None
    speed: Optional[int] = None
    generation: Optional[int] = None
    legendary: Optional[bool] = None


# ✅ Para RESPUESTA
class PokemonResponse(PokemonBase):
    id: int

    class Config:
        from_attributes = True