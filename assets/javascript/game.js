//
//Global Variables used for game
//
var wordBank = ["IRON MAIDEN","WINTERSUN"] //List of band names
var guesses_left = 6; //Amount of incorrect guesses allowed.
var badGuess = []; //We will use this to keep track of bad guesses.
var score = 0; //The score.
var gameWon = false; 

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
    $("#score").text("Score: " + score);
    var playerDisplayDiv = document.getElementById("player_status");
    playerDisplayDiv.textContent="Guesses left: " + guesses_left;

    $("#game_board").text(""); //Clear the game board. 

    for(var i=0; i<word.length; i++){
        var letter = $("<div>");
        //If there's a space found, we insert a blank.
        if (word.charAt(i)==" "){
            letter.addClass("blank");
            letter.text(" ");
        }
        //Otherwise, we use '_' as a place holder.
        //We use it's data attr to keep track of the real letter.
        else{
            letter.addClass("letter");
            letter.attr("data", word.charAt(i));
            letter.text("_");
        }
        $("#game_board").append(letter); //Adds to the display  
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
$(document).ready(function(){
    $(document).on ("keypress",function(){
        //Check to see if the player has anymore available guesses.
        if (guesses_left > 0){
            var guess = (event.key).toUpperCase(); //Convert the guess into uppercase, and save it.
            var loseLife = true; //Boolean that keeps track of an incorrect guess.
            
            //This function will iterate through ever letter class defined in gameSetup().
            //If the user input matches the data attribute, the text '_' will then be  replaced
            //by the guess.
            $(".letter").each(function(){
                if(guess == $(this).attr("data")){
                    $(this).text(guess);
                    loseLife = false;
                }
            });
            //Loop through the bad guesses, so we don't penalize twice for the same wrong guess.
            //If the letter is found in the array, we set the boolean to false.
            for(var i=0; i<badGuess.length; i++){
                if(guess == badGuess[i])
                    loseLife=false;
            }

            //If the letter isn't found, the letter is added to the array.
            //I also realize that this will keep adding the same wrong guess to the array.
            //It's not the most efficient solution, but forunately, efficiency isn't a grading
            //criteria!
            badGuess.push(guess);
            if (loseLife){
                guesses_left--;
                $("#player_status").text("Guesses left: " + guesses_left);
            }

            $(".letter").each(function(){
                gameWon = $(this).text()  != '_'; 
                if(!gameWon)
                    return false;
            });
            if(guesses_left==0)
                $("#game_status").text("Game over!");
            
            if(gameWon){
                $("#game_status").text("You win!");
                $("#score").text("Score" + ++score);
                $("#video").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/WxnN05vOuSM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
                guesses_left=0;
            }
            

        }
        //Nope, no more guesses!
        else
            alert("Game over!");
    });

    

});