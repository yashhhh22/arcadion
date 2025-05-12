const colorBox = document.getElementById("colorBox");
const generateBtn = document.getElementById("generateBtn");
const formatSelect = document.getElementById("format");
const copyMsg = document.getElementById("copyMsg");
const historyList = document.getElementById("historyList");
const toggleThemeBtn = document.getElementById("themeToggle");

let currentColor = "";

function getRandomColor(format) {
  if (format === "HEX") {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  } else if (format === "RGB") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (format === "HSL") {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}

function generateColor() {
  const format = formatSelect.value;
  const color = getRandomColor(format);
  currentColor = color;
  colorBox.textContent = color;
  document.body.style.backgroundColor = color;

  const item = document.createElement("div");
  item.className = "history-item";
  item.style.backgroundColor = color;
  item.title = color;
  item.addEventListener("click", () => {
    document.body.style.backgroundColor = color;
    colorBox.textContent = color;
    currentColor = color;
  });

  historyList.prepend(item);
}

generateBtn.addEventListener("click", generateColor);

colorBox.addEventListener("click", () => {
  if (!currentColor) return;
  navigator.clipboard.writeText(currentColor).then(() => {
    copyMsg.textContent = `Copied: ${currentColor}`;
    copyMsg.classList.add("show");
    setTimeout(() => copyMsg.classList.remove("show"), 1500);
  });
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
