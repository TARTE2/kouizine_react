const recettes = [
  {
    titre: "Pâtes à la carbonara",
    tempsCuisson: 20,
    ingredients: ["Pâtes", "Oeufs", "Lardons", "Parmesan"],
    methode: "Cuire les pâtes, mélanger avec les autres ingrédients.",
  },
  {
    titre: "Salade César",
    tempsCuisson: 15,
    ingredients: ["Salade", "Poulet", "Croûtons", "Parmesan", "Sauce César"],
    methode: "Mélanger tous les ingrédients.",
  },
];

const recettesDiv = document.getElementById("recettes");
const titreInput = document.getElementById("titre");
const tempsCuissonInput = document.getElementById("tempsCuisson");
const ingredientsInput = document.getElementById("ingredients");
const methodeInput = document.getElementById("methode");
const ajouterButton = document.getElementById("ajouter");
const sauvegarderButton = document.getElementById("sauvegarder");
let modifierIndex = null;

function afficherRecettes() {
  recettesDiv.innerHTML = "";
  recettes.forEach((recette, index) => {
    const recetteDiv = document.createElement("div");
    recetteDiv.classList.add("recette");
    recetteDiv.innerHTML = `
            <h3>${recette.titre}</h3>
            <p>Temps de cuisson : ${recette.tempsCuisson} minutes</p>
            <h4>Ingrédients :</h4>
            <ul>${recette.ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}</ul>
            <h4>Méthode :</h4>
            <p>${recette.methode}</p>
            <button onclick="supprimerRecette(${index})">Supprimer</button>
            <button onclick="modifierRecette(${index})">Modifier</button>
        `;
    recettesDiv.appendChild(recetteDiv);
  });
}

function ajouterRecette() {
  const titre = titreInput.value;
  const tempsCuisson = parseInt(tempsCuissonInput.value);
  const ingredients = ingredientsInput.value.split(",");
  const methode = methodeInput.value;

  if (titre && tempsCuisson && ingredients && methode) {
    recettes.push({ titre, tempsCuisson, ingredients, methode });
    afficherRecettes();
    titreInput.value = "";
    tempsCuissonInput.value = "";
    ingredientsInput.value = "";
    methodeInput.value = "";
  }
}

function supprimerRecette(index) {
  recettes.splice(index, 1);
  afficherRecettes();
}

function modifierRecette(index) {
  modifierIndex = index;
  titreInput.value = recettes[index].titre;
  tempsCuissonInput.value = recettes[index].tempsCuisson;
  ingredientsInput.value = recettes[index].ingredients.join(",");
  methodeInput.value = recettes[index].methode;
  ajouterButton.style.display = "none";
  sauvegarderButton.style.display = "inline-block";
}

function sauvegarderModification() {
  const titre = titreInput.value;
  const tempsCuisson = parseInt(tempsCuissonInput.value);
  const ingredients = ingredientsInput.value.split(",");
  const methode = methodeInput.value;

  if (titre && tempsCuisson && ingredients && methode) {
    recettes[modifierIndex] = { titre, tempsCuisson, ingredients, methode };
    afficherRecettes();
    titreInput.value = "";
    tempsCuissonInput.value = "";
    ingredientsInput.value = "";
    methodeInput.value = "";
    modifierIndex = null;
    ajouterButton.style.display = "inline-block";
    sauvegarderButton.style.display = "none";
  }
}

ajouterButton.addEventListener("click", ajouterRecette);
sauvegarderButton.addEventListener("click", sauvegarderModification);

afficherRecettes();
