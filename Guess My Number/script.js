"use strict";

// DOM Elements
const input = document.querySelector(".input-number");
const checkBtn = document.querySelector(".check");
const restartBtn = document.querySelector(".restart");
const feedback = document.querySelector(".feedback");
const secret = document.querySelector(".secret");
const scoreSpan = document.getElementById("score");
const highscoreSpan = document.getElementById("highscore");

// Sound Elements
const soundWin = document.getElementById("sound-win");
const soundWrong = document.getElementById("sound-wrong");
const soundRestart = document.getElementById("sound-restart");
const soundInvalid = document.getElementById("sound-invalid");

// Game Variables
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highscore = 0;
let isGameActive = true;

// Display message
const displayMessage = (msg, color = "#ffffffcc") => {
  feedback.textContent = msg;
  feedback.style.color = color;
};

// Reset Game
const resetGame = () => {
  score = 10;
  isGameActive = true;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // Reset UI
  input.value = "";
  input.disabled = false;
  checkBtn.disabled = false;
  secret.textContent = "?";
  scoreSpan.textContent = score;
  document.body.style.background = "radial-gradient(circle, #0f2027, #203a43, #2c5364)";
  displayMessage("Enter a number to start...");
};

// Guess Logic
checkBtn.addEventListener("click", () => {
  if (!isGameActive) return;

  const guess = Number(input.value);

  // Invalid input
  if (!guess || guess < 1 || guess > 20) {
    displayMessage("⛔ Enter a number between 1–20", "red");
    soundInvalid.play();
    return;
  }

  // Correct guess
  if (guess === secretNumber) {
    displayMessage("🎉 You got it!", "#00ffe0");
    secret.textContent = secretNumber;
    document.body.style.background = "linear-gradient(to right, #43cea2, #185a9d)";
    soundWin.play();
    confetti();

    if (score > highscore) {
      highscore = score;
      highscoreSpan.textContent = highscore;
    }

    isGameActive = false;
    input.disabled = true;
    checkBtn.disabled = true;
    return;
  }

  // Wrong guess
  if (score > 1) {
    displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!", "orange");
    score--;
    scoreSpan.textContent = score;
    soundWrong.play();
  } else {
    displayMessage("💥 You lost!", "red");
    score = 0;
    scoreSpan.textContent = score;
    isGameActive = false;
    input.disabled = true;
    checkBtn.disabled = true;
    soundWrong.play();
  }
});

// Restart Game
restartBtn.addEventListener("click", () => {
  resetGame();
  soundRestart.play();
});

// Allow Enter key to submit
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkBtn.click();
});
