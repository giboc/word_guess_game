//
//Global Variables used for game
//
var wordBank = ["IRON MAIDEN","WINTERSUN"]
var guesses_left = 6;
var badGuess = [];
var score = 0;


//Initializes the game.
//1) Sets up the initial display of the game.
//  The display should show '_' for each letter.
//  A space is inserted in between each letter for clarity.
//2) Sets each '_' with an attribute for the letter it represents.
//  This is done to keep track of what each letter is.
//3) Clears the badGuess array.
//
// **You can easily cheat in this game by inspecting...** 

function gameSetup(word){
    var playerDisplayDiv = document.getElementById("player_status");
    playerDisplayDiv.textContent="Guesses left: " + guesses_left;

    for(var i=0; i<word.length; i++){
        var letter = $("<div>");
        if (word.charAt(i)==" "){
            letter.addClass("blank");
            letter.text(" ");
        }
        else{
            letter.addClass("letter");
            letter.attr("data", word.charAt(i));
            letter.text("_");
        }
        $("#game_board").append(letter);    
    }
    badGuess = []; 
};


// var targetDiv = document.getElementById("band_name");
//     targetDiv.textContent = "Computer's choice: ";
//     for(var i = 0; i<wordBank[0].length; i++){
        
//         var newLetter = document.createElement("div")
//         newLetter.textContent = wordBank[0].charAt(i);
//         targetDiv.appendChild(newLetter);
//     }

gameSetup(wordBank[0]);


//Takes input from player.
//If letter is found, it's displayed.
//If letter is not found, nothing yet.
$(document).on ("keypress",function(){
    
    if (guesses_left > 0){
        var guess = (event.key).toUpperCase();
        var loseLife = true;
        $(".letter").each(function(){
            if(guess == $(this).attr("data")){
                $(this).text(guess);
                loseLife = false;
            }
        });
        for(var i=0; i<badGuess.length; i++){
            if(guess == badGuess[i])
                loseLife=false;
        }
        badGuess.push(guess); //I realize that this is a bit problematic.
                            //Repeat bad guesses will be added onto this array.
                            //It's not great for efficiency as a result.
                            //But fortunately that's not a grading criteria!
        if (loseLife){
            guesses_left--;
            $("#player_status").text("Guesses left: " + guesses_left);
        }

    }
    else
        alert("Game over!");
});




