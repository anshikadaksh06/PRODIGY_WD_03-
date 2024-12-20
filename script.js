const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');
const playerScoreElement = document.getElementById('playerScore');
const aiScoreElement = document.getElementById('aiScore');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let playerScore = 0;
let aiScore = 0;

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleCellClick);
        cellElement.textContent = cell;
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (!board[index] && gameActive) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add('taken');
        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(computerMove, 500);
            }
        }
    }
}

function computerMove() {
    const emptyCells = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        const cellElement = document.querySelector(`.cell[data-index='${randomIndex}']`);
        cellElement.textContent = 'O';
        cellElement.classList.add('taken');
        checkWinner();
        if (gameActive) currentPlayer = 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            if (board[a] === 'X') {
                messageElement.textContent = "Player (X) Wins!";
                playerScore++;
                playerScoreElement.textContent = playerScore;
            } else {
                messageElement.textContent = "Computer (O) Wins!";
                aiScore++;
                aiScoreElement.textContent = aiScore;
            }
            return;
        }
    }

    if (!board.includes(null)) {
        messageElement.textContent = "It's a Draw!";
        gameActive = false;
    }
}

resetButton.addEventListener('click', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = '';
    createBoard();
});

createBoard();
