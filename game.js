var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;


//to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (hasStarted == false) {
    //h1 title starts out saying "Press A Key to Start", when the game has started
    nextSequence();
    hasStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  idxLastAnswer = userClickedPattern.length - 1
  checkAnswer(idxLastAnswer);
});

function nextSequence() {
  //reset userClickedPattern
  userClickedPattern = [];

  //increase the level by 1 every time nextSequence() is called.
  level++;

  //update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //play wrong.mp3
    playSound("wrong");

    //red flash of background
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //update the h1 to indicate the game is over
    $("#level-title").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  //reset the values
  level = 0;
  gamePattern = [];
  hasStarted = false;
}