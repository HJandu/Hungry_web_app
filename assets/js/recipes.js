const recipeDetails = document.getElementById("recipeDetails");

// display the chosen recipe details
function displayRecipe() {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  console.log(fullRecipe);
  let recipeTemplate = `<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${fullRecipe.image} class="img-fluid rounded-start" alt=${fullRecipe.title}>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${fullRecipe.title}</h5>
        <p class="card-text"><ins>Instructions</ins></p>
        <p class="card-text">${fullRecipe.analyzedInstructions[0].steps.map((step) => {
            return `<p class="card-text">${step.number}. ${step.step}</p>`;
          }).join("")}</p>
        <p class="card-text"></p>
        <p class="card-text"><ins>Diets:</ins> ${fullRecipe.diets}</p>
        <p class="card-text"><ins>Number of Servings:</ins> ${fullRecipe.servings}</p>
      </div>
    </div>
  </div>
</div>`;

  document.getElementById("recipeInfo").innerHTML = recipeTemplate;
}
displayRecipe();

// function to display the different recipe details
function singleRecipe(event) {
  console.log(event.target);
  getRecipe(event.target.value);
  getPricing(event.target.value);
  getNutrition(event.target.value);
  getSimilar(event.target.value);
}

// function to get price breakdown for chosen recipe
async function getPricing(callId) {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const priceId = fullRecipe.id;
  apiKey = "f0dd859c032e46be87e35cfff5c947f2"
  // "39f57f8117e24c7490a9c443f1f7173b"
  let priceURL = "https://api.spoonacular.com/recipes/" + priceId + "/priceBreakdownWidget.json?apiKey=" + apiKey;

  try {
      var response = await fetch(priceURL);
      var data = await response.json();
      console.log(data);
      let priceTemplate = `<div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><ins>Price Breakdown</ins></h5>
            <p class="card-text">Ingredients: ${data.ingredients.map((ingredient) => {
              return `<p class="card-text">${ingredient.name}: ${ingredient.price}</p>`;
            }).join("")}</p>
            <p class="card-text">Total Cost: ${data.totalCost}</p>
            <p class="card-text">Total Cost Per Serving: ${data.totalCostPerServing}</p>
          </div>
        </div>
      </div>`
      //create a div to hold the price breakdown

      // recipeDetails.appendChild(priceTemplate);
      // document.getElementById("price").innerHTML = priceTemplate;
    } catch (error) {
      console.error(error);
  }
  // return data;
}
getPricing();

// functiont to get nutrition information for chosen recipe
async function getNutrition(callId) {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const nutritionId = fullRecipe.id;
  apiKey = "f0dd859c032e46be87e35cfff5c947f2"
  // "39f57f8117e24c7490a9c443f1f7173b"
  let nutURL = "https://api.spoonacular.com/recipes/" + nutritionId + "/nutritionWidget.json?apiKey=" + apiKey; 

  try {
      var response = await fetch(nutURL);
      var data = await response.json();
      console.log(data);
      let nutritionTemplate = `<div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><ins>Nutrition per Serving</ins></h5>
            <p class="card-text">Calories: ${data.calories}</p>
            <p class="card-text">Carbohydrates: ${data.carbs}</p>
            <p class="card-text">Protein: ${data.protein}</p>
            <p class="card-text">Fat: ${data.fat}</p>
            <p class="card-text">Saturated Fat: ${data.bad[2].amount}</p>
          </div>
        </div>
      </div>
    </div>`
      // document.getElementById("nut-chart").innerHTML = nutritionTemplate;
    } catch (error) {
      console.error(error);
  }
  // return data;
}
getNutrition();


// function to get similar recipes
async function getSimilar(callId) {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const similarRecipesId = fullRecipe.id;
  apiKey = "f0dd859c032e46be87e35cfff5c947f2"
  // "39f57f8117e24c7490a9c443f1f7173b"
  let similarRecipesURL = "https://api.spoonacular.com/recipes/" + similarRecipesId + "/similar?apiKey=" + apiKey;
  
  try {
      var response = await fetch(similarRecipesURL);
      var data = await response.json();
      console.log(data);
      let similarRecipesTemplate = `<div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="..." class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>${data[0].title}</h5>
            <p>Ready in Minutes: ${data[0].readyInMinutes}</p>
            <p>Number of Servings: ${data[0].servings}</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="..." class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>${data[1].title}</h5>
            <p>Ready in Minutes: ${data[1].readyInMinutes}</p>
            <p>Number of Servings: ${data[1].servings}</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="..." class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>${data[2].title}</h5>
            <p>Ready in Minutes: ${data[2].readyInMinutes}</p>
            <p>Number of Servings: ${data[2].servings}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`
    // document.getElementById("similar").innerHTML = similarRecipesTemplate;
    } catch (error) {
      console.error(error);
  }
  // return data;
}
getSimilar();

