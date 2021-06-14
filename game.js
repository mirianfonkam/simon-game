var buttonColours = ["red", "blue", "green", "yellow"];

//preset game values
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;


//function to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function () {
  //h1 title starts out saying "Press A Key to Start", when the game starts
  if (hasStarted == false) {
    nextSequence();
    hasStarted = true;
  }
});

//function to generate the next game sequence at random 
function nextSequence() {
  //reset userClickedPattern, so user can input the answer to the nextSequence
  userClickedPattern = [];
  //increase the level by 1 every time nextSequence() is called.
  level++;
  //update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  // generates random button
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //creates a loop through each color in the gamePattern array, output the nextSequence
  gamePattern.forEach(function (element, index) {
    //setTimeout is async, forEach is synchronous
    setTimeout(function(){
      $("#" + element).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(element);
    }, 500 * (index + 1));
  });
}


//function plays the corresponding sound for a particular color
function playSound(colorName) {
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}

//function to detect when a button was clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //gets the index of the button the user just clicked
  idxLastAnswer = userClickedPattern.length - 1
  checkAnswer(idxLastAnswer);
});

//function to show the user the button was clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to show user the game is over
function animateGameOver() {
      //red flash of background
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
}

//function to check if the button the user just clicked matches the game pattern
function checkAnswer(buttonIdx) {
  //check if the button the user clicked is equal to the button in the game pattern
  if (userClickedPattern[buttonIdx] === gamePattern[buttonIdx]) {
    //when the current button index is the end of the gamePattern, generate nextSequence
    if (buttonIdx === gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //play wrong.mp3
    playSound("wrong");
    // flash red background
    animateGameOver()
    //update the h1 to indicate the game is over
    $("#level-title").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

//function to reset to default game values
function startOver() {
  level = 0;
  gamePattern = [];
  hasStarted = false;
}