//THOUGHTS -  Generate board of 9 square divs with unique id -> create a board array -> Create 2 players -> add click event listener to squares -> target a square in DOM with id & add player marker to it's html, then push/splice the marker to the corresponding index of board array -> define win condition using boardArray

// Player Factory Function sets up player object that will take name & marker input (which will be defined as string of either 'O' or 'X' mark)
const Player = (name, marker) => {
    return { name, marker };
}

// "Use a module if you only need one of something - the module pattern wraps the factory in an IIFE (Immediately Invoked Function Expression)."
const gameBoard = (() => {
    // "store the gameboard as an array inside of a Gameboard object"
    let boardArray = ['', '', '', '', '', '', '', '', ''];

    // /////////////////////////////////////////////////////////////
    // worry about rounds + score later
    // let xPoints = 0;
    // let oPoints = 0;

    // let player1Points = document.getElementById('player1Points');
    // let player2Points = document.getElementById('player2Points');

    // player1Points.textContent = xPoints;
    // player2Points.textContent = oPoints;
    // /////////////////////////////////////////////////////////////

    return { boardArray };
})();

// Create player vars 
let firstPlayer;
let secondPlayer;
const turn = document.querySelector('#turn');
const restartBtn = document.getElementById('restartBtn');

// "render the contents of the gameboard array to the webpage"
const renderMoves = (() => {
    const { boardArray } = gameBoard;
    function displayMoves() {
        for (let i = 0; i < boardArray.length; i++) {
            // loop through items in boardArray & add item v to innerhtml of square div with id
            const target = document.getElementById(`${i}`);
            target.innerHTML = boardArray[i];
        }
    }
    return { displayMoves };
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
            turn.textContent = `${secondPlayer.name}'s (O) turn`;
            // if targetArrayIndex is an empty string, use splice to replace it with the player marker
            if (targetArrayIndex === '') {
                // "splice(start, deleteCount, item1)"
                // start signifies array index (which will the click target's id), delete 1, then replace with player marker
                boardArray.splice(`${e.target.id}`, 1, marker);
            }
            console.log(boardArray);
        } else if (marker === firstPlayer.marker) {
            marker = secondPlayer.marker;
            turn.textContent = `${firstPlayer.name}'s (X) turn`;
            winner = secondPlayer.name;
            if (targetArrayIndex === '') {
                boardArray.splice(`${e.target.id}`, 1, marker);
            }
            console.log(boardArray);
        } else if (marker === secondPlayer.marker) {
            marker = firstPlayer.marker;
            turn.textContent = `${secondPlayer.name}'s (O) turn`;
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
        // top row
        if (boardArray[0] === boardArray[1] && boardArray[1] === boardArray[2] && boardArray[0] !== '') {
            // on win condition players can no longer click
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // middle row
        if (boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5] && boardArray[3] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // bottom row
        if (boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8] && boardArray[6] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // Left column
        if (boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6] && boardArray[0] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // middle column
        if (boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7] && boardArray[1] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // right column
        if (boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8] && boardArray[2] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // top left to bottom right
        if (boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8] && boardArray[0] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // top right to bottom left
        if (boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6] && boardArray[2] !== '') {
            removeClick();
            turn.textContent = `${winner} Wins!`;
            marker = '';
            return;
        }
        // Draw condition
        if (boardArray[0] !== '' && boardArray[1] !== '' && boardArray[2] !== '' && boardArray[3] !== '' && boardArray[4] !== '' && boardArray[5] !== '' && boardArray[6] !== '' && boardArray[7] !== '' && boardArray[8] !== '') {
            turn.textContent = "DRAW!";
        };
    }

    // Add click event listener that will mark the square that the player wants to take
    function addClick() {
        // Create array containing the divs with square class
        // Didn't work with querySelector has to be elements by class name
        const squaresArray = Array.from(document.getElementsByClassName('square'));
        squaresArray.forEach((sqr) => sqr.addEventListener('click', markPosition));
    }

    // Add remove click event listener
    function removeClick() {
        const squaresArray = Array.from(document.getElementsByClassName('square'));
        squaresArray.forEach((sqr) => sqr.removeEventListener('click', markPosition));
    }

    addClick();

    return { addClick };
})();


// Press New Game btn - display board & add player names to screen
const startGame = (() => {
    const startBtn = document.querySelector('.start-game');
    const { boardArray } = gameBoard;
    const { addClick } = playRound;
    const { displayMoves } = renderMoves;

    // * Moved here so doesnt appear till you click start game
    function displayBoard() {
        const gameContainer = document.querySelector('.gameBoard');
        // generate 9 square divs
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', i); // give each square a unique id
            gameContainer.appendChild(square);
        }
    }

    // only want the board to be generated once
    let displayHandler = function() {
        let click = 0;
        return function() {
            if (click === 0) {
                displayBoard();
            } else if (click >= 1) {
                location.reload();
            }
            click++;
        }
    }();

    // New game btn click event
    startBtn.addEventListener('click', () => {
        displayHandler();
        addClick();
        displayMoves();
        
        const player1Input = document.getElementById('player1Input').value;
        const player2Input = document.getElementById('player2Input').value;
        const playerNames = document.getElementsByClassName('player-names');
        let container = document.querySelector('.container');
        let playerSection = document.querySelector('.player-section');

        // Assign players to player object & take name + assign marker
        firstPlayer = Player(player1Input, 'X');
        secondPlayer = Player(player2Input, 'O');

        console.log(`${firstPlayer.name} is ${firstPlayer.marker}s`);
        console.log(`${secondPlayer.name} is ${secondPlayer.marker}s`);

        // Add player names to screen
        let player1Name = document.querySelector('#player1-name');
        let player2Name = document.querySelector('#player2-name');

        player1Name.textContent = `${firstPlayer.name} (X)`;
        player2Name.textContent = `${secondPlayer.name} (O)`;

        // on click of start btn, hide name input
        for (let i = 0; i < playerNames.length; i++) {
            playerNames[i].style.display = 'none';
        }

        restartBtn.style.display = 'inline-block';
        playerSection.style.minHeight = '20vh';
        container.style.minHeight = '70vh';
        turn.textContent = `${firstPlayer.name}'s (X) turn`;
    });

})();


const restart = (() => {
    const { boardArray } = gameBoard;
    const { addClick } = playRound;
    const { displayMoves } = renderMoves;

    restartBtn.style.display = 'none';

    restartBtn.addEventListener('click', () => {
        // Empty the board array
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = '';
        }
        turn.textContent = '';
        addClick();
        displayMoves();
    });
})();