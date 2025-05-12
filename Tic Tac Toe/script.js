const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const speech = document.getElementById('speech');

const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const resetSound = document.getElementById('resetSound');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

function initBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  updateSpeech();

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  moveSound.play();

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }

  if (!gameState.includes(null)) {
    endGame('draw');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateSpeech();
}

function updateSpeech() {
  speech.textContent = `It's your turn, Player ${currentPlayer}`;
}

function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      highlightWin([a, b, c]);
      return gameState[a];
    }
  }

  return null;
}

function highlightWin(indices) {
  indices.forEach(i => {
    board.children[i].classList.add('win');
  });
}

function endGame(result) {
  gameActive = false;

  if (result === 'draw') {
    speech.textContent = "It's a draw! 🤝";
    drawSound.play();
  } else {
    speech.textContent = `Player ${result} wins! 🎉`;
    winSound.play();
  }
}

function resetGame() {
  resetSound.play();
  initBoard();
}

resetBtn.addEventListener('click', resetGame);
initBoard();
