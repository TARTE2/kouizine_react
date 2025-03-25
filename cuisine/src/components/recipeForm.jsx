import { useEffect, useState } from "react";
import './recipeForm.css';

const RecipeForm = ({ handleAdd, recipeToEdit, handleEdit }) => {
    const [form, setForm] = useState({ title: "", cuissonTime: 1, ingredients: "", methode: "" });
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
        // Default values
        const defaultValues = { title: '', cuissonTime: 0, ingredients: '', methode: '' };

        // Check if any form value is still set to its default
        const isDefault = Object.keys(defaultValues).some(key => form[key] === defaultValues[key]);

        if (isDefault) {
            // Handle the case where one or more fields are still set to their default values
            console.error("Please fill out all fields with non-default values.");
            // Optionally, you can display an error message to the user here
            return;
        }

        if (form.id) {
            handleEdit(form);
        } else {
            handleAdd(form);
        }

        // Reset the form to default values after submission
        setForm(defaultValues);
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
