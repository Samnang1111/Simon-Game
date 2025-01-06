var currentLevel = 0;
var highestLevel = 0; // Variable to track the highest level
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    currentLevel++;
    $('#level-title').html(`Level ${currentLevel}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
}

$(".btn").click(function (event) {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio;
    switch (name) {
        case 'blue':
            audio = new Audio('sounds/blue.mp3');
            break;
        case 'green':
            audio = new Audio('sounds/green.mp3');
            break;
        case 'red':
            audio = new Audio('sounds/red.mp3');
            break;
        case 'yellow':
            audio = new Audio('sounds/yellow.mp3');
            break;
        default:
            audio = new Audio('sounds/wrong.mp3');
    }
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

$(document).on('keydown', function (event) {
    if (currentLevel === 0) {
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = []; // Clear user pattern for the next round
        }
    } else {
        playSound('wrong');
        $('#level-title').html('Game Over, Press Any Key to Restart');

        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        
        updateHighestLevel(); // Update highest level when the game is over
        startOver();
    }
}

function updateHighestLevel() {
    if (currentLevel > highestLevel) {
        highestLevel = currentLevel;
        $('#score').html(`Highest Level: ${highestLevel}`); // Update the highest level in the UI
    }
}

function startOver() {
    currentLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
}
