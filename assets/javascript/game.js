
var wordBank = ["Iron maiden","wintersun"]
var guesses_left = 6;

// function gameSetup(word, display){
//     var blank = "";
//     for(var i=0; i<word.length; i++){
//         if(word[i]==" ")
//             blank += "&nbsp &nbsp";
//         else
//             blank += "_ ";
//     }
//     var blank_display = document.createElement("div");
//     blank_display.innerHTML = blank;
//     display.appendChild(blank_display); 
    
// };

function gameSetup(word){
    
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
    
};


function is_game_running(guesses_left, word){
    alert("test");
    if (guesses_left == 0)
        return false;
    else{
        for (var i = 0; i<word.length; i++ ) {
            if (word[i]="_")
                return true;
            else
                continue;
        }
    }

    return false;
};

var targetDiv = document.getElementById("band_name");
    targetDiv.textContent = "Computer's choice: ";
    for(var i = 0; i<wordBank[0].length; i++){
        
        var newLetter = document.createElement("div")
        newLetter.textContent = wordBank[0].charAt(i);
        targetDiv.appendChild(newLetter);
    }

var playerDisplayDiv = document.getElementById("player_status");
playerDisplayDiv.textContent="Player display: ";
// gameSetup(wordBank[0],playerDisplayDiv);
gameSetup(wordBank[0]);

// $(document).keypress(function(event) {
//     alert('Handler for .keypress() called. - ' + event.charCode);
// });


$(document).on ("keypress",function(){
    var guess = event.key;
    $(".letter").each(function(){
        if(   (event.key == $(this).attr("data"))   || (event.key) == $(this).attr("data"))
            $(this).text(event.key); 

    });

});




