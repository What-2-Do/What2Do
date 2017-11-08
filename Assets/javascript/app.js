// Initialize Firebase
    var config = {
      apiKey: "AIzaSyAzZdHTXgYGbi78O-obcf4R02PVJ_yBvI4",
      authDomain: "what2do-a05ed.firebaseapp.com",
      databaseURL: "https://what2do-a05ed.firebaseio.com",
      projectId: "what2do-a05ed",
      storageBucket: "what2do-a05ed.appspot.com"
      // messagingSenderId: "505624481525"
 };

firebase.initializeApp(config);

// was using onload to hide sections, but decided to use css
// window.onload = function() {    
// document.getElementById('resultsSection').style.display = 'none';
// document.getElementById('mapSection').style.display = 'none';
// }

var database = firebase.database();
var map, infoWindow;
var combineLatLng;


// I couldn't get the submit button to work?
$("#submit-location").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();


    // Get the input value
    var location = $("#location").val().trim();
    console.log(location);

document.getElementById('resultsSection').style.display = 'block';
document.getElementById('mapSection').style.display = 'block';

searchLocation(location);
setMap();

});


function searchLocation (location) {
//this is a different way to write the url, I have our "usual" way of writing the api url down below
var url = "https://app.ticketmaster.com/discovery/v2/events.json";
url += '?' + $.param({
  'apikey': "J5Pf0GaMQ2rv8B7eTBMgCXwAavWO6zvr",
  'size': 10,
  'city': location,  //for now I just hard coded "salt lake" but we need to connect the submitted city/location field
  'stateCode': "",
  'countryCode': "",
  'postalCode': "",
  'keyword': ""
});

console.log(url);


   $.ajax({
      type:"GET",
      url: url,
      async:true,
      dataType: "json",
      success: function(json) {
                  // console.log(json);

                 $('#topTen').empty();

                 for (var i = 0; i < 10; i++) {
                  // console.log(json._embedded.events[i].name);
                  // console.log(json._embedded.events[i].url);
                  // console.log(json._embedded.events[i].images[1].url);
                  
                  var newRow = $("<div class='row'>");
                  var topTenDiv = $("<div id='top-ten-" + i + "'>");
                  var titleClass = $("<div class='col-md-4'>");
                  var imageClass = $("<div class='col-md-6'>");
                  
                  var eventName = json._embedded.events[i].name;
                  var title = $("<h2>").text(eventName);  //we need to figure out how to not just show all utah jazz games when we search location for salt lake city
                  
                  var eventUrl = json._embedded.events[i].url;
                  
                  var lat = json._embedded.events[i]._embedded.venues[0].location.latitude;
                  var lng = json._embedded.events[i]._embedded.venues[0].location.longitude;

                  var imageClass = $("<div class='col-md-6'>");
                  var eventImage = json._embedded.events[i].images[1].url;  //we need to adjust the image size because some get really big
                  var image = $('<img>');
                  image.attr('src', eventImage);
                  image.addClass('event-image img-responsive img-rounded');
                  // var link = $('<p class=learnMore>').html("<a target='_blank' href='"+eventUrl+"'>Learn More</a>");
                  
                  combineLatLng = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                  }


                  $('#topTen').append(newRow); 
                  newRow.append(topTenDiv);
                  topTenDiv.append(titleClass);
                  titleClass.append(title);
                  topTenDiv.append(imageClass);
                  imageClass.append(image);
                  // imageClass.append(link);
                  
                  database.ref().push({
                      lat: lat,
                      lng: lng
                    });
                    database.ref().on("value", function(snapshot){
                      // console.log(lat);
                      // console.log(lng);
                    });

                  database.ref().remove();
                  
                  console.log(combineLatLng);
                                   

                 }
                    function popper(){
                      console.log("hi")
                        var reference = document.querySelector('.event-image');
                       var popper = document.querySelector('.img-responsive');
                        var pop = $('<p class=learnMore>').html("<a target='_blank' href='"+eventUrl+"'>Learn More</a>");
                        $('.col-md-6').append(pop)
                        var anotherPopper = new Popper(
                            reference,
                             pop,
                            {
                               
                                placment: 'bottom'
                                      }
                            );
                      } 
                      popper(); 

                  // return combineLatLng; 
                  // console.log("latlng =" + combineLatLng);
               },
      // error: function(xhr, status, err) {
      //             // This time, we do not end up here!
      //          }


    });
   


 }

 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow = new google.maps.InfoWindow;
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}



    function setMap() {

      $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json?address=UK&key=AIzaSyC_j9_HzuJX3nK1O9UuflUyAtsX_asRaDM', 
          type: 'GET',
          async: true,
          success: function(res) {


            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 11,
              center: {lat: 39.8283, lng: -98.5795},
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            

        //   infoWindow = new google.maps.InfoWindow;

        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };

        //     // infoWindow.setPosition(pos);
        //     // // infoWindow.setContent('Location found.');
        //     // infoWindow.open(map);
        //     map.setCenter(pos);
        //   }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        //   });
        // } else {
        //   // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }
      

        // handleLocationError();



            database.ref().on("child_added", function(snapshot) {

              newLat = parseFloat(snapshot.val().lat);
              newLong = parseFloat(snapshot.val().lng);
              // console.log(newLat);
              // console.log(newLong);
             

            var latLong = {lat: newLat, lng: newLong};

            
            var marker = new google.maps.Marker({
              position: latLong,
              map: map
            })

            console.log("combined: " + combineLatLng);
            var newCenter = combineLatLng;
            

            map.setCenter(combineLatLng);

          });
      }
    });
  }


   // "Option #2" to write api url
    // var apiKey = "J5Pf0GaMQ2rv8B7eTBMgCXwAavWO6zvr";
    // var city = "";
    // var stateCode = "";
    // var countryCode = "";
    // var postalCode = "";
    // var keyword = "";

   // $.ajax({
    //   type:"GET",
    //   url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" + apiKey,
    //   async:true,
    //   dataType: "json",
    //   success: function(json) {
    //               console.log(json);
    //               // Parse the response.
    //               // Do other things.
    //            },
    //   error: function(xhr, status, err) {
    //               // This time, we do not end up here!
    //            }
    // });