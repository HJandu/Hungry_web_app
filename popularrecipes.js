// const searchBtn = document.getElementById("searchBtn");



// function to reccomened recipes based on ingredients
async function fetchDataApi(event) {
    event.preventDefault();
    const inputValue = document.getElementById("query").value.trim();
    if (inputValue === "") {
        console.log("Please enter an ingredient");
        return;
    }

    apiKey = "e4cab129fb5142af8cb2061eedb3108d"
    const queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + inputValue;

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
        template += `<div class="card col-sm-12 col-md-6" >
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <button value="${recipe.id}" onclick="singleRecipe(event)" class="btn btn-primary">View Recipe</button>
            </div>
        </div>`;
        });
        document.getElementById("recipe-row").innerHTML = template;
    } catch (error) {
        console.error(error.message);
    }
}

//function for popular recipes//
async function fetchPopularApi(event) {
    event.preventDefault();

    apiKey = "e4cab129fb5142af8cb2061eedb3108d"
    const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=" + apiKey;

    console.log(randomURL);

    try {
        const response = await fetch(randomURL);
        if (!response.ok) {
            throw Error(`ERROR: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        let randomTemplate = ``;
        // data.forEach((recipe) => {
        // randomTemplate += `<div class="card col-sm-12 col-md-6" >
        //     <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        // <div class="card-body">
        //     <h5 class="card-title">${recipe.title}</h5>
        //     <button value="${recipe.id}" onclick="singleRecipe(event)" class="btn btn-primary">View Recipe</button>
        //     </div>
        // </div>`;
        // });
        // document.getElementById("recipe-row").innerHTML = template;
    } catch (error) {
        console.error(error.message);
    }
}

fetchPopularApi();

function singleRecipe(event) {
    console.log(event.target);
    getRecipe(event.target.value);
}



// function to get recipe information
async function getRecipe(callId) {
    apiKey = "39f57f8117e24c7490a9c443f1f7173b"
    var queryId = "https://api.spoonacular.com/recipes/" + callId + "/information?apiKey=" + apiKey;

    try {
        var response = await fetch(queryId);
        var data = await response.json();
        console.log(data);
        let recipeTemplate = `<div class="card mb-3">
            <img src=${data.image} class="card-img-top" alt=${data.title}>
            <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.summary}</p>
            ${data.analyzedInstructions[0].steps.map((step) => {
            return `<p class="card-text">${step.number}. ${step.step}</p>`;
        }).join("")}
            </div>
        </div>`;
        document.getElementById("recipe-row").innerHTML = recipeTemplate;
    } catch (error) {
        console.error(error);

    }

    // return data;
}

searchBtn.addEventListener("click", fetchDataApi);


