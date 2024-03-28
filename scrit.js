const gridItems = document.querySelectorAll('.grid-item');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(event) {
  const clickedIndex = event.target.dataset.cellIndex;
  if (gameBoard[clickedIndex] !== '') {
    return; // Cell already occupied
  }

  gameBoard[clickedIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    // Option 1: String Concatenation
    message.textContent = currentPlayer + ' Wins!';

    // Option 2: Template Literal
    // message.textContent = `${currentPlayer} Wins!`;
    return;
  }

  if (isBoardFull()) {
    message.textContent = 'Draw!';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    if (gameBoard[condition[0]] === currentPlayer &&
        gameBoard[condition[1]] === currentPlayer &&
        gameBoard[condition[2]] === currentPlayer) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return gameBoard.every(cell => cell !== '');
}

gridItems.forEach(item => item.addEventListener('click', handleCellClick));
