// Variables
const select = document.querySelector('#categorias');
const results = document.querySelector('#resultado');

// Events
select.addEventListener('change', renderCategories);
document.addEventListener('DOMContentLoaded', initializeApp);

// Functions
function initializeApp() {
  getCategories();

  function getCategories() {
    const urlCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(urlCategories)
      .then(response => response.json())
      .then(data => listCategories(data.categories));
  }

  function listCategories(categories) {
    const fragment = document.createDocumentFragment();
    for (category of categories) {
      const optionCategory = document.createElement('OPTION');
      optionCategory.textContent = category.strCategory;
      optionCategory.value = category.strCategory;
      fragment.appendChild(optionCategory);
    }

    select.appendChild(fragment);
  }
}

function renderCategories(e) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`;

  fetch(url)
    .then(response => response.json())
    .then(data => printCategory(data.meals));
}

function printCategory(meals) {
  cleanHtml();
  const fragment = document.createDocumentFragment();

  for (let meal of meals) {
    const { idMeal, strMeal, strMealThumb } = meal;
    const container = document.createElement('DIV');
    const mealCard = document.createElement('DIV');
    container.classList.add('col-md-4');
    mealCard.classList.add('card', 'mb-4', 'text-center');
    mealCard.innerHTML = `
        <img src="${strMealThumb}" class= "card-img-top" alt="${strMeal} image"/>
        <div class="card-body">
            <h3 class="card-title mb-3">${strMeal}</h3>
            <button class="btn btn-danger w-100">Watch recipe</button>
        </div>
    `;
    container.appendChild(mealCard);
    fragment.appendChild(container);
  }
  results.appendChild(fragment);
}

function cleanHtml() {
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}
