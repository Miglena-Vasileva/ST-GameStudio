const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размер на блокчето (от което се състои змията и храната)
const blockSize = 20;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

let snake = [{x: 5, y: 5}]; // Начална позиция на змията
let direction = 'right'; // Начална посока
let food = generateFood(); // Генериране на храна
let gameOver = false;

// Движение на змията
function moveSnake() {
    if (gameOver) return;

    const head = { ...snake[0] };

    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;
    if (direction === 'left') head.x--;
    if (direction === 'right') head.x++;

    // Проверка дали змията е излязла извън екрана или се е ударила в себе си
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height || isSnake(head)) {
        gameOver = true;
        alert("Играта приключи! Ти изгуби!");
        return;
    }

    snake.unshift(head); // Добавяме новата глава на змията в началото
    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // Генерираме нова храна
    } else {
        snake.pop(); // Премахваме последния елемент (тяло на змията)
    }
}

// Проверка дали змията е на дадена позиция
function isSnake(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

// Генериране на храна на случайна позиция
function generateFood() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    } while (isSnake(foodPosition)); // Проверяваме дали храната не е на място, където е змията

    return foodPosition;
}

// Рисуване на играта
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Изчистваме канваса

    // Рисуваме змията
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'black'; // Първата част на змията е зелена (главата)
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });

    // Рисуваме храната
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

// Управление на посоката със стрелките на клавиатурата
window.addEventListener('keydown', (e) => {
    if (gameOver) return;

    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Главен игрови цикъл
function gameLoop() {
    if (gameOver) return;

    moveSnake();
    drawGame();
}

// Старт на играта
setInterval(gameLoop, 100);
