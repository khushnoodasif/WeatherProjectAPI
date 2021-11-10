const express = require("express");
const https =require("https");

const app = express();

app.get('/', function(req, res) {
   https.get("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=5d02d580b813c17f28d9dc6bef47d3bf&units=metric", function(response) {
      console.log("Status Code: " + response.statusCode);

      response.on("data", function(data) {
         const weatherData = JSON.parse(data);
         const temp = weatherData.main.temp;
         const description = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

         res.write("<h1>For Weather in London.</h1>");
         res.write("<p>Temperature: " + temp + " C</p>");
         res.write("<p>Description: " + description + "</p>");
         res.write("<img src='" + iconUrl + "'>");
         res.send();
      });
   });
})

app.listen(3000, function () {
      console.log("Server started on port 3000");
});