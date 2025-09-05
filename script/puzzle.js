// script/puzzle.js
// Sliding puzzle 3x3 / 4x4, imágenes seleccionables y botón "Reordenar"

const container = document.getElementById("puzzle-container");
const imageSelect = document.getElementById("image-select");
const nivelSelect = document.getElementById("nivel");
const resetBtn = document.getElementById("reset-btn");
const referenceImg = document.getElementById("reference-img"); // <- referencia

let size = parseInt(nivelSelect?.value) || 3;
let imgSrc = imageSelect?.value || "assets/img/listas/disco3.jpeg";

let pieces = [];            
let emptyPos = { r: 0, c: 0 };
let tileW = 75, tileH = 75;

// Crea / reinicia el puzzle
function createPuzzle(newSize = size, newImg = imgSrc) {
  size = newSize;
  imgSrc = newImg;
  container.innerHTML = "";
  pieces = [];

  // actualizar imagen de referencia
  if (referenceImg) {
    referenceImg.src = imgSrc;
  }

  const totalPx = 300;
  container.style.width = totalPx + "px";
  container.style.height = totalPx + "px";
  container.style.position = "relative";
  container.style.padding = "0";
  container.style.boxSizing = "border-box";

  tileW = Math.floor(totalPx / size);
  tileH = Math.floor(totalPx / size);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r === size - 1 && c === size - 1) continue; 
      const el = document.createElement("div");
      el.className = "piece";
      el.style.width = tileW + "px";
      el.style.height = tileH + "px";
      el.style.backgroundImage = `url(${imgSrc})`;
      el.style.backgroundSize = `${tileW * size}px ${tileH * size}px`;
      el.style.backgroundPosition = `-${c * tileW}px -${r * tileH}px`;
      el.style.position = "absolute";
      el.style.left = (c * tileW) + "px";
      el.style.top = (r * tileH) + "px";

      el.dataset.correctIndex = r * size + c;
      pieces.push({ el, row: r, col: c, correctIndex: r * size + c });
      container.appendChild(el);

      el.addEventListener("click", () => tryMovePiece(el));
    }
  }

  emptyPos = { r: size - 1, c: size - 1 };

  shufflePositions();
  render();
}

function shufflePositions() {
  const pos = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      pos.push({ r, c });
    }
  }
  pos.pop(); 
  for (let i = pos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pos[i], pos[j]] = [pos[j], pos[i]];
  }
  pieces.forEach((p, i) => {
    p.row = pos[i].r;
    p.col = pos[i].c;
  });
  emptyPos = { r: size - 1, c: size - 1 };
}

function render() {
  pieces.forEach(p => {
    p.el.style.left = (p.col * tileW) + "px";
    p.el.style.top = (p.row * tileH) + "px";
  });
}

function tryMovePiece(el) {
  const p = pieces.find(x => x.el === el);
  if (!p) return;
  const dr = Math.abs(p.row - emptyPos.r);
  const dc = Math.abs(p.col - emptyPos.c);
  if ((dr === 1 && dc === 0) || (dc === 1 && dr === 0)) {
    const oldRow = p.row;
    const oldCol = p.col;
    p.row = emptyPos.r;
    p.col = emptyPos.c;
    emptyPos = { r: oldRow, c: oldCol };
    render();
    if (isSolved()) onSolved();
  }
}

function isSolved() {
  return pieces.every(p => (p.row * size + p.col) === Number(p.correctIndex));
}

function onSolved() {
  showLoveMessage();
  for (let i = 0; i < 30; i++) dropHeart();
}

function showLoveMessage() {
  const msg = document.createElement("div");
  msg.className = "love-message";
  msg.innerHTML = "💖 ¡Lo lograste, mi amor! Eres la pieza que me completa ❤️";
  document.body.appendChild(msg);
  setTimeout(() => {
    msg.classList.add("fade-out");
    setTimeout(() => msg.remove(), 1600);
  }, 3500);
}

function dropHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = (Math.random() * 100) + "vw";
  heart.style.animationDuration = (3 + Math.random() * 2) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5200);
}

// Eventos UI
if (imageSelect) {
  imageSelect.addEventListener("change", () => {
    imgSrc = imageSelect.value;
    createPuzzle(Number(nivelSelect.value), imgSrc);
  });
}
if (nivelSelect) {
  nivelSelect.addEventListener("change", () => {
    size = Number(nivelSelect.value);
    createPuzzle(size, imgSrc);
  });
}
if (resetBtn) {
  resetBtn.addEventListener("click", () => createPuzzle(Number(nivelSelect.value), imgSrc));
}

// iniciar
window.addEventListener("load", () => {
  if (!imageSelect) imgSrc = "assets/img/listas/disco3.jpeg";
  if (!nivelSelect) size = 3;
  else size = Number(nivelSelect.value) || 3;
  createPuzzle(size, imgSrc);
});
