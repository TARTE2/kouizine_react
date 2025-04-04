import { useEffect, useState } from "react";
import './recipeForm.css';

const RecipeForm = ({ handleAdd, recipeToEdit, handleEdit }) => {
    const [form, setForm] = useState({ title: "", cuissonTime: null, ingredients: "", methode: "" });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (recipeToEdit && Object.keys(recipeToEdit).length > 0) {
            setEdit(true);
            setForm(recipeToEdit);
        } else {
            setEdit(false);
        }
    }, [recipeToEdit]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        // Check if any form value is empty or invalid
        const isEmptyOrInvalid = Object.entries(form).some(([key, value]) => {
            if (key === 'cuissonTime') {
                return value <= 0;
            }
            return typeof value === 'string' && value.trim() === '';
        });

        if (isEmptyOrInvalid) {
            console.error("Please fill out all fields with valid values.");
            return;
        }

        if (form.id) {
            handleEdit(form);
        } else {
            handleAdd(form);
        }

        setForm({ title: '', cuissonTime: null, ingredients: '', methode: '' });
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
                id="cuissonTime"
                placeholder="Temps de cuisson (minutes)"
                min="1"
                value={form.cuissonTime}
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

            <button type="submit" id="sauvegarder" onClick={handleSubmit}>
                {form.id ? 'Sauvegarder' : 'Ajouter'}
            </button>
        </div>
    );
}

export default RecipeForm;
