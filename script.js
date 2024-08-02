const grid = document.getElementById('gameGrid');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resultDiv = document.getElementById('result');
const resultTime = document.querySelector('#result .time');
const playAgainButton = document.getElementById('playAgainButton');

let numbers = [];
let currentNumber = 1;
let startTime = 0;
let gameStarted = false;

function createGrid() {
  numbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
  grid.innerHTML = ''; 
  for (let i = 0; i < 25; i++) {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = numbers[i];
    button.addEventListener('click', handleClick);
    grid.appendChild(button);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function handleClick(event) {
  if (!gameStarted) return; // Prevent clicks if the game hasn't started

  const clickedNumber = parseInt(event.target.textContent);
  if (clickedNumber === currentNumber) {
    event.target.classList.add('correct');
    currentNumber++;
    if (currentNumber > 25) {
      endGame("You Win!");
    }
  } else {
    event.target.classList.add('wrong');
    endGame("Game Over");
  }
}

function startGame() {
  gameStarted = true;
  currentNumber = 1; // Reset the number to start from 1
  startTime = Date.now();
  createGrid();
  updateTimer();
  startButton.disabled = true;
  resultDiv.style.display = 'none'; // Hide the result initially
}

function updateTimer() {
  if (gameStarted) {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    timerDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    requestAnimationFrame(updateTimer);
  }
}

function endGame(message) {
  gameStarted = false;
  resultDiv.style.display = 'block';
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  resultTime.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  startButton.disabled = false;
  playAgainButton.style.display = 'block'; // Show the "Play Again" button
}

playAgainButton.addEventListener('click', startGame); // Add event listener to "Play Again" button

startButton.addEventListener('click', startGame);
