const express = require("express");
const https =require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
   const location = req.body.cityName;
   const apiKey = "5d02d580b813c17f28d9dc6bef47d3bf";
   https.get("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=metric", function(response) {
      console.log("Status Code: " + response.statusCode);

      response.on("data", function(data) {
         const weatherData = JSON.parse(data);
         const temp = weatherData.main.temp;
         const description = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

         res.write("<h1>Weather in " + location.toUpperCase() + "</h1>");
         res.write("<p>Temperature: " + temp + " °C</p>");
         res.write("<p>Description: " + description.toUpperCase() + "</p>");
         res.write("<img src='" + iconUrl + "'>");
         res.send();
      });
   });
});

   app.listen(3000, function () {
      console.log("Server started on port 3000");
});