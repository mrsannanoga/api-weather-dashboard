//change search to search icon
var searchBtn = $("#search-button");
searchBtn.text("");
searchBtn.removeClass("search-button");
searchBtn.addClass("btn-primary");
searchBtn.css({
    "border-top-right-radius": "0.25rem",
    "border-bottom-right-radius": "0.25rem"
});

//create search icon
var searchIcon = $("<i>");
searchIcon.attr("class", "fas fa-search");
searchIcon.css("color", "white");
searchBtn.append(searchIcon);

//add class to form input, change its placeholder text
var searchInput = $("#search-input");
searchInput.addClass("form-control");
searchInput.attr("placeholder", "Choose a city");


//change header background color to image
var header = $("header");
header.css("background-image", 'url("images/clouds.jpg")');

//add clear button

var clearBtn = $("<button>")
clearBtn.attr("id", "clear-button");
clearBtn.attr("class", "btn btn-outline-primary mb-3");
clearBtn.text("Clear history");

$("aside").append(clearBtn);

//render history buttons
var cityInput = searchInput.val();
var cities = [];

function renderHistoryButtons() {

    $("#history").empty();


    for (var i = 0; i < cities.length; i++) {


        var cityInput = searchInput.val();
        var newHistoryButton = $("<button>");
        newHistoryButton.text(cities[i])
        newHistoryButton.attr("id", cityInput)
        newHistoryButton.addClass("btn btn-primary history-button");
        newHistoryButton.css("margin-bottom", "5px");

        newHistoryButton.on("click", function () {

            displayWeather(newHistoryButton.val());
        });
        $("#history").append(newHistoryButton);


    }
};

// search button event listener for buiding history buttons

searchBtn.on("click", function (event) {

    event.preventDefault();
    var cityInput = searchInput.val();
    cities.push(cityInput);

    renderHistoryButtons();
});

//weather data request
function displayWeather() {

    // var myClickBtn = $(event.target);
    // var cityName = myClickBtn.cityInput;

    var cityInput = searchInput.val();
    var apiKey = "668f0e3927f32d39fd3217f656c36bbd";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })


};

searchBtn.on("click", displayWeather);


