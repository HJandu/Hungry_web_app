const searchBtn = document.getElementById("searchBtn");



// function to reccomened recipes based on ingredients
async function fetchDataApi(event) {
    event.preventDefault();
    const inputValue = document.getElementById("query").value.trim();
    if (inputValue === "") {
        console.log("Please enter an ingredient");
        return;
    }

    apiKey = "39f57f8117e24c7490a9c443f1f7173b"
    const queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + inputValue;

    // const queryURL = "https://api.spoonacular.com/recipes/findByIngredients?" + apiKey + "ingredients=apples,+flour,+sugar&number=2"

    console.log(queryURL);

    try {
        const response = await fetch(queryURL);
        if (!response.ok) {
            throw Error(`ERROR: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

// var callId = 660261;
// var queryId = "https://api.spoonacular.com/recipes/" + callId + "/information?apiKey=" + apiKey;
// // console.log(getRecipe());

// function to get recipe information
async function getRecipe() {
    var response = await fetch(queryId);
    var data = await response.json();
    // console.log(data);
    return data;
}

searchBtn.addEventListener("click", fetchDataApi);



// getRecipe();

// async function fetch(queryId)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// });
