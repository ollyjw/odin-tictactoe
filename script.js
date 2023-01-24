//THOUGHTS -  Generate board of 9 square divs with unique id -> create a board array -> Create 2 players -> add click event listener to squares -> target a square in DOM with id & add player marker to it's html, then push/splice the marker to the corresponding index of board array -> define win condition using boardArray


// Player Factory Function sets up player object that takes input that will be string of either 'O' or 'X' mark
const Player = (name, marker) => {    
    return { name, marker };
}

// Create players using player object & add string of nought or cross
const firstPlayer = Player('Player 1', 'X');
const secondPlayer = Player('Player 2', 'O');

console.log(`${firstPlayer.name} is ${firstPlayer.marker}s`);
console.log(`${secondPlayer.name} is ${secondPlayer.marker}s`);

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
    }

    displayBoard();

    return { boardArray };

  })();

 
// an object to control the flow of the game itself
const playRound = (() => {
    // destructuring assignment syntax - unpack values from data structures into distinct variables 
    // - get boardArray property from gameBoard object
    const { boardArray } = gameBoard;
    let marker = '';
    let winner = '';

    const markPosition = (e) => {
        const targetArrayIndex = boardArray[`${e.target.id}`];
        // to start - if marker is an empty string, set it to first player's marker (X), else if it's first player's marker set it to second player's (O), else if it's second's set it back to first
        if (marker === '') {
            marker = firstPlayer.marker; 
            
            // if targetArrayIndex is an empty string, use splice to replace it with the player marker
            if (targetArrayIndex === '') {
                // "splice(start, deleteCount, item1)"
                // start signifies array index (which will the click target's id), delete 1, then replace with player marker
                boardArray.splice(`${e.target.id}`,1, marker);
            }
            console.log(boardArray);
        } else if (marker === firstPlayer.marker) {
            marker = secondPlayer.marker;
            
            winner = secondPlayer.name;
            if (targetArrayIndex === '') {
                boardArray.splice(`${e.target.id}`, 1, marker);
            }
            console.log(boardArray);
        } else if (marker === secondPlayer.marker) {
            marker = firstPlayer.marker;
            
            winner = firstPlayer.name;
            if (targetArrayIndex === '') {               
                boardArray.splice(`${e.target.id}`, 1, marker);
            }
            console.log(boardArray);
        }
        const { displayMoves } = renderMoves;
        displayMoves();
        winCondition();
    }

    function winCondition() {
        const result = document.querySelector('.result');
        
        // top row
        if (boardArray[0] === boardArray[1] && boardArray[1] === boardArray[2] && boardArray[0] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // middle row
        if (boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5] && boardArray[3] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // bottom row
        if (boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8] && boardArray[6] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // Left column
        if (boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6] && boardArray[0] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // middle column
        if (boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7] && boardArray[1] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // right column
        if (boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8] && boardArray[2] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // top left to bottom right
        if (boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8] && boardArray[0] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // top right to bottom left
        if (boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6] && boardArray[2] !== '') { 
            // on win condition players can no longer click
            removeClick(); 
            result.textContent = `${winner} Wins!`; 
            marker = ''; 
            return; 
        }
        // Draw condition
        if (boardArray[0] !== '' && boardArray[1] !== '' && boardArray[2] !== '' && boardArray[3] !== '' && boardArray[4] !== '' && boardArray[5] !== '' && boardArray[6] !== '' && boardArray[7] !== '' && boardArray[8] !== '') { 
            result.textContent = "DRAW!";
        };
    }

    // Create array containing the divs with square class
    // Didn't work with querySelector has to be elements by class name
    const squaresArray = Array.from(document.getElementsByClassName('square'));

    // Add click event listener that will mark the square that the player wants to take
    function addClick() {
        squaresArray.forEach((sqr) => sqr.addEventListener('click', markPosition));
    }

    // Add remove click event listener to keep players from playing in spots that are already taken
    function removeClick() {
        squaresArray.forEach((sqr) => sqr.removeEventListener('click', markPosition));
    }
    
    addClick();

    return { addClick };
})();


// "render the contents of the gameboard array to the webpage"
const renderMoves = (() => {
    const {boardArray} = gameBoard;

    function displayMoves() {
        for (let i = 0; i < boardArray.length; i++) {
            // adds boardarray item to innerhtml of square div with id
            const target = document.getElementById(`${i}`);
            target.innerHTML = boardArray[i];
        }
    }

    return { displayMoves };
})();



// 6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// 7. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)