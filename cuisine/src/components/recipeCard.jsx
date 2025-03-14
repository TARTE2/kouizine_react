import './recipeCard.css';

const RecipeCard = ({ cuissonTime, ingredients, method, handleEdit, handleDelete }) => {
    // Ensure ingredients is an array
    const ingredientsArray = Array.isArray(ingredients) ? ingredients : [];

    return (
      <div className="recette">
        <h3>Test</h3>
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
          method && method.length > 0 ?
          <>
            <h4>Méthode :</h4>
            <p>{method}</p>
          </>
          :
          <p>Aucune méthode</p>
        }
        <h4>Méthode :</h4>
        <p>{method}</p>
        
        <div className='btn-container'>
          <button onClick={handleDelete}>Supprimer</button>
          <button onClick={handleEdit}>Modifier</button>
        </div>

      </div>
    );
};

export default RecipeCard;