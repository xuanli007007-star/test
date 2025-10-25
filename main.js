const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// 设备像素比，让画面在高清屏更清晰
function fitCanvas() {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const cssWidth = Math.min(420, window.innerWidth * 0.95);
  const cssHeight = Math.min(740, window.innerHeight * 0.8);
  canvas.style.width = cssWidth + "px";
  canvas.style.height = cssHeight + "px";
  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
fitCanvas();
window.addEventListener("resize", fitCanvas);

// 简单小球
let x = 150, y = 200, r = 20, dx = 2, dy = 3;
let paused = false;

function draw() {
  if (paused) return requestAnimationFrame(draw);

  ctx.clearRect(0,0,canvas.width,canvas.height);
  // 背景
  ctx.fillStyle = "rgba(34,34,34,0.9)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // 球
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcc00";
  ctx.shadowColor = "#ffcc00";
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;

  // 边界反弹（注意半径）
  if (x + dx > canvas.width/dpr() - r || x + dx < r) dx = -dx;
  if (y + dy > canvas.height/dpr() - r || y + dy < r) dy = -dy;

  x += dx; y += dy;

  requestAnimationFrame(draw);
}

// 获取当前缩放后的 DPR（与 setTransform 保持一致）
function dpr() {
  return Math.max(1, Math.min(2, window.devicePixelRatio || 1));
}

// 交互：点击/触摸切换暂停；长按加速
let boostTimer = null;
canvas.addEventListener("pointerdown", () => {
  boostTimer = setTimeout(() => { dx *= 1.5; dy *= 1.5; }, 250);
});
canvas.addEventListener("pointerup", () => {
  clearTimeout(boostTimer);
  paused = !paused;
});

draw();
