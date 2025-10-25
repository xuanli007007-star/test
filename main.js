const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let x = 150, y = 200, r = 20, dx = 2, dy = 3;

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();
  ctx.closePath();

  if (x + dx > canvas.width - r || x + dx < r) dx = -dx;
  if (y + dy > canvas.height - r || y + dy < r) dy = -dy;
  x += dx; y += dy;
  requestAnimationFrame(draw);
}
draw();
