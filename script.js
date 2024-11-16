import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

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

function settingsToggle() {}

window.requestAnimationFrame(update);
