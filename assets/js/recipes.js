// link to script.js


function displayrecipe(data){
    const fullRecipe = JSON.parse(window.localStorage.getItem("recipe"));
    console.log(fullRecipe);
      let recipeTemplate = `<div class="card mb-3">
          <img src=${fullRecipe.image} class="card-img-top" alt=${fullRecipe.title}>
          <div class="card-body">
            <h5 class="card-title">${fullRecipe.title}</h5>
            <p class="card-text">${fullRecipe.summary}</p>
            ${fullRecipe.analyzedInstructions[0].steps.map((step) => {
        return `<p class="card-text">${step.number}. ${step.step}</p>`;
      }).join("")}
          </div>
        </div>`;
        document.getElementById("full-recipe").innerHTML = recipeTemplate;

}

displayrecipe();
