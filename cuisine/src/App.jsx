import { useEffect, useState } from "react";
import "./App.css";
import RecipeCard from "./components/recipeCard";
import RecipeForm from "./components/recipeForm";
import Dexie from "dexie";

function App() {
    const [recipeList, setRecipeList] = useState([]);
    const [recipeToEdit, setRecipeToEdit] = useState({});

    const db = new Dexie("ContactsDB");

    useEffect(() => {
        // ajoute une recette si la base de données est vide
        db.recipes.count().then((count) => {
            if (count === 0) {
                sauvegarderRecette({
                    title: "Patte de canard",
                    cuissonTime: 8,
                    ingredients: ["canard", "sauce", "carotte", "patates"],
                    methode: "Hola como esta",
                });
            } else {
                chargerRecettes();
            }
        });
    }, []);

    // creation de la table des recettes
    db.version(1).stores({
        recipes: "++id, title, cuissonTime, ingredients, methode",
    });

    const handleDelete = (id) => {
        // supprime une recette de la liste et de la base de données
        setRecipeList(recipeList.filter((rec) => rec.id !== id));
        db.recipes.delete(id).catch((err) => {
            console.error(err.stack || err);
        });
    };

    const chargerRecettes = () => {
        // chargement des recettes depuis la base
        db.recipes
            .toArray()
            .then((recetteData) => {
                const recipeIds = recetteData.map(recipe => recipe.id);
                const updatedRecetteData = recetteData.map((recipe, index) => {
                    return {
                        ...recipe, id: recipeIds[index]
                    };
                });

                setRecipeList(updatedRecetteData);
            })
            .catch((err) => {
                console.error(err.stack || err);
            });
    };

    const sauvegarderRecette = (newRecipe) => {
        // ajoute une nouvelle recette dans la base de données
        db.recipes
            .add(newRecipe)
            .then((id) => {
                chargerRecettes();
            })
            .catch((err) => {
                console.error(err.stack || err);
            });
    };

    const modifierForm = (recipe) => {
        // modifie une recette existante dans la base de données
        if (!recipe.id) {
            console.error("ID de recette invalide :", recipe);
            return;
        }
        db.recipes.update(recipe.id, recipe)
            .then((updated) => {
                if (updated) {
                    chargerRecettes();
                } else {
                    console.error("Échec de la mise à jour : aucun ID correspondant trouvé");
                }
            })
            .catch((err) => {
                console.error(err.stack || err);
            });
    };

    return (<>
        <h1>Liste de recettes</h1>
        <RecipeForm
            handleAdd={sauvegarderRecette}
            recipeToEdit={recipeToEdit}
            handleEdit={modifierForm}
        />
        <div className="container-card">
            {recipeList.map((card) => (<RecipeCard
                key={card.id}
                title={card.title}
                cuissonTime={card.cuissonTime}
                ingredients={card.ingredients}
                methode={card.methode}
                handleDelete={() => handleDelete(card.id)}
                handleEdit={() => setRecipeToEdit(card)}
            />))}
        </div>
    </>);
}

export default App;
