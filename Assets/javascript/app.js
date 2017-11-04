// Initialize Firebase
    var config = {
      apiKey: "AIzaSyAzZdHTXgYGbi78O-obcf4R02PVJ_yBvI4",
      authDomain: "what2do-a05ed.firebaseapp.com",
      databaseURL: "https://what2do-a05ed.firebaseio.com",
      projectId: "what2do-a05ed",
      storageBucket: "what2do-a05ed.appspot.com",
      messagingSenderId: "505624481525"
 };
 firebase.initializeApp(config);

// I couldn't get the submit button to work?
// $("#submit-location").on("click", function(event) {
//     // Prevent form from submitting
//     event.preventDefault();

//     // Get the input value
//     location = $("#location").val().trim();
//     console.log(location);

// });


//this is a different way to write the url, I have our "usual" way of writing the api url down below
var url = "https://app.ticketmaster.com/discovery/v2/events.json";
url += '?' + $.param({
  'apikey': "J5Pf0GaMQ2rv8B7eTBMgCXwAavWO6zvr",
  'size': 10,
  'city': "new york city",  //for now I just hard coded "salt lake" but we need to connect the submitted city/location field
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
                  console.log(json);

                 $('#topTen').empty();

                 for (var i = 0; i <= 9; i++) {
                  console.log(json._embedded.events[i].name);
                  console.log(json._embedded.events[i].url);
                  console.log(json._embedded.events[i].images[1].url);
                  
                 var topTenDiv = $("<div id='top-ten-" + i + "'>");
                  var eventName = json._embedded.events[i].name;
                  var title = $("<h2>").text(eventName);  //we need to figure out how to not just show all utah jazz games when we search location for salt lake city
                  var eventUrl = json._embedded.events[i].url;
                  var eventImage = json._embedded.events[i].images[1].url;  //we need to adjust the image size because some get really big
                  var image = $('<img>');
                  image.attr('src', eventImage);
                  image.addClass('event-image');
                  var link = $('<p>').html("<a target='_blank' href='"+eventUrl+"'>Learn More</a>");
                  topTenDiv.append(title);
                  topTenDiv.append(image);
                  topTenDiv.append(link);
                  $('#topTen').append(topTenDiv);




                 }
                  // Parse the response.
                  // Do other things.
               },
      error: function(xhr, status, err) {
                  // This time, we do not end up here!
               }
    });


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