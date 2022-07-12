var userClickedPattern=[];
var gamePattern=[];

var buttonColors=["red","blue","green","yellow"];

var level=1;

// the game sequence
function nextSequence(){
  $("h1").text("Level "+level)
  var randomNum=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern)
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(50).fadeIn(50);
  animatePress(randomChosenColor);
}

// a user press any keyboad key to start the game
  $(document).keypress(function(){
    var ter=document.querySelector("h1").innerHTML;
    if(ter=="Level "+level){
      console.log(gamePattern)
    }else{
      nextSequence();
    }
  })

 //game soung play sound
function playSound(name){
  var psound=new Audio("sounds/"+name+".mp3")
  return psound.play();
}

// when a user click a button
$(".btn").click(function(){

var tery=[];
  var clickId=$(this).attr("id");
  handler(clickId);
  var ind=userClickedPattern.length-1;
  checkAnswer(clickId);
})
// a user's clicked answer
function handler(ev){
  var userChoosenColour=ev
  userClickedPattern.push(userChoosenColour)
  playSound(userChoosenColour)
  console.log(userClickedPattern)
  $("#"+userChoosenColour).fadeOut(50).fadeIn(50);
  animatePress(userChoosenColour);
}

//Animated button click
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100)
}

//check if the user clicked answer is same as game pattern
function checkAnswer(currentLevel){
  //wrongPattern()
  indexucp=userClickedPattern.lastIndexOf(currentLevel)
  if(userClickedPattern[indexucp]==gamePattern[indexucp]){
    console.log("right");
    if(userClickedPattern.length==gamePattern.length){
      level+=1;
      console.log("proceed");
      setTimeout(nextSequence,1000);
      userClickedPattern.length=0;
      console.log(userClickedPattern)

    }else{

    }
  }else{
    playSound("wrong");
    badychange()
    startOver()
  }
}

/*function wrongPattern(){
  console.log(userClickedPattern==gamePattern)

  for (var i=0; i<userClickedPattern.length; i++){

      if (userClickedPattern[i]==gamePattern[i]){
        console.log(userClickedPattern[i]==gamePattern[i])
        var ucp=userClickedPattern.length;
        var gp=gamePattern.length;
        if(ucp==gp && userClickedPattern[ucp-1]==gamePattern[gp-1]){
          level+=1;
          console.log("proceed");
          setTimeout(nextSequence,1000);
          userClickedPattern.length=0;
          console.log(userClickedPattern)

        }else{

        }
      }else{
          playSound("wrong");
          badychange()
      }

    }
  }*/

  function badychange(){
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    document.querySelector("h1").innerHTML="Game over, press any key to restart"
  }

  function startOver(){
    gamePattern.length=0;
    level=1;
    userClickedPattern.length=0;
  }
