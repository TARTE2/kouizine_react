import './recipeCard.css';

const RecipeCard = ({title, cuissonTime, ingredients, methode, handleEdit, handleDelete }) => {
    // Ensure ingredients is an array
    const ingredientsArray = Array.isArray(ingredients) ? ingredients : ingredients.split(',');

    return (
      <div className="recette">
        <h3>{title}</h3>
        <p>Temps de cuisson : {cuissonTime} minutes</p>
        {
          ingredientsArray && ingredientsArray.length > 0 ?
          <>
            <h4>Ingrédients :</h4>
            <ul>
              {ingredientsArray.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </>
          :
          <p>Aucun ingrédient</p>
        }
        
        {
          methode && methode.length > 0 ?
          <>
            <h4>Méthode :</h4>
            <p>{methode}</p>
          </>
          :
          <p>Aucune méthode</p>
        }
        
        <div className='btn-container'>
          <button onClick={handleDelete}>Supprimer</button>
          <button onClick={handleEdit}>Modifier</button>
        </div>

      </div>
    );
};

export default RecipeCard;