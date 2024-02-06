// Purpose: To fetch and display YouTube videos based on user input

 async function fetchLinkedVideo (recipe){
    // event.preventDefault();
    apiKey = "Add your api key here"
    const youtubeURL = `https://www.youtube.com/watch?v=`;
    const YouTubeQueryURL = `https://youtube.googleapis.com/youtube/v3/search?maxResults=5&order=viewCount&videoDefinition=high&type=video&videoDuration=medium&part=snippet&q=${recipe}%20recipe%20how%20to&key=${apiKey}`

    try {
        const response = await fetch(YouTubeQueryURL);
        const data = await response.json();
        console.log(data);

        var videoArray = data.items

        console.log(videoArray);
        for (let i=0; i<videoArray.length; i++){
            if (videoArray.length > 0) {
            var videoTemplate = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoArray[i].id.videoId}" frameborder="0" allowfullscreen></iframe>`
            }
        }

        // videoArray.forEach((video) => {
        //     videoTemplate = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
        // });

        document.getElementById("videoDetailsContainer").innerHTML = videoTemplate;
    
    } catch (error) {
        console.error(error.message);
    }
    
 }

    fetchLinkedVideo();


   
