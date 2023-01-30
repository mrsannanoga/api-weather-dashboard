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

// search button event listener for buiding history buttons, store data in local storage
searchBtn.on("click", function (event) {

    event.preventDefault();
    var cityInput = searchInput.val();
    citiesHistory.push(cityInput);
    localStorage.setItem("City History", JSON.stringify(citiesHistory));

    renderHistoryButtons();
    displayWeather(cityInput);

});

//render history buttons
var cityInput = searchInput.val();
//var citiesHistory = [];
var citiesHistory = JSON.parse(localStorage.getItem("City History")) || [];   //check this again, to make buttons seen after refreshing page
var historyList = $("#history");

function renderHistoryButtons() {

    $("#history").empty();


    for (var i = 0; i < citiesHistory.length; i++) {


        var newHistoryButton = $("<button>");
        newHistoryButton.text(citiesHistory[i]);
        newHistoryButton.attr("id", citiesHistory[i]);
        newHistoryButton.addClass("btn btn-primary history-button");
        newHistoryButton.css("margin-bottom", "5px");




        var historyButton = newHistoryButton;
        historyButton.on("click", function (event) {
            event.preventDefault();

            displayWeather(historyButton.attr("id"));
        });
        // var addedHistoryButton = $(".history-button");
        // addedHistoryButton.on("click", displayWeather(addedHistoryButton.text));
        // newHistoryButton.on("click", function () {

        //     displayWeather(newHistoryButton.text());
        // });
        historyList.append(historyButton);

    }

};
//call function to display history buttons after page refresh
renderHistoryButtons();

// var historyButton = $(".history-button");
// historyButton.on("click", function (event) {
//     event.preventDefault();

//     displayWeather(historyButton.attr("id"));
// });
// historyList.on("click", "button", function(event){
//     event.preventDefault();

//  displayWeather(this.text());
// })



//clear button function
clearBtn.on("click", function () {
    localStorage.clear();
    citiesHistory = [];
    renderHistoryButtons();
});

// set current day variable
var currentDay = moment().format("DD/MM/YYYY");

//weather data request
function displayWeather(cityName) {

    //var cityInput = searchInput.val();
    var apiKey = "668f0e3927f32d39fd3217f656c36bbd";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        var todayWeather = $("#today");
        todayWeather.addClass("card card-body");
        var forecastFor5 = $("#forecast");
        todayWeather.empty();
        forecastFor5.empty();

        var cityName = $("<h3>");
        var temp = $("<div>")
        var wind = $("<div>")
        var humidity = $("<div>")
        var icon = $("<img>")
        icon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        icon.css({
            "width": "20%",
            "height": "20%"
        });


        todayWeather.append(cityName);
        todayWeather.append(icon);
        todayWeather.append(temp);
        todayWeather.append(wind);
        todayWeather.append(humidity);

        cityName.text(response.name + " " + "(" + currentDay + ")");
        temp.text("Temperature: " + Math.round(response.main.temp - 273.15) + " °C");
        wind.text("Wind: " + response.wind.speed + " KPH");
        humidity.text("Humidity: " + response.main.humidity + "%");

    })





};

//search click event to display weather
//searchBtn.on("click", displayWeather());

//history button event listener 

// var addedHistoryButton = $(".history-button");
// addedHistoryButton.on("click", displayWeather(addedHistoryButton.text));

//$(".history-button").on("click", displayWeather(this.val()));
// $(".history-button").on("click", function () {
//     cityInput = this.attr("id")
//     displayWeather();
// });


//retrieve history buttons after refresh
// $(document).ready(function () {
//     localStorage.getItem("City History");
//     renderHistoryButtons();
// });

