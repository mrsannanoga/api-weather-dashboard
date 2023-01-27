//change search to search icon
var searchBtn = $("#search-button");
searchBtn.text("");
searchBtn.removeClass("search-button");
searchBtn.addClass("btn-primary");
searchBtn.css({
    "border-top-right-radius":"0.25rem", 
    "border-bottom-right-radius":"0.25rem"});

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
clearBtn.attr("class", "btn btn-primary mb-3");
clearBtn.text("Clear history");

$("aside").append(clearBtn);

