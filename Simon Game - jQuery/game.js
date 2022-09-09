
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

start = false;
level = 0;

$(document).keypress(function(event){
  if(!start){
    nextSequence();
    $("#level-title").text("Level " + level);
    start = true;
  }else{
    alert("Game Started!");
  }
})


$(".btn").click(function(event){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // for(var start = 0; start < gamePattern.length; start ++){
  //   if(userClickedPattern[start] == undefined){
  //     return;
  //   }
  //   console.log(userClickedPattern[start]);
  //   if(userClickedPattern[start] !== gamePattern[start]){
  //     alert("You lost!");
  //     location.reload();
  //   }
  // }
  // nextSequence();
  console.log(userClickedPattern);
});


function nextSequence(){

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    $("#level-title").text("Game Over, Press Any Key to Restart!");
      $(document).on("click", function(event){
      setTimeout(function(){
        location.reload();
      }, 1000);
    });

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
  }
}

function playSound(name){
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  }, 500);
}
