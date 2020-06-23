// all available color options
const buttonColors = ["red", "blue", "green", "yellow"];

// store generated pattern and user's choices
let gamePattern = [];
let userClickedPattern = [];

let isStarted = false;
let level = 0;

// start the game
$("html").keydown(function(){
    if(isStarted === false){
        $("#level-title").text("Level: " + level);
        nextSequence();
        isStarted = true;
    }
});

// store color user has clicked
$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

/**
 * 
 * @param {integer} currentLevel = length of current pattern
 * 
 * Checks if the user is correct and progress 
 * or lose and have the option to restart 
 */
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

// choose random color from array and add to pattern
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level: " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// reset game after game over
function startOver(){
    level = 0;
    gamePattern = [];
    isStarted = false;
}

/**
 * 
 * @param {string} name = name of sound file to be played 
 */
function playSound(name){
    let newSound = new Audio("sounds/" + name + ".mp3");
    newSound.play();
}

/**
 * 
 * @param {string} currentColor = color of button to animate
 */
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}




