let count = 0;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

// Sounds (play with clone for instant effect)
const increaseSound = "sounds/increase.mp3";
const decreaseSound = "sounds/decrease.mp3";
const resetSound = "sounds/reset.mp3";

function playSound(filePath) {
  const sound = new Audio(filePath);
  sound.play().catch(() => {});
}

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Button logic
btns.forEach(btn => {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;

    if (styles.contains("decrease")) {
      count--;
      playSound(decreaseSound);
    } else if (styles.contains("increase")) {
      count++;
      playSound(increaseSound);
    } else {
      count = 0;
      playSound(resetSound);
    }

    // Set color based on value
    value.style.color =
      count > 0 ? "green" :
      count < 0 ? "red" :
      document.body.classList.contains("dark-mode") ? "#f0f0f0" : "#2f3545";

    value.textContent = count;

    // Animate
    value.classList.remove("animate");
    void value.offsetWidth; // reflow
    value.classList.add("animate");
  });
});
