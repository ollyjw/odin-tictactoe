//THOUGHTS -  Generate board of 9 square divs with unique id -> create a board array -> Create 2 players -> add click event listener to squares -> target a square in DOM with id & add player marker to it's html, then push/splice the marker to the corresponding index of board array -> define win condition - put in an array and compare it to the boardArray


// Player Factory Function sets up player object that takes input that will be string of either 'O' or 'X' mark
const Player = (marker) => {    
    return {marker};
}

// Create players using player object & add string of nought or cross
const firstPlayer = Player('X');
const secondPlayer = Player('O');

console.log(`Player 1 is ${firstPlayer.marker}`);
console.log(`Player 2 is ${secondPlayer.marker}`);

// "Use a module if you only need one of something - the module pattern wraps the factory in an IIFE (Immediately Invoked Function Expression)."
const gameBoard = (() => {
    // "store the gameboard as an array inside of a Gameboard object"
    // let boardArray = ['x','x','o','o','o','x','x','o','x'];
    let boardArray = ['','','','','','','','',''];


    // /////////////////////////////////////////////////////////////
    // worry about rounds + score later
    let xPoints = 0;
    let oPoints = 0;

    let player1Points = document.getElementById('player1Points');
    let player2Points = document.getElementById('player2Points');

    player1Points.textContent = xPoints;
    player2Points.textContent = oPoints;
    // /////////////////////////////////////////////////////////////



    //"render the contents of the gameboard array to the webpage"
    function displayBoard() {
        const gameContainer = document.querySelector('.gameBoard');
        // generate 9 square divs
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i); // give each square a unique id
            //square.innerHTML = boardArray[i];
            gameContainer.appendChild(square);
        }
        
        
        // Create array containing the divs with square class
        const squaresArray = Array.from(document.querySelector('.square'));

        // Add click event listener that will mark the square that the player wants to take
        squaresArray.forEach(function(sqr) {
            sqr.addEventListener('click', displayMove)
        })
    }

    // adds boardarray item to innerhtml of square div with id
    // function displayMove() {
    //     for (let i = 0; i < boardArray.length; i++) {
    //         const target = document.getElementById(`${i}`);
    //         target.innerHTML = boardArray[i];
    //     }
    // }

    //displayMove();
    displayBoard();

    // return boardArray;

  })();

 
// an object to control the flow of the game itself
const playRound = (() => {
    // destructuring assignment syntax - get boardArray property from gameBoard object
    const {boardArray} = gameBoard;
    let marker = '';



    const markPosition = (e) => {
        const targetArrayIndex = boardArray[`${e.target.id}`];
        
        // to start - if marker is an empty string, set it to first player's marker, else if it's first player's marker set it to second player's, else if it's second's set it back to first
        marker = firstPlayer.marker;

        // if targetArrayIndex is an empty string, use splice to replace it with the player marker

        // "splice(start, deleteCount, item1)"
        // start signifies array index (which will the click target's id), delete 1, then replace with player marker
        boardArray.splice(`${e.target.id}`,1, marker)


    }
})



// * 4. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

// 5. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

// 6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// 7. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)