# 🐉 Pokédex Fullstack App

Aplicación fullstack para la gestión de Pokémon, desarrollada con **FastAPI** en el backend y **React** en el frontend. Permite realizar operaciones completas de CRUD (Crear, Leer, Actualizar y Eliminar), además de búsquedas por nombre o número de Pokédex.

---

## 🚀 Tecnologías utilizadas

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* SQLite (o la base de datos que estés usando)

### Frontend

* React
* JavaScript (ES6+)
* CSS

---

## 📌 Funcionalidades

* ✅ Crear nuevos Pokémon
* ✅ Listar Pokémon
* ✅ Buscar por nombre o número de Pokédex
* ✅ Ver detalles completos
* ✅ Editar Pokémon (PATCH)
* ✅ Eliminar Pokémon (soft delete)
* ✅ Mostrar Pokémon aleatorio en el inicio

---

## 🧠 Arquitectura

El proyecto sigue una arquitectura separada:

* **Backend**

  * Routes
  * Services
  * Models
  * Schemas

* **Frontend**

  * Pages
  * Components
  * Styles

---

## 🔍 Endpoints principales

| Método | Endpoint             | Descripción        |
| ------ | -------------------- | ------------------ |
| GET    | /pokemon             | Obtener todos      |
| GET    | /pokemon/{id}        | Obtener por ID     |
| GET    | /pokemon/name/{name} | Obtener por nombre |
| GET    | /pokemon/random      | Pokémon aleatorio  |
| POST   | /pokemon             | Crear              |
| PATCH  | /pokemon/{id}        | Actualizar         |
| DELETE | /pokemon/{id}        | Eliminar           |

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
```

---

### 2. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Servidor en:

```
http://127.0.0.1:8000
```

Documentación automática:

```
http://127.0.0.1:8000/docs
```

---

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

App en:

```
http://localhost:5173
```

---

## 📷 Capturas (opcional)

*Aquí puedes agregar screenshots de tu app*

---

## 📚 Aprendizajes clave

* Consumo de APIs con React
* Manejo de estado con useState y useEffect
* Diseño de APIs REST con FastAPI
* Validación de datos con Pydantic
* Manejo de errores (422, 405, etc.)
* Integración frontend-backend

---

## 🔮 Mejoras futuras

* Autenticación de usuarios
* Deploy (Render, Vercel, etc.)
* Filtros avanzados
* UI más interactiva
* Subida de imágenes reales

---

## 👨‍💻 Autor

**Daniel Alexis Valencia Nieves**

---

## ⭐ Nota

Este proyecto fue desarrollado con fines educativos y de práctica en desarrollo fullstack.
