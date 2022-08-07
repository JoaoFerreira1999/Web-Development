const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("Hello");
});

app.get("/contact", function(req, res){
  res.send("Contact me at: joaomgsferreira@gmail.com");
});

app.get("/about", function(req, res){
  res.send("Website owned by Joao Ferreira");
});

app.get("/hobbies", function(req, res){
  res.send("Game, code, gym.");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
