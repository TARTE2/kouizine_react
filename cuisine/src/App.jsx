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

    db.version(1).stores({
        recipes: "++id, title, cuissonTime, ingredients, methode",
    });

    const handleDelete = (id) => {
        setRecipeList(recipeList.filter((rec) => rec.id !== id));
        db.recipes.delete(id).catch((err) => {
            console.error(err.stack || err);
        });
    };

    const test = (recipeCardData) => {
        setRecipeToEdit(recipeCardData);
    };

    const chargerRecettes = () => {
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
        if (!recipe.id) {
            console.error("Invalid recipe ID:", recipe);
            return;
        }
        db.recipes.update(recipe.id, recipe)
            .then((updated) => {
                if (updated) {
                    chargerRecettes();
                } else {
                    console.error("Update failed: No matching ID found");
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
            handleEdit={modifierForm} // Pass modifierForm here
        />
        <div className="container-card">
            {recipeList.map((card) => (<RecipeCard
                key={card.id}
                title={card.title}
                cuissonTime={card.cuissonTime}
                ingredients={card.ingredients}
                methode={card.methode}
                handleDelete={() => handleDelete(card.id)}
                handleEdit={() => test(card)}
            />))}
        </div>
    </>);
}

export default App;
