const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Тоглоомын дэлгэцийн хэмжээ
canvas.width = 400;
canvas.height = 600;

// Машины тохиргоо
const car = {
  x: 175,
  y: 500,
  width: 50,
  height: 100,
  speed: 5,
};

// Саадны тохиргоо
const obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 100;
let gameSpeed = 2;
let score = 0;

// Үндсэн функцууд
function drawCar() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  });
}

function moveObstacles() {
  obstacles.forEach(obstacle => {
    obstacle.y += gameSpeed;
  });

  // Саад хэт доошилсон бол устгах
  if (obstacles.length > 0 && obstacles[0].y > canvas.height) {
    obstacles.shift();
    score++;
  }
}

function addObstacle() {
  const xPosition = Math.random() * (canvas.width - obstacleWidth);
  obstacles.push({ x: xPosition, y: -obstacleHeight });
}

function detectCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      car.x < obstacle.x + obstacleWidth &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacleHeight &&
      car.y + car.height > obstacle.y
    ) {
      return true; // Мөргөлдөх үед
    }
  }
  return false;
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCar();
  drawObstacles();
  moveObstacles();

  if (detectCollision()) {
    alert(`Тоглоом дууслаа! Оноо: ${score}`);
    document.location.reload();
  }

  requestAnimationFrame(updateGame);
}

function gameLoop() {
  if (Math.random() < 0.02) {
    addObstacle();
  }
  updateGame();
}

// Товч даралтын удирдлага
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && car.x > 0) {
    car.x -= car.speed;
  } else if (event.key === 'ArrowRight' && car.x + car.width < canvas.width) {
    car.x += car.speed;
  }
});

// Тоглоомыг эхлүүлэх
gameLoop();