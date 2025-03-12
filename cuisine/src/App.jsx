import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RecipeCard from "./components/recipeCard";
import RecipeForm from "./components/recipeForm";
import Dexie from "dexie";

function App() {
  const [recipeList, setRecipeList] = useState([]);

  const db = new Dexie("ContactsDB");

  useEffect(() => {
    chargerRecettes();
    if (recipeList.length === 0) {
      sauvegarderRecette({
        title: "Patte de canard",
        cuissonTime: 8,
        ingredients: ["canard", "sauce", "carotte", "patates"],
        method: " Hola como esta ",
      });
    }
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

  const chargerRecettes = () => {
    db.recipes
      .toArray()
      .then((recetteData) => {
        setRecipeList(recetteData);
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

  return (
    <>
      <RecipeForm />
      <div className="container-card">
        {recipeList.map((card) => (
          <RecipeCard
            key={card.id}
            cuissonTime={card.cuissonTime}
            ingredients={card.ingredients}
            methode={card.method}
            handleDelete={() => handleDelete(card.id)}
            handleEdit={() => handleEdit(card.id)}
          ></RecipeCard>
        ))}
      </div>

      <h1>rehjkgbrehv</h1>
    </>
  );
}

export default App;
