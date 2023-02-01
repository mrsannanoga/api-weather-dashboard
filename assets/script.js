//CHANGE BASIC WEBPAGE STYLE FOR ASIDE ELEMENTS AND HEADER

//change "search" to search icon
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


// WEBPAGE FUNCTIONS AND EVENT LISTENERS

var cities = JSON.parse(localStorage.getItem("City History")) || [];
var historyList = $("#history")

// search button event listener to store data in local storage
searchBtn.on("click", function (event) {

    event.preventDefault();

    var cityInput = searchInput.val();
    cities.push(cityInput);
    localStorage.setItem("City History", JSON.stringify(cities));


    displayWeather(cityInput);
    displayForecast(cityInput);
    renderHistoryButtons();

});

//render history buttons

function renderHistoryButtons() {

    historyList.empty();

    for (var i = 0; i < cities.length; i++) {

        var newHistoryButton = $("<button>");
        newHistoryButton.text(cities[i]);
        newHistoryButton.attr("id", cities[i]);
        newHistoryButton.addClass("btn btn-primary history-button");
        newHistoryButton.css("margin-bottom", "5px");

        historyList.append(newHistoryButton);
    }

};
//call function to display history buttons after page refresh
renderHistoryButtons();

// history buttons event listener

historyList.on("click", "button", function (event) {
    var buttonName = $(event.target).attr("id");
            displayWeather(buttonName);
            displayForecast(buttonName);
        });

//clear button event listener
clearBtn.on("click", function () {
    localStorage.clear();
    cities = [];
    renderHistoryButtons();
});

// set current day variable
var currentDay = moment().format("DD/MM/YYYY");

//weather data request
function displayWeather(cityName) {

    var apiKey = "668f0e3927f32d39fd3217f656c36bbd";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        var todayWeather = $("#today");
        todayWeather.addClass("card card-body");
        todayWeather.empty();


        var cityName = $("<h3>");
        cityName.text(response.name + " " + "(" + currentDay + ")");

        var temp = $("<div>");
        temp.text("Temperature: " + Math.round(response.main.temp - 273.15) + " °C");

        var wind = $("<div>");
        wind.text("Wind: " + response.wind.speed + " KPH");

        var humidity = $("<div>");
        humidity.text("Humidity: " + response.main.humidity + "%");

        var icon = $("<img>");
        icon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        icon.css({
            "width": "20%",
            "height": "20%"
        });




        todayWeather.append(cityName, icon, temp, wind, humidity);



    })

};

function displayForecast(cityName) {

    var apiKey = "668f0e3927f32d39fd3217f656c36bbd";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var forecastFor5 = $("#forecast");
        forecastFor5.empty();

        var forecastHeading = $("<h4>");
        forecastHeading.text("5-Day Forecast");
        forecastHeading.addClass("col-12");
        forecastFor5.append(forecastHeading);



        for (var i = 0; i < 5; i++) {

            var forecastIndex = i * 8 + 4;  //to find all needed data for 5 days each only targeting 12pm 

            var forecastCard = $("<div>");
            forecastCard.addClass("col-md-2 card forecast m-2");


            var forecastDate = $("<h5>")
            forecastDate.text(moment().add(i + 1, "days").format("DD/MM/YYYY"));
            forecastDate.css("padding-top", "10px");




            var forecastIcon = $("<img>");
            forecastIcon.attr("src", "https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");

            var forecastTemp = $("<div>");
            forecastTemp.text("Temperature: " + Math.round(response.list[forecastIndex].main.temp - 273.15) + " °C");

            var forecastWind = $("<div>");
            forecastWind.text("Wind: " + response.list[forecastIndex].wind.speed + " KPH");

            var forecastHumidity = $("<div>");
            forecastHumidity.text("Humidity: " + response.list[forecastIndex].main.humidity + "%")





            forecastCard.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity);


            forecastFor5.append(forecastCard);

        }

    })
};
