
var wordBank = ["IRON MAIDEN","WINTESUN"]



var targetDiv = document.getElementById("band-name");

    for(var i = 0; i<wordBank[0].length; i++){
        
        var newLetter = document.createElement("div")
        newLetter.textContent = wordBank[0].charAt(i);
        targetDiv.appendChild(newLetter);
    }



// targetDiv.innerHTML = "woo woo<br>";

// function myFunction(event){
//     var x = event.key;
//     for (var i=0; i < wordBank.length; i++){
//         var newDiv = document.createElement("div");
        
//         if(x == wordBank[0].charAt(i)){
            
//             newDiv.textContent=x+" ";
            
//         }   
//         else
//             newDiv.textContent="_ ";
        
//         targetDiv.appendChild(newDiv); 
            
//     }
    
    
    
// }