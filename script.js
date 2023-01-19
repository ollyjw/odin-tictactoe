// store the gameboard as an array inside of a Gameboard object
// Use a module if you only need one of something
// the module pattern wraps the factory in an IIFE (Immediately Invoked Function Expression).
const game = (() => {
    let gameBoard = ['x','o','x','o','x','o','x','o','x'];
    console.log(gameBoard);

    // render the contents of the gameboard array to the webpage
    function displayBoard() {
        const gameContainer = document.querySelector('.container');        
        // for each entry in the array, generate a square div in a grid of 9
        for (let i = 0; i < gameBoard.length; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.innerHTML = gameBoard[i];
            gameContainer.appendChild(square);
        }
    }

    displayBoard();
    return gameBoard;

  })();


// players are also going to be stored in objects
// If you need multiples of something (players!), create them with factories
const Player = () => {

}


// an object to control the flow of the game itself




// 4. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!







// 5. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

// 6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// 7. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)