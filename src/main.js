// ============ all my javascript for webtab ============

// grab everything i need from the html
var canvas = document.getElementById("webCanvas");
var ctx = canvas.getContext("2d");
var clockEl = document.getElementById("clock");
var greetingEl = document.getElementById("greeting");
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
var mouseSpider = document.getElementById("mouseSpider");
var glitchStrip = document.getElementById("glitchStrip");
var senseText = document.getElementById("senseText");
var senseRefresh = document.getElementById("senseRefresh");
var spiderDangle = document.getElementById("spiderDangle");
var spiderHang = document.getElementById("spiderHang");

// ---------------------------------------------------------
// part 1: draw the spider web in the background
// ---------------------------------------------------------

function drawWeb() {
  // make the canvas as big as the screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var cx = canvas.width / 2;
  var cy = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // the spokes of the web
  ctx.strokeStyle = "rgba(255,63,164,0.28)";
  ctx.lineWidth = 1;

  for (var angle = 0; angle < 360; angle = angle + 30) {
    var rad = angle * Math.PI / 180;
    var x = cx + Math.cos(rad) * 2000;
    var y = cy + Math.sin(rad) * 2000;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // the circles/rings of the web
  var ringSizes = [60, 130, 220, 330, 460, 610, 780, 970];

  for (var i = 0; i < ringSizes.length; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, ringSizes[i], 0, Math.PI * 2);
    ctx.stroke();
  }
}

drawWeb();

// redraw when the window gets bigger or smaller
window.addEventListener("resize", drawWeb);

// ---------------------------------------------------------
// part 2: the clock
// ---------------------------------------------------------

function updateClock() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();

  // add a zero in front if its a single number
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  clockEl.textContent = h + ":" + m + ":" + s;
}

updateClock();
setInterval(updateClock, 1000);

// ---------------------------------------------------------
// part 3: greeting based on the time
// ---------------------------------------------------------

function updateGreeting() {
  var h = new Date().getHours();
  var text = "hello";

  if (h < 12) {
    text = "good morning";
  } else if (h < 17) {
    text = "good afternoon";
  } else {
    text = "good evening";
  }

  greetingEl.textContent = text + ", web head";
}

updateGreeting();

// ---------------------------------------------------------
// part 4: search bar (goes to google)
// ---------------------------------------------------------

searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  var q = searchInput.value.trim();

  if (q != "") {
    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(q);
  }
});

// ---------------------------------------------------------
// part 5: little spider follows the mouse
// ---------------------------------------------------------

document.addEventListener("mousemove", function (e) {
  mouseSpider.style.left = e.pageX + "px";
  mouseSpider.style.top = e.pageY + "px";
});

// ---------------------------------------------------------
// part 6: white splat when you click the spiders
// ---------------------------------------------------------

function makeWebShot(x, y) {
  var shot = document.createElement("div");
  shot.className = "web-shot";

  // random size so it looks different every time
  var size = 15 + Math.random() * 40;

  shot.style.width = size + "px";
  shot.style.height = size + "px";
  shot.style.left = (x - size / 2) + "px";
  shot.style.top = (y - size / 2) + "px";

  document.body.appendChild(shot);

  // delete it after the animation is done
  setTimeout(function () {
    shot.remove();
  }, 400);
}

spiderDangle.addEventListener("click", function (e) {
  makeWebShot(e.pageX, e.pageY);
});

spiderHang.addEventListener("click", function (e) {
  makeWebShot(e.pageX, e.pageY);
});

// ---------------------------------------------------------
// part 7: the glitch line that flashes sometimes
// ---------------------------------------------------------

setInterval(function () {
  glitchStrip.style.top = Math.random() * 100 + "%";
  glitchStrip.style.opacity = 1;

  setTimeout(function () {
    glitchStrip.style.opacity = 0;
  }, 120);
}, 3000);

// ---------------------------------------------------------
// part 8: spidey sense messages
// ---------------------------------------------------------

var senses = [
  "my spider sense is tingling...",
  "danger nearby?? probably not",
  "with great power comes great responsibility",
  "you should drink some water",
  "github misses you already",
  "a wild bug appeared somewhere",
  "the multiverse feels quiet today",
  "somewhere aunt may is baking pie"
];

function newSense() {
  var i = Math.floor(Math.random() * senses.length);
  senseText.textContent = senses[i];
}

senseRefresh.addEventListener("click", newSense);
newSense();
