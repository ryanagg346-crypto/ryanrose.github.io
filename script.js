

const rose = document.getElementById("rose");
const message = document.getElementById("message");
const counterText = document.getElementById("counter");
const warningText = document.getElementById("warning");
const music = document.getElementById("bg-music");
const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");


let petals = [];
let animationStarted = false;

let scale = 1;
const maxScale = 2.5;

let taps = 0;
let isHeart = false;

// Canvas resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create petals
function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 1 + 0.5,
    drift: Math.random() * 1 - 0.5,
    rotation: Math.random() * 360,
  };
}

// Draw petals
function drawPetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach((p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = "rgba(255, 182, 193, 0.8)";
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    p.y += p.speed;
    p.x += p.drift;
    p.rotation += 1;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawPetals);
}

// Click logic
rose.addEventListener("click", () => {
  if (isHeart) return; // end state, no more scaling

  taps++;
  counterText.textContent = `You’ve tapped my heart ${taps} time${taps > 1 ? "s" : ""}`;
  counterText.style.opacity = 1;

  // First click setup
  if (!animationStarted) {
    message.classList.add("show");

    if (music.paused) {
      music.play();
    }

    for (let i = 0; i < 40; i++) {
      petals.push(createPetal());
    }
    drawPetals();
    animationStarted = true;
  }

  // Growth phase
  if (scale < maxScale) {
    scale += 0.15;

    const glow = Math.min(scale * 15, 40);
    rose.style.filter = `drop-shadow(0 0 ${glow}px rgba(255, 100, 120, 0.9))`;
    rose.style.transform = `scale(${scale}) rotate(360deg)`;

    return;
  }

  // 🌹 → ❤️ FINAL TRANSFORMATION
  isHeart = true;

  rose.textContent = "❤️";
  rose.classList.add("heart");

  rose.style.transform = "scale(2.2)";
  rose.style.filter = "drop-shadow(0 0 45px rgba(255, 0, 80, 1))";

  warningText.textContent = "Okay okay… rose is yours now ❤️";
  warningText.style.opacity = 1;
});
