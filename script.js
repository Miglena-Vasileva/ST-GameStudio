const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let score;

(function setup() {
    snake = new Snake();
    food = new Food();
    score = 0;
    window.setInterval(gameLoop, 100);
})();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    snake.draw();
    food.draw();

    if (snake.eat(food)) {
        food = new Food();
        score++;
        document.title = "Змия - Скоор: " + score;
    }

    if (snake.checkCollision()) {
        alert("Играта приключи! Скоор: " + score);
        snake = new Snake();
        score = 0;
        document.title = "Змия - Скоор: " + score;
    }
}

window.addEventListener('keydown', e => {
    const direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

function Snake() {
    this.snakeArray = [{ x: 5, y: 5 }];
    this.direction = 'right';

    this.move = function () {
        const head = { ...this.snakeArray[0] };

        switch (this.direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        this.snakeArray.unshift(head);
        this.snakeArray.pop();
    };

    this.changeDirection = function (direction) {
        if (direction === 'Up' && this.direction !== 'down') {
            this.direction = 'up';
        } else if (direction === 'Down' && this.direction !== 'up') {
            this.direction = 'down';
        } else if (direction === 'Left' && this.direction !== 'right') {
            this.direction = 'left';
        } else if (direction === 'Right' && this.direction !== 'left') {
            this.direction = 'right';
        }
    };

    this.eat = function (food) {
        const head = this.snakeArray[0];
        if (head.x === food.x && head.y === food.y) {
            this.snakeArray.push({});
            return true;
        }
        return false;
    };

    this.draw = function () {
        for (let i = 0; i < this.snakeArray.length; i++) {
            ctx.fillStyle = i === 0 ? "green" : "black";
            ctx.fillRect(this.snakeArray[i].x * scale, this.snakeArray[i].y * scale, scale, scale);
        }
    };

    this.checkCollision = function () {
        const head = this.snakeArray[0];
        if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
            return true;
        }

        for (let i = 1; i < this.snakeArray.length; i++) {
            if (this.snakeArray[i].x === head.x && this.snakeArray[i].y === head.y) {
                return true;
            }
        }

        return false;
    };
}

function Food() {
    this.x = Math.floor(Math.random() * columns);
    this.y = Math.floor(Math.random() * rows);

    this.draw = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
    };
}
