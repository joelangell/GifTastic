

var gifArray = ["Burt Maclin", "Ron Swanson", "Dennis Feinsten"]
var newGif




function createButtons() {
    $("#button-row").empty()
    for (i = 0; i < gifArray.length; i++) {
        $("#button-row").append("<button class = 'gif-buttons' id = 'gif-button-" + [i] + "' value = '" + gifArray[i] + "'>" + gifArray[i] + "</button>")
    }
}
createButtons()

$("#searchButton").on("click", function () {
    var newGif = $("#gif-input").val()
    gifArray.push(newGif)
    createButtons()    
})

$(".gif-buttons").on("click", function() {
    var gifSearch = $(this).val()
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&rating=g&lang=en&api_key=JTlkrJVw0NOuhHwqFjcH5kgpUov3CF42&limit=10"
    $("#gif-row").empty()
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            console.log(response.data[i].images.original.original_still.url)
            $("#gif-row").append("<div class='col-sm-6 col-md-4'><a class= 'lightbox'><img src= '" + response.data[i].images.original_still.url + "' data-still: '" + response.data[i].images.original_still.url + "' data-animate: '" + response.data[i].images.original.url + "' id = 'img-" + [i] + "'></a></div>")
        }
    });
})

var count = 0
$("#gif-row").on("click", function() {
    console.log(this)
  count++
  if(count%2) {$(this).attr("src", $(this).attr("data-animate"))}
  else { $(this).attr("src", $(this).attr("data-still"))}
})