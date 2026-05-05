import { useState } from "react";
import "../styles/create.css";

function Create() {
  const [form, setForm] = useState({
    name: "",
    type1: "",
    type2: "",
    hp: "",
    attack: "",
    defense: "",
    sp_atk: "",
    sp_def: "",
    speed: "",
    generation: "",
    legendary: false,
    img: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 VALIDACIÓN
    if (
      !form.name ||
      !form.type1 ||
      !form.hp ||
      !form.attack ||
      !form.defense ||
      !form.sp_atk ||
      !form.sp_def ||
      !form.speed ||
      !form.generation
    ) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const payload = {
      name: form.name,
      type1: form.type1,
      type2: form.type2 || "None",

      hp: parseInt(form.hp),
      attack: parseInt(form.attack),
      defense: parseInt(form.defense),
      sp_atk: parseInt(form.sp_atk),
      sp_def: parseInt(form.sp_def),
      speed: parseInt(form.speed),

      generation: parseInt(form.generation),
      legendary: form.legendary,

      img: form.img || "https://placehold.co/200x200"
    };

    console.log("ENVIANDO:", payload);

    fetch("http://127.0.0.1:8000/pokemon/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          console.error("ERROR BACKEND:", data);
          alert("Error al crear Pokémon");
          return;
        }

        console.log("CREADO:", data);
        alert("Pokémon creado correctamente");

        // 🔥 limpiar formulario
        setForm({
          name: "",
          type1: "",
          type2: "",
          hp: "",
          attack: "",
          defense: "",
          sp_atk: "",
          sp_def: "",
          speed: "",
          generation: "",
          legendary: false,
          img: ""
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="create-container">
      <form className="create-card" onSubmit={handleSubmit}>
        <h2>Crear Pokémon</h2>

        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />

        <input name="type1" placeholder="Tipo 1" value={form.type1} onChange={handleChange} required />
        <input name="type2" placeholder="Tipo 2" value={form.type2} onChange={handleChange} />

        <input name="hp" type="number" placeholder="HP" value={form.hp} onChange={handleChange} required />
        <input name="attack" type="number" placeholder="Attack" value={form.attack} onChange={handleChange} required />
        <input name="defense" type="number" placeholder="Defense" value={form.defense} onChange={handleChange} required />
        <input name="sp_atk" type="number" placeholder="Sp. Atk" value={form.sp_atk} onChange={handleChange} required />
        <input name="sp_def" type="number" placeholder="Sp. Def" value={form.sp_def} onChange={handleChange} required />
        <input name="speed" type="number" placeholder="Speed" value={form.speed} onChange={handleChange} required />

        <input name="generation" type="number" placeholder="Generación" value={form.generation} onChange={handleChange} required />

        <input name="img" placeholder="URL de imagen" value={form.img} onChange={handleChange} />

        <label className="checkbox">
          <input type="checkbox" name="legendary" checked={form.legendary} onChange={handleChange} />
          Legendario
        </label>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default Create;