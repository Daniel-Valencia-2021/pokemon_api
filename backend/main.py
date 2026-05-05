from fastapi import FastAPI # Importa la clase FastAPI del módulo fastapi
from routes.pokemon_routes import router as pokemon_app # Importa la aplicación de rutas de pokemon
from fastapi.middleware.cors import CORSMiddleware # Importa el middleware para manejar CORS

app = FastAPI() # Crea una instancia de la aplicación FastAPI, esto es lo que usaremos para definir nuestras rutas y configurar nuestra API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados
)
# Esto es un "endpoint"
# Un endpoint es una dirección a la que alguien puede entrar desde el navegador o Postman
# En este caso, es la raíz: http://127.0.0.1:8000/
@app.get("/")  # GET es el tipo de petición (consultar datos)
def root():
    
    # Esto es lo que la API devuelve cuando alguien entra a "/"
    # FastAPI automáticamente lo convierte a formato JSON
    return {"message": "API de Pokemon funcionando"}


app.include_router(pokemon_app) # Incluye las rutas de pokemon en nuestra aplicación principal