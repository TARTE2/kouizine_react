import { useState, useEffect } from "react";
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
          // Extract IDs from the recipe data
          const recipeIds = recetteData.map(recipe => recipe.id);

          // Add the id property to each recipe object
          const updatedRecetteData = recetteData.map((recipe, index) => {
            return {
              ...recipe,
              id: recipeIds[index]
            };

          });
          console.log(updatedRecetteData)

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
          console.log(`Recette ajouté avec l'ID ${id}`);
          chargerRecettes();
        })
        .catch((err) => {
          console.error(err.stack || err);
        });
  };

  const modifierForm = (recipe) => {
    console.log(recipe);

    if (!recipe.id) {
      console.error("Invalid recipe ID:", recipe);
      return;
    }
    db.recipes.update(recipe.id, recipe)
        .then((updated) => {
          if (updated) {
            console.log(`Recipe updated with id ${recipe.id}`);
            chargerRecettes();
          } else {
            console.error("Update failed: No matching ID found");
          }
        })
        .catch((err) => {
          console.error(err.stack || err);
        });
  };

  return (
      <>
        <RecipeForm
            handleAdd={sauvegarderRecette}
            recipeToEdit={recipeToEdit}
            handleEdit={modifierForm} // Pass modifierForm here
        />
        <div className="container-card">
          {recipeList.map((card) => (
              <RecipeCard
                  key={card.id}
                  title={card.title}
                  cuissonTime={card.cuissonTime}
                  ingredients={card.ingredients}
                  methode={card.methode}
                  handleDelete={() => handleDelete(card.id)}
                  handleEdit={() => test(card)}
              />
          ))}
        </div>
      </>
  );
}

export default App;
