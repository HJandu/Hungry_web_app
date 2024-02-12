const apiKey = "0ee8b356da4647dda7b2c230e4b0e205";
const searchBtn = document.getElementById("searchBtn");



// function to recommended recipes based on ingredients
async function fetchDataApi(event) {
    event.preventDefault();
    const inputValue = document.getElementById("query").value.trim();
    if (inputValue === "") {
        console.log("Please enter an ingredient");
        return;
    }
    const queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + inputValue + "&number=8";


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
            template += `<div class="card border border-0 col-sm-12 col-md-6" style="width: 300px;" >
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text">Likes: ${recipe.likes}</p>
                <button value="${recipe.id}" onclick="singleRecipe(event)" class="btn btn-primary">View Recipe</button>
            </div>
            </div>`;
        });
        document.getElementById("row-test").innerHTML = template;
    } catch (error) {
        console.error(error.message);
    }
}

// function to display popular recipes
async function fetchPopular() {
    // event.preventDefault();
    const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=" + apiKey + "&number=4";

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
            template += `<div class="card border border-0 col-sm-6 mb-3 mb-sm-0" style="width: 300px;" >
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
            <h5 class="card-title
                ">${recipe.title}</h5>
                <p class="card-text">Servings: ${recipe.servings}</p>
                <button value="${recipe.id}" onclick="randomRecipe(event)" class="btn btn-primary">View Recipe</button>
                </div>
                </div>`;
        }
        document.getElementById("popularRecipes").innerHTML = template;

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
        window.location.href = "./recipes.html";
    } catch (error) {
        console.error(error);

    }
}

searchBtn.addEventListener("click", fetchDataApi);