apiKey = "954841e26963470e9bbea9401d152fb4"
var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey +"&ingredients=apples";

// fetch(queryURL)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// });

// function to reccomened recipes based on ingredients
async function getOptions() {
    var response = await fetch(queryURL);
    var data = await response.json();
    return data;
}

var callId = 660261;
var queryId = "https://api.spoonacular.com/recipes/" +callId + "/information?apiKey=" + apiKey;
// console.log(getRecipe());

// function to get recipe information
async function getRecipe() {
    var response = await fetch(queryId);
    var data = await response.json();
    return data;
}

getOptions();
getRecipe();

// async function fetch(queryId)
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log(data);
// });
