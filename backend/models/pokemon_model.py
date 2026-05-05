from sqlalchemy import Column, Integer, String, Boolean
from db.conexion import Base

class Pokemon(Base):
    __tablename__ = "pokemon"

    id = Column(Integer, primary_key=True, index=True)
    pokedex_number = Column(Integer)
    name = Column(String)
    type1 = Column(String)
    type2 = Column(String)
    total = Column(Integer)
    hp = Column(Integer)
    attack = Column(Integer)
    defense = Column(Integer)
    sp_atk = Column(Integer)
    sp_def = Column(Integer)
    speed = Column(Integer)
    generation = Column(Integer)
    legendary = Column(Boolean)
    img = Column(String, default="https://placehold.co/200x200")
    is_active = Column(Boolean, default=True)
