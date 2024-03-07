
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).on("keydown", function() {
  if(!started) {
  $("level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio1 = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio1.play();
}

$(".btn").on("click", function() {
  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name) {
  var audio2 = new Audio("sounds/" + name + ".mp3");
  audio2.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
           $("#" + currentColour).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
               nextSequence();
       }, 1000);
    }
  }
  else {
    console.log("wrong");
    var audio3 = new Audio("sounds/wrong.mp3");
    audio3.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
