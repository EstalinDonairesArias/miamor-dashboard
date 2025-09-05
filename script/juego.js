// 🎀 Juego Hello Kitty Runner

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🟣 Imagen de Hello Kitty
const kittyImg = new Image();
kittyImg.src = "assets/img/kitty.png";

// Variables
let kitty, obstacles, score, gameOver, gameSpeed, lastObstacleX, groundY;

// Inicializar juego
function initGame() {
  groundY = canvas.height - 40;
  kitty = {
    x: 50,
    y: groundY - 60,
    width: 50,
    height: 50,
    dy: 0,
    gravity: 1.2,
    jump: -18,
    grounded: true
  };

  obstacles = [];
  score = 0;
  gameOver = false;
  gameSpeed = 6;
  lastObstacleX = 0;

  document.getElementById("restartBtn").style.display = "none";

  requestAnimationFrame(updateGame);
}

// Kitty salta al hacer click
canvas.addEventListener("click", () => {
  if (kitty.grounded && !gameOver) {
    kitty.dy = kitty.jump;
    kitty.grounded = false;
  }
});

// 🧱 Generar obstáculos (sin pegarlos)
function spawnObstacle() {
  if (obstacles.length > 0) {
    let ultimo = obstacles[obstacles.length - 1];
    if (ultimo.x > canvas.width - 200) return; // espacio mínimo
  }

  let tipo = Math.floor(Math.random() * 3); // 0 = simple, 1 = doble, 2 = agujero

  if (tipo === 0) {
    // Bloque normal
    obstacles.push({
      x: canvas.width,
      y: groundY - 40,
      width: 40,
      height: 40,
      type: "block"
    });
  } else if (tipo === 1) {
    // Doble obstáculo
    obstacles.push({
      x: canvas.width,
      y: groundY - 40,
      width: 40,
      height: 40,
      type: "block"
    });
    obstacles.push({
      x: canvas.width + 60,
      y: groundY - 80,
      width: 40,
      height: 40,
      type: "block"
    });
  } else {
    // Agujero
    obstacles.push({
      x: canvas.width,
      y: groundY,
      width: 80,
      height: 10,
      type: "hole"
    });
  }
}

// 🎮 Loop del juego
function updateGame() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar suelo (línea base)
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(canvas.width, groundY);
  ctx.strokeStyle = "pink";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Física Kitty
  kitty.y += kitty.dy;
  kitty.dy += kitty.gravity;

  if (kitty.y + kitty.height >= groundY) {
    kitty.y = groundY - kitty.height;
    kitty.dy = 0;
    kitty.grounded = true;
  }

  // Dibujar Kitty
  ctx.drawImage(kittyImg, kitty.x, kitty.y, kitty.width, kitty.height);

  // Obstáculos
  if (Math.random() < 0.015) {
    spawnObstacle();
  }

  obstacles.forEach((obs, i) => {
    obs.x -= gameSpeed;

    if (obs.type === "block") {
      ctx.fillStyle = "hotpink";
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    } else {
      // Agujero: lo dibujamos como un hueco negro
      ctx.fillStyle = "black";
      ctx.fillRect(obs.x, obs.y, obs.width, 10);
    }

    // Colisión
    if (
      obs.type === "block" &&
      kitty.x < obs.x + obs.width &&
      kitty.x + kitty.width > obs.x &&
      kitty.y + kitty.height > obs.y
    ) {
      endGame();
    }

    if (obs.type === "hole") {
      if (
        kitty.x + kitty.width > obs.x &&
        kitty.x < obs.x + obs.width &&
        kitty.y + kitty.height >= groundY
      ) {
        endGame();
      }
    }

    // Eliminar obstáculos fuera de pantalla
    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1);
    }
  });

  // Puntos
  score++;
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Puntos: " + score, 20, 30);

  // Subir dificultad
  if (score % 500 === 0) {
    gameSpeed += 1;
  }

  let specialMessage = null;
let messageTimer = 0;

// Al llegar a 1000 puntos
if (score === 1000 && !specialMessage) {
  specialMessage = "💖 Eres la mejor, mi amor 💖";
  messageTimer = 380; // 180 frames ≈ 3 segundos si tu juego va a 60fps
}

// Dibujar mensaje si está activo
if (specialMessage && messageTimer > 0) {
  ctx.fillStyle = "purple";
  ctx.font = "30px Arial";
  ctx.fillText(specialMessage, canvas.width / 2 - 150, 100);
  messageTimer--;
}


  requestAnimationFrame(updateGame);
}

// Fin del juego
function endGame() {
  gameOver = true;
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("💔 Perdiste mi Cuchisita😭, Kitty Murio😭💔", canvas.width / 2 - 150, 120);

  document.getElementById("restartBtn").style.display = "block";
}

// Reiniciar juego
document.getElementById("restartBtn").addEventListener("click", () => {
  initGame();
});

// Iniciar
initGame();
