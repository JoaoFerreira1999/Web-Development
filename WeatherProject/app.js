const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const country = req.body.cityName;
  const apiKey = "03061974cf8b3779fe42aafdfbdfee47";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + country + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const name = weatherData.name;
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const iconID = weatherData.weather[0].icon;

        const iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"

        res.write("<html>");
        res.write("<p>The weather is currently " + desc + "</p>");
        res.write("<h1>The temperature in " + name + " is " + temp + "</h1>");
        res.write("<img src=" + iconURL + ">");
        console.log(iconURL);
        res.write("</html>");
        res.send();
      });
  });
});


app.listen(3000, function(){
  console.log("Running on port 3000");
})
