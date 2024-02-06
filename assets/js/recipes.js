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
      return `<p class="card-text">${step.number}. ${step.step}</p>
      <button value="${fullRecipe.title}" onclick="singleRecipe(event)" class="btn btn-primary">View Video Recipes</button>`;
    }).join("")}
        </div>
      </div>`;
      document.getElementById("recipeInfo").innerHTML = recipeTemplate;

}

displayrecipe();

function singleRecipe(event) {
console.log(event.target);
getRecipe(event.target.value);
}

// -----------------Youtube API-------------------//

// function to call the youtube api- linked with button in displayrecipe
recipeTitle = $
async function fetchLinkedVideo (recipeTitle){
// event.preventDefault();
apiKey = "add your api key here"
const youtubeURL = `https://www.youtube.com/watch?v=`;
const YouTubeQueryURL = `https://youtube.googleapis.com/youtube/v3/search?maxResults=5&order=viewCount&videoDefinition=high&type=video&videoDuration=medium&part=snippet&q=${recipeTitle}%20recipe%20how%20to&key=${apiKey}`

try {
    const response = await fetch(YouTubeQueryURL);
    const data = await response.json();
    console.log(data);
// create an array of video ids
    const videoArray = data.items.map(item => item.id.videoId);

    console.log(videoArray);

     // Create a container for the videos
     const videoContainer = document.getElementById('videoDetailsContainer');
     videoContainer.innerHTML = ''; // Clear previous video details

     // Create and append iframes for the related videos
     videoIds.forEach(videoId => {
         const videoIframe = document.createElement('iframe');
         videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
         videoIframe.width = '100%';
         videoIframe.height = '315'; // You can adjust the height as needed
         videoIframe.allowFullscreen = true;

         // Append the video iframe to the video container
         videoContainer.appendChild(videoIframe);
     });
    } catch (error) {
      console.error(error.message);
  }
  
}

    // for (let i=0; i<videoArray.length; i++){
    //     if (videoArray.length > 0) {
    //     var videoTemplate = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoArray[i].id.videoId}" frameborder="0" allowfullscreen></iframe>`
    //     }
    // }

    // videoArray.forEach((video) => {
    //     videoTemplate = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
    // });

    // document.getElementById("videoDetailsContainer").innerHTML = videoTemplate;

//   } catch (error) {
//       console.error(error.message);
//   }

// }
fetchLinkedVideo();

// function to save recipe to use later //


// on click function to display youtube videos - link to the button on the full recipe//

