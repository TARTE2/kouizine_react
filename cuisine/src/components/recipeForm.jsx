import { useState } from "react";
import './recipeForm.css';

const RecipeForm = ({ handleAdd }) => {
    const [form, setForm] = useState({title: "", cuissonTime: 1, ingredients: "", methode: ""});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }));
    };

    const clearForm = () => {
        setForm({title: "", cookingTime: 1, ingredients: "", methode: ""});
    }

    const handleSubmit = () => {
        console.log(form);
        handleAdd(form);
        clearForm();
    };

    return (
        <div id="formulaire">
            <input
                type="text"
                id="title"
                placeholder="Titre"
                value={form.title}
                onChange={handleChange}
            />
            <input
                type="number"
                id="cookingTime"
                placeholder="Temps de cuisson (minutes)"
                min="1"
                value={form.cookingTime}
                onChange={handleChange}
            />
            <input
                type="text"
                id="ingredients"
                placeholder="Ingrédients (séparés par des virgules)"
                value={form.ingredients}
                onChange={handleChange}
            />
            <textarea
                id="methode"
                placeholder="Méthode"
                value={form.methode}
                onChange={handleChange}
            ></textarea>
            <button id="ajouter" onClick={handleSubmit}>Ajouter</button>
            <button id="sauvegarder" style={{display: "none"}}>Sauvegarder</button>
        </div>
    );
}

export default RecipeForm;