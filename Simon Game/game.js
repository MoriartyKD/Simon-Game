var buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keypress(function() {

  if(!start)
  {
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var rand = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[rand];
  gamePattern.push(randomChosenColour);

  for(var i=0 ; i<gamePattern.length ; i++)
  {
    task(i);
    //var audio = new Audio('sounds/' + gamePattern[i] + '.mp3');
    //audio.play();

  }
}

function task(i)
{
  setTimeout( function() {
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  }, 1000*(i+1));
}

$(".btn").on("click" , handler);

function handler() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  } , 100);
}


function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {

    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function() {
        nextSequence();
      } , 1000);
    }

  }
  else
  {
      $("h1").text("GAME OVER!! PRESS ANY KEY TO START");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      start=false;
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      $("body").css("backgroundColor" , "red");
      setTimeout(function() {
        $("body").css("backgroundColor" , "#52575d");
      }, 100);
  }

}

/*
switch(i)
{
  case 0:
    var redaudio = new Audio('sounds/red.mp3');
    redaudio.play();
    break;

    case 1:
      var blueaudio = new Audio('sounds/blue.mp3');
      blueaudio.play();
      break;

      case 2:
        var greenaudio = new Audio('sounds/green.mp3');
        greenaudio.play();
        break;

        case 3:
          var yellowaudio = new Audio('sounds/yellow.mp3');
          yellowaudio.play();
          break;

          default:
            cosole.log("Invalid");
}

*/
