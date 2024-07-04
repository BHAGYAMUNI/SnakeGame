let foodX, foodY;
let snakeX, snakeY;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let gameOver = false;
let currentScore = 0;
let setIntervalId;

const playBoard = document.querySelector(".play-board");
const score = document.querySelector("#score");
const highScore = document.querySelector("#highScore");
let highScoreValue = localStorage.getItem("highScore") || 0;

highScore.innerHTML = highScoreValue;

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY === 0) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY === 0) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX === 0) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX === 0) {
        velocityX = 1;
        velocityY = 0;
    }
};

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    if (currentScore > highScoreValue) {
        highScoreValue = currentScore;
        localStorage.setItem("highScore", highScoreValue);
        highScore.innerHTML = highScoreValue;
    }

    alert("Game Over!! Press Ok to replay...");
    clearInterval(setIntervalId);
    location.reload();
};

const initGame = () => {
    if (gameOver) {
        return handleGameOver();
    }

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        currentScore++;
        score.innerHTML = currentScore;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    htmlMarkup += `<div class="head" style="grid-area: ${snakeY}/${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
};

const changeHeadPosition = () => {
    snakeX = Math.floor(Math.random() * 30) + 1;
    snakeY = Math.floor(Math.random() * 30) + 1;
    snakeBody = [];
};

changeFoodPosition();
changeHeadPosition();

setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
