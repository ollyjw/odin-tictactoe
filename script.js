// players are also going to be stored in objects
// If you need multiples of something (players!), create them with factories

// Player FF sets up player object that takes input that will be string of either 'O' or 'X' mark & adds it to text content of the cell
const Player = (mark) => {
    const getMark = () => {
        return mark;
    };
    const setMark = (player, cell) => {
        cell.textContent = player.getMark();
    }
    return {getMark, setMark};
}

// store the gameboard as an array inside of a Gameboard object
// Use a module if you only need one of something
// the module pattern wraps the factory in an IIFE (Immediately Invoked Function Expression).
const gameBoard = (() => {
    let boardArray = ['x','x','o','o','o','x','x','o','x'];
    
    // Create players using player object & add string of nought or cross
    const firstPlayer = Player('X');
    const secondPlayer = Player('O');

    let xPoints = 0;
    let oPoints = 0;

    let player1Points = document.getElementById('player1Points');
    let player2Points = document.getElementById('player2Points');

    player1Points.textContent = xPoints;
    player2Points.textContent = oPoints;


    // render the contents of the gameboard array to the webpage
    function displayBoard() {
        const gameContainer = document.querySelector('.gameBoard');        
        // for each entry in the array, generate a square div in a grid of 9
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            // square.innerHTML = boardArray[i];
            gameContainer.appendChild(square);
        }
    }

    displayBoard();

    // const markPosition = (position, playerMarker) => {
    //     boardArray[position] = playerMarker;
    // }

    // return { markPosition };

  })();


// an object to control the flow of the game itself

// const displayController = () => {
    // attaches event listeners to the squares of the grid
    // when one is clicked, call `gameBoard.markPosition()` with the clicked square's position and the current player's symbol
// } 



// 4. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!







// 5. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

// 6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// 7. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)