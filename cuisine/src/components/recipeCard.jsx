import './recipeCard.css';

const RecipeCard = ({ cuissonTime, ingredients, method, handleEdit, handleDelete }) => {

    const ingredientsArray = Array.isArray(ingredients) ? ingredients : [];
const RecipeCard = ({ cuissonTime, ingredients,methode, handleEdit, handleDelete }) => {

    return (
      <div className="recette">
        <h3>Test</h3>
        <p>Temps de cuisson : {cuissonTime} minutes</p>
        <h4>Ingrédients :</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        
        <h4>Méthode :</h4>
        <p>{method}</p>
        
        <p>méthode recette</p>
        <button onClick={handleDelete}>Supprimer</button>
        <button onClick={handleEdit}>Modifier</button>
      </div>
    );
  };
  

export default RecipeCard;
