import { useState, useEffect } from "react";

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
        methode: " Hola como esta ",
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


  const handleEdit = (id) => {
    console.log(id)
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
      <RecipeForm handleAdd={sauvegarderRecette} />
      <div className="container-card">
        {recipeList.map((card) => (
          <RecipeCard
            key={card.id}
            title={card.title}
            cuissonTime={card.cuissonTime}
            ingredients={card.ingredients}
            methode={card.methode}
            handleDelete={() => handleDelete(card.id)}
            handleEdit={() => handleEdit(card.id)}
          ></RecipeCard>
        ))}
      </div>
    </>
  );
}

export default App;
