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