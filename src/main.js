import './style.css'
import spiderHang from './spider-hang.png'

// swap the hardcoded <img src="./spider-hang.png"> in index.html for this bundled import
document.querySelector('#spiderHang img').src = spiderHang;

// ---- greeting ----
function updateGreeting(){
  const h = new Date().getHours();
  const el = document.querySelector('#greeting');
  if (h < 5) el.textContent = 'your neighborhood is asleep fr';
  else if (h < 12) el.textContent = 'gm wall-crawler, lock in';
  else if (h < 18) el.textContent = 'stay sharp out there bestie';
  else el.textContent = 'the city needs you rn';
}

// ---- clock ----
function updateClock(){
  const now = new Date();
  document.querySelector('#clock').textContent =
    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
updateGreeting();
updateClock();
setInterval(updateClock, 1000);

// ---- search ----
document.querySelector('#searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = document.querySelector('#searchInput').value.trim();
  if (!q) return;
  window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(q);
});

// ---- spidey-sense quote ----
async function fetchQuote(){
  const textEl = document.querySelector('#senseText');
  textEl.textContent = 'tingling...';
  try {
    const res = await fetch('https://api.quotable.io/random?tags=wisdom|inspirational');
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    textEl.textContent = `"${data.content}" — ${data.author}`;
  } catch (err) {
    const fallback = [
      "with great power comes great wifi bills.",
      "whatever life throws, we're built different.",
      "it's the friends we meet along the way, ngl."
    ];
    textEl.textContent = fallback[Math.floor(Math.random() * fallback.length)];
  }
}
fetchQuote();
document.querySelector('#senseRefresh').addEventListener('click', fetchQuote);

// ---- click-to-shoot webs ----
document.addEventListener('click', (e) => {
  if (e.target.closest('.search-box, .quick-link, .sense-refresh, .spider, .spider-hang')) return;
  spawnWebShot(window.innerWidth / 2, window.innerHeight / 2, e.clientX, e.clientY);
});
function spawnWebShot(x1, y1, x2, y2){
  const steps = 14;
  for (let i = 0; i <= steps; i++){
    setTimeout(() => {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      const dot = document.createElement('div');
      dot.className = 'web-shot';
      const size = 5 - (t * 3);
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 260);
    }, i * 10);
  }
}

// ---- mouse-following spider ----
const mouseSpider = document.querySelector('#mouseSpider');
let msTargetX = window.innerWidth / 2, msTargetY = window.innerHeight / 2;
let msX = msTargetX, msY = msTargetY;
document.addEventListener('mousemove', (e) => {
  msTargetX = e.clientX + 22;
  msTargetY = e.clientY + 18;
});
function animateMouseSpider(){
  msX += (msTargetX - msX) * 0.16;
  msY += (msTargetY - msY) * 0.16;
  const angle = Math.atan2(msTargetY - msY, msTargetX - msX) * (180 / Math.PI);
  mouseSpider.style.transform = `translate(${msX}px, ${msY}px) translate(-50%,-50%) rotate(${angle * 0.15}deg)`;
  requestAnimationFrame(animateMouseSpider);
}
animateMouseSpider();

// ---- dangling spider (runs away on click) ----
const spider = document.querySelector('#spiderDangle');
spider.addEventListener('click', (e) => {
  e.stopPropagation();
  spider.style.transition = 'transform .4s ease-in';
  spider.style.transform = 'translate(-50%, 300px) rotate(40deg)';
  spider.style.opacity = '0';
  setTimeout(() => {
    spider.style.transition = 'none';
    spider.style.transform = 'translate(-50%, 0) rotate(0deg)';
    spider.style.opacity = '1';
  }, 2200);
});

// ---- glitch strip flicker ----
const glitchStrip = document.querySelector('#glitchStrip');
function triggerGlitch(){
  glitchStrip.style.top = (20 + Math.random() * 60) + '%';
  glitchStrip.style.opacity = '0.5';
  setTimeout(() => { glitchStrip.style.opacity = '0'; }, 120);
  setTimeout(triggerGlitch, 3000 + Math.random() * 4000);
}
setTimeout(triggerGlitch, 2000);

// ---- animated web background canvas ----
const canvas = document.querySelector('#webCanvas');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const POINT_COUNT = 55;
let points = [];
for (let i = 0; i < POINT_COUNT; i++){
  points.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25
  });
}

let mouse = { x: -9999, y: -9999 };
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawWeb(){
  ctx.clearRect(0, 0, W, H);
  for (const p of points){
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }
  const withMouse = [...points, { x: mouse.x, y: mouse.y, isMouse: true }];
  for (let i = 0; i < withMouse.length; i++){
    for (let j = i + 1; j < withMouse.length; j++){
      const a = withMouse[i], b = withMouse[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = (a.isMouse || b.isMouse) ? 220 : 130;
      if (dist < maxDist){
        const alpha = (1 - dist / maxDist) * ((a.isMouse || b.isMouse) ? 0.55 : 0.2);
        ctx.strokeStyle = `rgba(255,43,58,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  for (const p of points){
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40,224,255,0.5)';
    ctx.fill();
  }
  requestAnimationFrame(drawWeb);
}
drawWeb();