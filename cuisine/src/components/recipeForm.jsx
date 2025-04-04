import { useEffect, useState } from "react";
import './recipeForm.css';

const RecipeForm = ({ handleAdd, recipeToEdit, handleEdit }) => {
    const [form, setForm] = useState({ title: "", cuissonTime: null, ingredients: "", methode: "" });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        // si une recette est fournie on initialise le formulaire
        if (recipeToEdit && Object.keys(recipeToEdit).length > 0) {
            setEdit(true);
            setForm(recipeToEdit);
        } else {
            // sinon on reset le formulaire
            setEdit(false);
        }
    }, [recipeToEdit]);

    const handleChange = (e) => {
        // mise à jour du formulaire lors de la saisie
        const { id, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        // verification des champs
        const isEmptyOrInvalid = Object.entries(form).some(([key, value]) => {
            if (key === 'cuissonTime') {
                return value <= 0; // temps de cuisson supérieur à 0
            }
            return typeof value === 'string' && value.trim() === ''; // champs non vides
        });

        if (isEmptyOrInvalid) {
            console.error("Veuillez remplir tous les champs avec des valeurs valides.");
            return;
        }

        // appel de la fonction d'ajout ou de modification
        if (form.id) {
            handleEdit(form);
        } else {
            handleAdd(form);
        }

        // reset le formulaire
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
