var gifArray = ["Ron Swanson", "Leslie Knope", "April Ludgate", "Tom Haverford", "Ben Wyatt", "Jerry Gergich", "Donna Meagle", "Craig Middlebrooks", "Jean Ralphio", "Councilman Jamm", "Lil Sebastian", "Burt Macklin", "Janet Snakehole", "Mona Lisa Saperstein", "Johnny Karate", "DJ Roomba", "Chris Traeger", "Ann Perkins"]
var newGif


function createButtons() {
    $("#button-row").empty()
    for (i = 0; i < gifArray.length; i++) {
        $("#button-row").append("<button class = 'btn btn-success gif-buttons' id = 'gif-button-" + [i] + "' value = '" + gifArray[i] + "'>" + gifArray[i] + "</button>")
    }
}
createButtons()

$("#searchButton").on("click", function () {
    var newGif = $("#gif-input").val()
    gifArray.push(newGif)
    createButtons()    
    $("#gif-input").val('')
})

$("#button-row").on("click", ".gif-buttons", function() {
    var gifSearch = $(this).val()
    console.log($(this).val())
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "-parks-and-recreation&lang=en&api_key=JTlkrJVw0NOuhHwqFjcH5kgpUov3CF42&limit=12"
    $("#gif-row").empty()
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            var animated = response.data[i].images.original.url
            var still = response.data[i].images.original_still.url
            var rating = response.data[i].rating.toUpperCase()
            $("#gif-row").append('<div class= "col-sm-6 col-md-4"><a class= "lightbox"><img src= "' + still + '" data-animate= "' + animated + '" data-still= "' + still + '" data-state = "still" class = "gif-class" id = "img-' + [i] + '"></a><p>Rating: ' + rating + '</div>')
        }
    });
})




$("#gif-row").on("click", 'img', function() {
    if ($(this).attr("data-state") === "still") {
      $(this).attr("src", $(this).attr("data-animate"))
      $(this).attr("data-state", "animate") 
    }

    else {
      $(this).attr("src", $(this).attr("data-still"))
      $(this).attr("data-state", "still")
    }
})
