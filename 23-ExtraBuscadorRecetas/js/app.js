// Variables
const select = document.querySelector('#categorias');
const results = document.querySelector('#resultado');
const favBtn = document.querySelector('#favBtn');

// Events

document.addEventListener('DOMContentLoaded', initializeApp);

// Functions
function initializeApp() {
  favBtn.addEventListener('click', renderFavorites);
  if (select) {
    select.addEventListener('change', renderCategories);
    getCategories();
  }

  if (favBtn && favBtn.classList.contains('active')) {
    renderFavorites();
  }
}

function getCategories() {
  const urlCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  fetch(urlCategories)
    .then(response => response.json())
    .then(data => listCategories(data.categories));
}

function renderCategories(e) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`;

  fetch(url)
    .then(response => response.json())
    .then(data => printMeals(data.meals, results));
}

function listCategories(categories) {
  const fragment = document.createDocumentFragment();
  for (let category of categories) {
    const optionCategory = document.createElement('OPTION');
    optionCategory.textContent = category.strCategory;
    optionCategory.value = category.strCategory;
    fragment.appendChild(optionCategory);
  }

  select.appendChild(fragment);
}

function printMeals(meals, container) {
  cleanHtml(container);
  const fragment = document.createDocumentFragment();
  const heading = document.createElement('H2');
  heading.classList.add('text-center', 'text-black', 'my-5');
  heading.textContent = meals.length
    ? meals.length > 1
      ? `${meals.length} meals found`
      : `1 meal found`
    : "Didn't found any meal";

  for (let meal of meals) {
    const { idMeal, strMeal, strMealThumb } = meal;
    const mealContainer = document.createElement('DIV');
    const mealCard = document.createElement('DIV');
    mealContainer.classList.add('col-md-4');
    mealCard.classList.add('card', 'mb-4', 'text-center');
    mealCard.innerHTML = `
        <img src="${strMealThumb}" class= "card-img-top" alt="${strMeal} image"/>
        <div class="card-body">
            <h3 class="card-title mb-3">${strMeal}</h3>
            <button class="btn btn-danger w-100" data-bs-target="#modal" data-bs-toggle="modal" onClick="printRecipeModal(${idMeal})">See recipe</button>
        </div>
    `;
    mealContainer.appendChild(mealCard);
    fragment.appendChild(mealContainer);
  }
  container.appendChild(heading);
  container.appendChild(fragment);
}

function printRecipeModal(id) {
  const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(url)
    .then(response => response.json())
    .then(data => renderRecipeModal(data.meals[0]));
}

function renderRecipeModal(infoMeal) {
  const { strMeal, strMealThumb, strInstructions, idMeal } = infoMeal;
  const fragment = document.createDocumentFragment();
  // Name of the meal
  document.querySelector('#staticBackdropLabel').textContent = strMeal;

  // Create body
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = `
  <img class="img-fluid" src="${strMealThumb}" alt="${strMeal} recipe"/>
  <h3 class="my-3">Instruccions</h3>
  <p>${strInstructions}</p>
  `;

  // List of ingredients
  const ingredientAndMeasureList = document.createElement('UL');
  ingredientAndMeasureList.classList.add('list-group');
  Object.keys(infoMeal).forEach(key => {
    if (key.slice(0, 13) === 'strIngredient' && infoMeal[key] !== '') {
      const measure = `strMeasure${key.slice(13)}`;
      const ingredientAndMeasureString = `${infoMeal[key]} - ${infoMeal[measure]}`;
      const ingredientAndMeasureElement = document.createElement('LI');
      ingredientAndMeasureElement.classList.add('list-group-item');
      ingredientAndMeasureElement.textContent = ingredientAndMeasureString;
      fragment.appendChild(ingredientAndMeasureElement);
    }
  });
  ingredientAndMeasureList.appendChild(fragment);
  modalBody.appendChild(ingredientAndMeasureList);

  // List of meals
  // Create modal footer
  createFooter(idMeal);
}

function cleanHtml(selector) {
  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  }
}

function saveFavorite(idMeal) {
  let array = [];
  if (localStorage.getItem('favoriteMeal') != null) {
    let mealsInLocalStorage = JSON.parse(localStorage.getItem('favoriteMeal'));

    for (let meal in mealsInLocalStorage) {
      if (mealsInLocalStorage[meal] === idMeal) {
        swal('Error', 'Recipe already added to favorites', 'error');
        return;
      } else {
        array.push(mealsInLocalStorage[meal]);
      }
    }
    array.push(idMeal);
    localStorage.setItem('favoriteMeal', JSON.stringify(array));
  } else {
    array.push(idMeal);
    localStorage.setItem('favoriteMeal', JSON.stringify(array));
  }

  swal('Success', 'Recipe added to favorites', 'success');
  createFooter(idMeal);
}

function deleteFavorite(idMeal) {
  const indexOfMeal = JSON.parse(localStorage.getItem('favoriteMeal')).indexOf(idMeal);
  if (indexOfMeal >= 0) {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteMeal'));
    localStorageFavorites.splice(indexOfMeal, 1);
    localStorage.setItem('favoriteMeal', JSON.stringify(localStorageFavorites));
    swal('Success', 'Recipe removed from favorites', 'success');
    createFooter(idMeal);
    if (favBtn.classList.contains('active')) {
      renderFavorites();
    }
  } else {
    swal('Error', "Could'nt remove recipe from favorites", 'error');
  }
}

function createFooter(data) {
  const modalFooter = document.querySelector('.modal-footer');
  const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteMeal')) || [];
  if (localStorageFavorites.length > 0 && localStorageFavorites.indexOf(Number(data)) >= 0) {
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-danger col" onClick="deleteFavorite(${data})" >Delete from Favorites</button>
    <button type="button" class="btn btn-secondary col" data-bs-dismiss="modal" >Close</button>
  `;
  } else {
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-danger col" onClick="saveFavorite(${data})" >Save Favorite</button>
    <button type="button" class="btn btn-secondary col" data-bs-dismiss="modal" >Close</button>
  `;
  }

  return modalFooter;
}

function renderFavorites() {
  const favoritesMeals = JSON.parse(localStorage.getItem('favoriteMeal'));
  const favoriteMealContainer = document.querySelector('#resultadoFav');
  if (favoritesMeals.length > 0) {
    let array = [];
    for (let meal of favoritesMeals) {
      const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          array.push(data.meals[0]);
          return array;
        })
        .then(array => printMeals(array, favoriteMealContainer));
    }
  } else {
    cleanHtml(favoriteMealContainer);
    const message = document.createElement('H2');
    message.textContent = 'No favorites meals found. Add your favorite meal to favorites list.';
    message.className = 'text-center my-5';
    favoriteMealContainer.appendChild(message);
  }
}
