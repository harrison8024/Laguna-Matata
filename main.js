
$(document).ready(initializeApp);

var map;
var markerArray = [];
var beachesArray = [];
let storeYelpMarkers = [];
var beachArray = [
    "Cameo Cove",
    "Emerald Bay",
    "Crescent Bay",
    "Shaws Cove",
    "Fishermans Cove",
    "Divers Cove",
    "Heisler Park Beach",
    "Main Beach",
    "Thalia Street Beach",
    "Woods Cove Beach",
    "Moss Cove",
    "Victoria Beach",
    "Treasure Island Beach",
    "Aliso Beach",
    "West Street Beach",
    "Table Rock Beach",
    "1000 Steps Beach"
];

var beachIdArray= [
    "ChIJebS6-Rzk3IARQjvVK17E-H4",
    "ChIJGwIiwBjk3IAR_KeQzuCxMDA",
    "ChIJiR_-gDvk3IARJvNOyNe6nqs",
    "ChIJN44pRjrk3IAR7UHsqYmz59g",
    "ChIJ0cOR_znk3IARGq0Veobn4tw",
    "ChIJdct2SDfk3IAR30_IxuG-S4Q",
    "ChIJKSemcTbk3IARS9eQ4c_fJcY",
    "ChIJH4Y5okrk3IAR2siC9QLVqCY",
    "ChIJh77BF7Ll3IARvW4krXcoTic",
    "ChIJ7UfHk6fl3IARn2CG_pg08cY",
    "ChIJ24QSxQnl3IAR6NkD-jHsJRg",
    "ChIJE76HsRLl3IARM9c5begLxOg",
    "ChIJtxPwxWzl3IARgHe-w_aL1AM",
    "ChIJU3TgxGnl3IAR26h3tmJHpSA",
    "ChIJe58-Flvl3IARcLNCkfMFFt0",
    "ChIJN2AXi1rl3IARndYdtkSYiRo",
    "ChIJJ50s6lXl3IARJr8oXjZjiL8"

];

var beachLongLat = [
    [33.55391, -117.8161],
    [33.55163, -117.80913],
    [33.54665, -117.80159],
    [33.54569, -117.79804],
    [33.54545, -117.79587],
    [33.54466, -117.79398],
    [33.54341, -117.79074],
    [33.54172, -117.78477],
    [33.5359, -117.77948],
    [33.52704, -117.77098],
    [33.5254, -117.76906],
    [33.51941, -117.76292],
    [33.51449, -117.75946],
    [33.50995, -117.75245],
    [33.50537, -117.74861],
    [33.50198, -117.7464],
    [33.49776, -117.74143]
];

var imageArray = [
    "./assets/Images/cameoCove.jpg",
    "./assets/Images/emeraldBay.jpg",
    "./assets/Images/cresentBay.jpg",
    "./assets/Images/shawsCove.jpg",
    "./assets/Images/fishermansCove.jpg",
    "./assets/Images/diversCove.jpg",
    "./assets/Images/HeislerParkBeach.jpg",
    "./assets/Images/mainBeach.jpg",
    "./assets/Images/thaliaStreet.jpg",
    "./assets/Images/woodsCove.jpg",
    "./assets/Images/mossCove.jpg",
    "./assets/Images/victoria.jpg",
    "./assets/Images/treasureIsland.jpg",
    "./assets/Images/alisoCreek.jpg",
    "./assets/Images/coastRoyale.jpg",
    "./assets/Images/tableRock.jpg",
    "./assets/Images/thousandStepsBeach.jpg",
    "./assets/Images/cameoCove.jpg"
];
var yelpStars = {
    "0":"./assets/small/small_0@2x.png",
    "1":"./assets/small/small_1@2x.png",
    "1.5":"./assets/small/small_1_half@2x.png",
    "2":"./assets/small/small_2@2x.png",
    "2.5":"./assets/small/small_2_half@2x.png",
    "3": "./assets/small/small_3@2x.png",
    "3.5": "./assets/small/small_3_half@2x.png",
    "4":"./assets/small/small_4@2x.png",
    "4.5":"./assets/small/small_4_half@2x.png",
    "5":"./assets/small/small_5@2x.png"
};
function initializeApp() {
    getWeatherFomDarkSky();
    constructBeachObjects();
}

function getWeatherFomDarkSky(){
    var ajaxConfig = {
        'dataType': 'jsonp',
        'url': ' https://api.darksky.net/forecast/7c03619a4eb88722f133d0a7878f1503/33.51941, -117.76292',
        'method': 'GET',
        success: function (result) {
            let currentTemp = `${Math.ceil(result.currently.temperature)} ${String.fromCharCode(176)}F`;
            let currentWeatherSummary = `Currently: ${result.currently.summary}`;
            let feelsLikeTemp = `Feels Like: ${Math.ceil(result.currently.apparentTemperature)} F`;
            let humidity = `Humidity: ${((result.currently.humidity)*100)}%`;
            let dailyHighTemp = `High: ${Math.ceil(result.daily.data[0].temperatureMax)} F`;
            let dailyLowTemp = `Low: ${Math.ceil(result.daily.data[0].temperatureMin)} F`;
            let dailyWeatherSummary = result.daily.data[0].summary;
            let sunriseTime = `Sunrise: ${convertTimeToPacificDaylight(result.daily.data[0].sunriseTime)}`;
            let sunsetTime = `Sunset: ${convertTimeToPacificDaylight(result.daily.data[0].sunsetTime)}`;
            let localWeatherObject = {currentTemp, currentWeatherSummary, feelsLikeTemp, humidity, dailyHighTemp, dailyLowTemp, dailyWeatherSummary, sunriseTime, sunsetTime};
            appendWeatherInfoToDom(localWeatherObject);
        },
        error: function(){
        }
    };
    $.ajax(ajaxConfig);
}

function convertTimeToPacificDaylight(time){
    let newTime = new Date(time*1000);
    let hours = newTime.getHours();
    let minutes = "0" + newTime.getMinutes();
    if (hours > 12){
        hours -=12;
        let convertedTime = `${hours}:${minutes.substr(-2)} PM`;
        return convertedTime;
    }
    let convertedTime = `${hours}:${minutes.substr(-2)} AM`;
    return convertedTime;
}

function appendWeatherInfoToDom (obj){
    let currentTemp = $("<div>").text(obj.currentTemp);
    let currentWeatherSummary = $("<p>").text(obj.currentWeatherSummary);
    let feelsLikeTemp =  $("<p>").text(obj.feelsLikeTemp);
    let humidity =  $("<p>").text(obj.humidity);
    let dailyHighTemp =  $("<p>").text(obj.dailyHighTemp);
    let dailyLowTemp =  $("<p>").text(obj.dailyLowTemp);
    let dailyWeatherSummary = $("<p>").text(obj.dailyWeatherSummary);
    let sunriseTime = $("<p>").text(obj.sunriseTime);
    let sunsetTime = $("<p>").text(obj.sunsetTime);
    let divOne = $("<div>");
    let divTwo = $("<div>");
    let divThree = $("<div>");
    currentTemp.addClass("weather-temp");
    divOne.addClass("weather-other").append(currentWeatherSummary, feelsLikeTemp, humidity);
    divTwo.addClass("weather-other").append(dailyLowTemp, dailyHighTemp, sunriseTime);
    divThree.addClass("weather-other").append(sunsetTime, dailyWeatherSummary);
    $('.weather').append(currentTemp, divOne, divTwo, divThree);
}

function initMap() {
    var lagunaCenter = {lat: 33.522759, lng: -117.763314};
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: lagunaCenter,
        zoom: 13.4,
        disableDefaultUI: true,
        mapTypeId: 'terrain',
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                featureType: 'poi.business',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#275D87"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ]
    });
    setTimeout(function () {
        dropMarker();
    }, 500);
}

function constructBeachObjects(){
    for(var i = 0; i < beachLongLat.length; i++){
        var beach = {
            name: beachArray[i],
            location: beachLongLat[i],
            picture : imageArray[i],
            id: beachIdArray[i],
        };
        beachesArray.push(beach);
    }
}
function dropMarker() {
    var image = {
        url: 'assets/Images/beachIcon.png',
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };
    for(var latlngArrayIndex = 0; latlngArrayIndex < beachLongLat.length; latlngArrayIndex++) {
        var marker = new google.maps.Marker({

            position: {
                lat: beachesArray[latlngArrayIndex].location[0],
                lng: beachesArray[latlngArrayIndex].location[1]
            },
            map: map,
            icon: image,
            label: "",
            animation: google.maps.Animation.DROP,
        });
        /*
        var storeType = ["bar", "coffee", "food", "rental", "hotel"];
        for (var typeIndex = 0; typeIndex < storeType.length; typeIndex++) {
            yelpRatingandPictures(beachesArray[latlngArrayIndex], storeType[typeIndex]);
        }*/

        clickHandler(marker, beachesArray[latlngArrayIndex],latlngArrayIndex);
        markerArray.push(marker)

    }
}

function clickHandler(markerClicked, beachObj, index){
    var storeType = ["bar", "coffee", "food", "rental", "hotel"];
    markerClicked.addListener('click', function() {
        $(".info-1").empty();
        for (var typeIndex = 0; typeIndex < storeType.length; typeIndex++) {
             yelpRatingandPictures(beachObj, storeType[typeIndex]);
        }

        for(var i = 0; i < markerArray.length; i++){
            markerArray[i].setIcon({
                url: 'assets/Images/beachIcon.png',
                anchor: new google.maps.Point(0, 0),
                origin: new google.maps.Point(0, 0),
            });
            markerArray[i].setAnimation(null);
        }
        markerClicked.setIcon({
            url: 'assets/Images/beachIconSelected.png',
            anchor: new google.maps.Point(0, 0),
            origin: new google.maps.Point(0, 0),
        });
        map.panTo(markerClicked.getPosition());
        map.setZoom(16);
        markerClicked.setAnimation(google.maps.Animation.BOUNCE);
        displayImage(beachObj);
        displayComment(beachObj);
        removeMarkers(storeYelpMarkers);
    });
}

function displayImage(clickedObj){
    $('.image').css('background-image', 'url('+clickedObj.picture+')');
}

function displayComment(clickedObj){
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: clickedObj.id
    }, function(place) {
        $('.reviewText').text(place.reviews[0].text);
        $('.reviewRating').text(place.reviews[0].rating + ' Stars');
        $('.beachName').text(clickedObj.name);
    });
}

function yelpRatingandPictures(beachObject, type) {
    let latLng = {lat:beachObject.location[0], lng:beachObject.location[1]};
    let ajaxConfig = {
        dataType: "json",
        url: "http://danielpaschal.com/yelpproxy.php",
        method: "GET",
        data: {
            latitude: latLng.lat,
            longitude: latLng.lng,
            term: type,
            radius: 600,
            api_key:
                "VFceJml03WRISuHBxTrIgwqvexzRGDKstoC48q7UrkABGVECg3W0k_EILnHPuHOpSoxrsX07TkDH3Sl9HtkHQH8AwZEmj6qatqtCYS0OS9Ul_A02RStw_TY7TpteWnYx"
        },
        success: function(response) {
            yelpObjectConstructor(response, type, beachObject);
        },
        error: function() {
            console.log("The server returned no information.");
        }
    };
    $.ajax(ajaxConfig)
}


function yelpObjectConstructor(yelpData, type, beach){
    var storeObjectArray = [];
    if(yelpData.businesses.length ===0){
        return
    }else{
        appendYelpType(type);
    }
    for (var storeIndex = 0; storeIndex < yelpData.businesses.length; storeIndex++) {
        let businesses_Name = yelpData.businesses[storeIndex].name;
        let businesses_Img = yelpData.businesses[storeIndex].image_url;
        let businesses_Rating = yelpData.businesses[storeIndex].rating;
        let businesses_Coordinates = yelpData.businesses[storeIndex].coordinates;
        let businesses_Distance = yelpData.businesses[storeIndex].distance;
        let businesses_Review_count = yelpData.businesses[storeIndex].review_count;
        var storeObject = {
            businesses_Name,
            businesses_Img,
            businesses_Rating,
            businesses_Coordinates,
            businesses_Distance,
            businesses_Review_count
        };
        storeObjectArray.push(storeObject);
        append_Yelp_Data_To_Dom(storeObject);
        // plot_Yelp_Data_On_Map(storeObject);
    }
    beach[type] = storeObjectArray;
}
function appendYelpType(storeType) {
    var type = $("<div>").attr("class", "storeType").text(storeType);
    $('.info-1').append(type);
}

function append_Yelp_Data_To_Dom( storeObject,){
    let name = $("<p>").text(storeObject.businesses_Name);
    let image = $("<img>").attr('src', storeObject.businesses_Img);
    image.addClass('yelp_img');
    let ratingNumber = storeObject.businesses_Rating.toString();
    let yelp_star = $("<img>").attr("src", yelpStars[ratingNumber]);
    yelp_star.addClass("yelpStars");
    // let rating =  $("<p>").text("Rating " + storeObject.businesses_Rating);
    let reviewCount =  $("<p>").text( storeObject.businesses_Review_count + " reviews");
    let yelp_data_content = $("<div>");
    yelp_data_content.addClass('yelp').append(name,image,yelp_star,reviewCount);
    $('.info-1').append(yelp_data_content);
    let yelpMarker = plot_Yelp_Data_On_Map(storeObject);
    yelp_data_content.on("click", function(){
        $(".yelpSelected").removeClass("yelpSelected");
        yelp_data_content.addClass("yelpSelected");
    });
    yelp_data_content.on("click", yelpMarker, function(){
        for(let markerIndex = 0; markerIndex < storeYelpMarkers.length; markerIndex++){
            storeYelpMarkers[markerIndex].setAnimation(null);
        }
        yelpMarker.setAnimation(google.maps.Animation.BOUNCE);
    });
}

function scrolling() {
    $('.info-1').scrollTop(300);
}

function plot_Yelp_Data_On_Map(yelpPlace){
    let yelpMarker = new google.maps.Marker({
        position: {
            lat: yelpPlace.businesses_Coordinates.latitude,
            lng: yelpPlace.businesses_Coordinates.longitude
        },
        map: map,
        label: "",
        animation: google.maps.Animation.DROP,
    });
    storeYelpMarkers.push(yelpMarker);
    return yelpMarker;
}

function removeMarkers(YelpMarkers){
    for(let i=0; i<YelpMarkers.length; i++){
        YelpMarkers[i].setMap(null);
    }
}

