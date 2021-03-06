//
//Global Variables used for game
//

//List of band names
var wordBank = ["BLACK SABBATH", "IRON MAIDEN", "MANOWAR", "SONATA ARCTICA", "WINTERSUN"];
//List of music videos. Embed source is copy/pasted from youtube.
//VideoBank[i] corresponds to its matching band in wordBank[i].
var videoBank = [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/hkXHsK4AQPs?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/WxnN05vOuSM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/1hebq6Uz1PQ?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/NPHqfYfHx7s?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/9pQvOyo1nfQ?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
];
var guesses_left = 6; //Amount of incorrect guesses allowed.
var badGuess = []; //We will use this to keep track of bad guesses.
var score = 0; //The score.
var gameWon = false; //We need this boolean for various checks later.
var randomNum; //For selecting a band randomly.

function gameSetup(word) {
    //Resets the game for the next round. Remove any win/lose messages, refresh number of guesses, etc.
    $("#score").text("Score: " + score);
    var playerDisplayDiv = document.getElementById("player_status");
    guesses_left = 6;
    playerDisplayDiv.textContent = "Guesses left: " + guesses_left;
    $("#game_board").html(""); //Clear the game board. 
    $("#player_status").html("");
    $("#video").html("");
    $("#new_game").css("display", "none");
    $("#game_status").html("");
    $("#bad_guess").html("Bad guesses: ");

    //Sets the guess word display.
    for (var i = 0; i < word.length; i++) {
        var letter = $("<div>");
        //If there's a space found, we insert a blank.
        if (word.charAt(i) == " ") {
            letter.addClass("blank");
            letter.text(" ");
        }
        //Otherwise, we use '_' as a place holder.
        //We use it's data attr to keep track of the real letter.
        else {
            letter.addClass("letter");
            letter.attr("data", word.charAt(i));
            letter.text("_");
        }
        $("#game_board").append(letter); //Adds the resulting string to the display  
    }
    badGuess = [];
};

//Takes input from player.
//If letter is found, it's displayed.
//If letter is not found, nothing yet.
$(document).ready(function () {
    //Pick a random number, use that index to generate the game.
    randomNum = Math.floor(Math.random() * wordBank.length);
    gameSetup(wordBank[randomNum]);

    $(document).on("keypress", function () {
        //Check to see if the player has anymore available guesses.
        if (guesses_left > 0) {
            var guess = (event.key).toUpperCase(); //Convert the guess into uppercase, and save it.
            var loseLife = true; //Boolean that keeps track of an incorrect guess.

            //This function will iterate through ever letter class defined in gameSetup().
            //If the user input matches the data attribute, the text '_' will then be  replaced
            //by the guess.
            $(".letter").each(function () {
                if (guess == $(this).attr("data")) {
                    $(this).text(guess);
                    loseLife = false;
                }
            });
            //Loop through the bad guesses, so we don't penalize twice for the same wrong guess.
            //If the letter is found in the array, we set the boolean to false.
            for (var i = 0; i < badGuess.length; i++) {
                if (guess == badGuess[i])
                    loseLife = false;
            }

            //If a bad guess is made, populate the badGuess array.
            if (loseLife) {
                if (badGuess.length == 0)
                    badGuess.push(guess);
                if (!badGuess.includes(guess)) //We don't want duplicates in this array.
                    badGuess.push(guess);
                badGuess.sort();
                $("#bad_guess").text("Bad guesses: " + badGuess);
            }
            if (loseLife) {
                guesses_left--;
                $("#player_status").text("Guesses left: " + guesses_left);
            }

            //Check to see if the game is won. It's won if there are no more '_' left.
            $(".letter").each(function () {
                gameWon = $(this).text() != '_';
                if (!gameWon)
                    return false;
            });
            //Game over!
            if (guesses_left == 0)
                $("#game_status").text("Game over!");
            //Setup the game won display.
            if (gameWon) {
                $("#game_status").text("You win!");
                $("#score").text("Score: " + ++score);
                $("#video").html(videoBank[randomNum]);
                $("button").css("display", "flex");
                guesses_left = 0;
            }
            //Activate and setup the next round button.
            $("#new_game").on("click", function () {
                randomNum = Math.floor(Math.random() * wordBank.length);
                gameSetup(wordBank[randomNum]);
            })
        }
        //Prevent guesses after game over.
        else
            if (confirm("Game over! Play again?")) {
                score = 0;
                randomNum = Math.floor(Math.random() * wordBank.length);
                gameSetup(randomNum);
            }
    });
});