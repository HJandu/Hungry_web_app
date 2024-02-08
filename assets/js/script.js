const apiKey = "a2ea6436918641a693f624d3818a0438";

const searchBtn = document.getElementById("searchBtn");



// function to reccomened recipes based on ingredients
async function fetchDataApi(event) {
    event.preventDefault();
    const inputValue = document.getElementById("query").value.trim();
    if (inputValue === "") {
        console.log("Please enter an ingredient");
        return;
    }
    const queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + inputValue;

    // const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=" + apiKey + "&number=5";

    console.log(queryURL);

    try {
        const response = await fetch(queryURL);
        if (!response.ok) {
            throw Error(`ERROR: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        let template = ``;
        result.forEach((recipe) => {
            template += `<div class="card col-sm-12 col-md-6 col-md-4" >
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
              <h5 class="card-title">${recipe.title}</h5>
              <p class="card-text">Likes: ${recipe.likes}</p>
              <button value="${recipe.id}" onclick="singleRecipe(event)" class="btn btn-primary">View Recipe</button>
            </div>
          </div>`;
        });
        document.getElementById("recipe-row").innerHTML = template;
    } catch (error) {
        console.error(error.message);
    }
}

// function to display popular recipes
async function fetchPopular() {
    // event.preventDefault();
    const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=" + apiKey + "&number=6";

    console.log(randomURL);

    try {
        const response = await fetch(randomURL);
        if (!response.ok) {
            throw Error(`ERROR: ${response.statusText}`);
        }

        const dataCollected = await response.json();

        console.log(dataCollected);
        let template = ""; // initialize template variable
        for (let i = 0; i < dataCollected.recipes.length; i++) {
            const recipe = dataCollected.recipes[i];
            template += `<div class="card col-sm-12 col-md-6">
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
              <h5 class="card-title
                ">${recipe.title}</h5>
                <p class="card-text">Servings: ${recipe.servings}</p>
                <button value="${recipe.id}" onclick="randomRecipe(event)" class="btn btn-primary">View Recipe</button>
                </div>
                </div>`;
        }
        document.getElementById("popular-recipe-row").innerHTML = template;
        
    } catch (error) {
        console.error(error.message);
    }
}

fetchPopular();


function singleRecipe(event) {
    console.log(event.target);
    getRecipe(event.target.value);
}

function randomRecipe(event) {
    console.log(event.target);
    getRecipe(event.target.value);
}



// function to get recipe information
async function getRecipe(callId) {
    var queryId = "https://api.spoonacular.com/recipes/" + callId + "/information?apiKey=" + apiKey;

    try {
        var response = await fetch(queryId);
        var data = await response.json();
        console.log(data);
        // save data to local storage
        window.localStorage.setItem("recipe", JSON.stringify(data));

        //   let recipeTemplate = `<div class="card mb-3">
        //   <img src=${data.image} class="card-img-top" alt=${data.title}>
        //   <div class="card-body">
        //     <h5 class="card-title">${data.title}</h5>
        //     <p class="card-text">${data.summary}</p>
        //     ${data.analyzedInstructions[0].steps.map((step) => {
        //       return `<p class="card-text">${step.number}. ${step.step}</p>`;   
        //     }).join("")}
        //   </div>
        // </div>`;
        window.location.href = "./recipes.html";
        // document.getElementById("full-recipe").innerHTML = recipeTemplate;
    } catch (error) {
        console.error(error);

    }

    // return data;
}

searchBtn.addEventListener("click", fetchDataApi);