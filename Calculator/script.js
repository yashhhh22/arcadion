const screen = document.getElementById("screen");
const keys = document.querySelectorAll(".key, .operator");
const delBtn = document.getElementById("del");
const resetBtn = document.getElementById("reset");
const equalsBtn = document.getElementById("equals");
const comboDisplay = document.getElementById("comboDisplay");
const themeToggle = document.getElementById("themeToggle");

let expression = "";
let combo = 1;
let lastEval = Date.now();

// 🔊 Sound playback helper
function playSound(filePath) {
  const sound = new Audio(filePath);
  sound.play().catch(() => {});
}

// 🔁 Update combo logic (10-second window)
function updateCombo() {
  const now = Date.now();
  const diff = now - lastEval;

  if (diff <= 10000) {
    combo++;
  } else {
    combo = 1;
  }

  comboDisplay.textContent = `Combo x${combo}`;
  lastEval = now;
}

// 🔁 Update display
function updateScreen(val) {
  screen.textContent = val || "0";
}

// 🎯 Handle number and operator keys
keys.forEach(key => {
  key.addEventListener("click", () => {
    const val = key.textContent;
    expression += val === "x" ? "*" : val;
    updateScreen(expression);
    playSound("audios/click.mp3");
  });
});

// ❌ Handle delete
delBtn.addEventListener("click", () => {
  expression = expression.slice(0, -1);
  updateScreen(expression);
  playSound("../audios/reset.mp3");
});

// 🔄 Handle reset
resetBtn.addEventListener("click", () => {
  expression = "";
  updateScreen("0");
  combo = 1;
  comboDisplay.textContent = `Combo x${combo}`;
  playSound("../audios/reset.mp3");
});

// ✅ Handle evaluation
equalsBtn.addEventListener("click", () => {
  try {
    const result = eval(expression);
    expression = result.toString();
    updateScreen(expression);
    updateCombo();
    playSound("../audios/blast.mp3");
  } catch {
    updateScreen("Error");
    expression = "";
    combo = 1;
    comboDisplay.textContent = `Combo x${combo}`;
    playSound("../audios/reset.mp3");
  }
});

// 🌗 Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
