import Ball from "./Ball.js";
import Paddle, { setSpeed } from "./Paddle.js";
import { changeTheme } from "./theme.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function flashElement(element, flashColor) {
  const originalColor = element.style.backgroundColor;
  let flashCount = 0;
  const flashInterval = setInterval(() => {
    // toggle colors
    element.style.backgroundColor =
      flashCount % 2 === 0 ? flashColor : originalColor;

    flashCount++;
    if (flashCount >= 4) {
      // total of two flashes
      clearInterval(flashInterval);
    }
  }, 100);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    flashElement(playerScoreElem, "#82ed24");
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    flashElement(computerScoreElem, "red");
  }

  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

dragElement(document.getElementById("settingsMenu"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function settingsToggle() {}

document.addEventListener("DOMContentLoaded", () => {
  const savedDifficulty = localStorage.getItem("selectedDifficulty");
  const themeSelect = document.getElementById("theme");
  const savedTheme = localStorage.getItem("selectedTheme") || "dark";
  themeSelect.value = savedTheme;
  changeTheme(savedTheme); // apply theme

  themeSelect.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    changeTheme(selectedTheme);
    localStorage.setItem("selectedTheme", selectedTheme);
  });

  if (savedDifficulty) {
    if (savedDifficulty === "easy") {
      document.getElementById("easy-bot").checked = true;
      selectDifficulty("easy");
    } else if (savedDifficulty === "normal") {
      document.getElementById("normal-bot").checked = true;
      selectDifficulty("normal");
    } else if (savedDifficulty === "hard") {
      document.getElementById("hard-bot").checked = true;
      selectDifficulty("hard");
    }
  }
  document
    .getElementById("easy-bot")
    .addEventListener("change", () => selectDifficulty("easy"));
  document
    .getElementById("normal-bot")
    .addEventListener("change", () => selectDifficulty("normal"));
  document
    .getElementById("hard-bot")
    .addEventListener("change", () => selectDifficulty("hard"));
});

function selectDifficulty(level) {
  console.log("difficulty:", level);
  localStorage.setItem("selectedDifficulty", level);
  if (level === "easy") {
    setSpeed(0.008);
  } else if (level === "normal") {
    setSpeed(0.012);
  } else if (level === "hard") {
    setSpeed(0.017);
  }
}

window.requestAnimationFrame(update);
