const apiKey = "0ee8b356da4647dda7b2c230e4b0e205";
const recipeDetails = document.getElementById("recipeDetails");

// copied function from script.js
// function to get recipe information
async function getRecipe(callId) {
  var queryId = "https://api.spoonacular.com/recipes/" + callId + "/information?apiKey=" + apiKey;

  try {
    var response = await fetch(queryId);
    var data = await response.json();
    console.log(data);
    // save data to local storage
    window.localStorage.setItem("recipe", JSON.stringify(data));
    displayRecipe();
    getPricing();
    getNutrition();
    getSimilar();
    fetchVideoByTitle();

  } catch (error) {
    console.error(error);

  }
}

// display the chosen recipe details
function displayRecipe() {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  console.log(fullRecipe);
  let recipeTemplate = `<div class="card border border-0 mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${fullRecipe.image} class="img-fluid rounded-start" alt=${fullRecipe.title}>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${fullRecipe.title}</h5>
        <p class="card-text">Ready in Minutes: ${fullRecipe.readyInMinutes}</p>
        <p class="card-text">Ingredients:</p>
        <ul class="list-group list-group-flush">${fullRecipe.extendedIngredients.map((ingredient) => {
    return `<li class="list-group-item">${ingredient.original}</li>`;
  }
  ).join("")}</ul>        
      </div>
    </div>
  </div>
</div>`;
  const instructionsTemplate = `<div class="card border border-0">
<div class="card-body">
  <h5 class="card-title">Instructions</h5>
        <p class="card-text">${fullRecipe.analyzedInstructions[0].steps.map((step) => {
    return `<p class="card-text">${step.number}. ${step.step}</p>`;
  }).join("")}</p>
        <p class="card-text"></p>
        <p class="card-text">Diets: ${fullRecipe.diets}</p>
        <p class="card-text">Number of Servings: ${fullRecipe.servings}</p>
</div>
</div>`
  // if there is no image, display a default image
  if (fullRecipe.image === null) {
    fullRecipe.image = "./images/coming-soon.jpg";
  }
  // if there are no instructions, diet and serving info, then display a message
  if (fullRecipe.analyzedInstructions.steps === 0) {
    fullRecipe.analyzedInstructions.steps = "No instructions available for this recipe. Please view the recipe on the youTube video";
  }
  if (fullRecipe.diets === null) {
    fullRecipe.diets = "No dietary information available for this recipe.";
  }
  if (fullRecipe.servings === null) {
    fullRecipe.servings = "No serving information available for this recipe.";
  }

  document.getElementById("recipeInfo").innerHTML = recipeTemplate;
  document.getElementById("instructions").innerHTML = instructionsTemplate;
}
displayRecipe();


// function to get price breakdown for chosen recipe
async function getPricing(callId) {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const priceId = fullRecipe.id;

  let priceURL = "https://api.spoonacular.com/recipes/" + priceId + "/priceBreakdownWidget.json?apiKey=" + apiKey;

  try {
    var response = await fetch(priceURL);
    var data = await response.json();
    console.log(data);
    // <div class="col-sm-6 mb-3 mb-sm-0">
    let priceTemplate = `<div class="card border border-0">
          <div class="card-body">
            <h5 class="card-title">Price Breakdown</h5>
            <p class="card-text">${data.ingredients.map((ingredient) => {
      return `<p class="card-text">${ingredient.name}: $${ingredient.price}</p>`;
    }).join("")}</p>
            <p class="card-text">Total Cost: $${data.totalCost}</p>
            <p class="card-text">Total Cost Per Serving: $${data.totalCostPerServing}</p>
          </div>
        </div>
      </div>`
    document.getElementById("price").innerHTML = priceTemplate;
  } catch (error) {
    console.error(error);
  }
}
getPricing();

// functiont to get nutrition information for chosen recipe
async function getNutrition(callId) {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const nutritionId = fullRecipe.id;

  let nutURL = "https://api.spoonacular.com/recipes/" + nutritionId + "/nutritionWidget.json?apiKey=" + apiKey;

  try {
    var response = await fetch(nutURL);
    var data = await response.json();
    console.log(data);
    let nutritionTemplate = `<div class="card border border-0">
          <div class="card-body">
            <h5 class="card-title">Nutrition per Serving</h5>
            <p class="card-text">Calories: ${data.calories}</p>
            <p class="card-text">Carbohydrates: ${data.carbs}</p>
            <p class="card-text">Protein: ${data.protein}</p>
            <p class="card-text">Fat: ${data.fat}</p>
            <p class="card-text">Saturated Fat: ${data.bad[2].amount}</p>
          </div>
        </div>
      </div>`
    document.getElementById("nut-chart").innerHTML = nutritionTemplate;
  } catch (error) {
    console.error(error);
  }
}
getNutrition();


// function to get similar recipes 
async function getSimilar(callId) {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const similarRecipesId = fullRecipe.id;

  let similarRecipesURL = "https://api.spoonacular.com/recipes/" + similarRecipesId + "/similar?apiKey=" + apiKey;

  try {
    var response = await fetch(similarRecipesURL);
    var data = await response.json();
    console.log(data);
    let similarRecipesTemplate = `<div id="carouselExampleCaptions" class="carousel slide ">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="images/slide-1.jpg" class="d-block w-100" alt="fruit and veg border">
          <div class="carousel-caption d-none d-md-block">
            <h5>${data[0].title}</h5>
            <p>Ready in Minutes: ${data[0].readyInMinutes}</p>
            <p>Number of Servings: ${data[0].servings}</p>
            <button value="${data[0].id}" onclick="similarRecipe(event)" class="btn btn-primary">View Recipe</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/slide-2.jpg" class="d-block w-100" alt="fruit and veg border">
          <div class="carousel-caption d-none d-md-block">
            <h5>${data[1].title}</h5>
            <p>Ready in Minutes: ${data[1].readyInMinutes}</p>
            <p>Number of Servings: ${data[1].servings}</p>
            <button value="${data[1].id}" onclick="similarRecipe(event)" class="btn btn-primary">View Recipe</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/slide-3.jpg" class="d-block w-100" alt="fruit and veg border">
          <div class="carousel-caption d-none d-md-block">
            <h5>${data[2].title}</h5>
            <p>Ready in Minutes: ${data[2].readyInMinutes}</p>
            <p>Number of Servings: ${data[2].servings}</p>
            <button value="${data[2].id}" onclick="similarRecipe(event)" class="btn btn-primary">View Recipe</button>
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
    document.getElementById("similar-recipes").innerHTML = similarRecipesTemplate;

  } catch (error) {
    console.error(error);
  }
}
getSimilar();



// Purpose: To fetch and display YouTube videos based on user input
async function fetchVideoByTitle() {
  const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
  const recipeTitle = fullRecipe.title;
  const apiKey = "AIzaSyDXooxlyHl4mGqu_QKC2kfxg5Xo9dnmU68";
  const youTubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${recipeTitle}&type=video&key=${apiKey}`;

  try {
    const response = await fetch(youTubeUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    const data = await response.json();
    if (data.items.length === 0) {
      throw new Error('Video not found');
    }
    console.log(data);

    const videoId = data.items[0].id.videoId;
    console.log(videoId);
    let videoTemplate = `<iframe width="560" height="315" src="https://www.youtube.com/embed/ABC123" frameborder="0" allowfullscreen></iframe>`;
    videoTemplate = videoTemplate.replace("ABC123", videoId);


    document.getElementById("video").innerHTML = videoTemplate;
    // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  } catch (error) {
    console.error(error);
  }
};
fetchVideoByTitle();

// function to get recipe information
async function similarRecipe(event) {
  console.log(event.target);
  // Clear localStorage
  window.localStorage.removeItem("recipe");
  getRecipe(event.target.value);
  displayRecipe(event.target.value);
  getPricing(event.target.value);
  getNutrition(event.target.value);
  getSimilar(event.target.value);
  fetchVideoByTitle(event.target.value);
}