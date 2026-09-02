
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



function drawWeb() {
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var cx = canvas.width / 2;
  var cy = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
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

  
  var ringSizes = [60, 130, 220, 330, 460, 610, 780, 970];

  for (var i = 0; i < ringSizes.length; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, ringSizes[i], 0, Math.PI * 2);
    ctx.stroke();
  }
}

drawWeb();


window.addEventListener("resize", drawWeb);



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



searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  var q = searchInput.value.trim();

  if (q != "") {
    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(q);
  }
});



document.addEventListener("mousemove", function (e) {
  mouseSpider.style.left = e.pageX + "px";
  mouseSpider.style.top = e.pageY + "px";
});



function makeWebShot(x, y) {
  var shot = document.createElement("div");
  shot.className = "web-shot";

  
  var size = 15 + Math.random() * 40;

  shot.style.width = size + "px";
  shot.style.height = size + "px";
  shot.style.left = (x - size / 2) + "px";
  shot.style.top = (y - size / 2) + "px";

  document.body.appendChild(shot);

  
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



setInterval(function () {
  glitchStrip.style.top = Math.random() * 100 + "%";
  glitchStrip.style.opacity = 1;

  setTimeout(function () {
    glitchStrip.style.opacity = 0;
  }, 120);
}, 3000);




var apiKey = import.meta.env.VITE_NASA_API_KEY;

var sensePic = document.getElementById("sensePic");

// backup messages if nasa is down or key is missing
var senses = [
  "my spider sense is tingling...",
  "danger nearby?? probably not",
  "with great power comes great responsibility",
  "you should drink some water",
  "github misses you already",
  "a wild bug appeared somewhere"
];

function newSense() {
  var i = Math.floor(Math.random() * senses.length);
  senseText.textContent = senses[i];
}


function randomDate() {
  var d = new Date();
  d.setDate(d.getDate() - (Math.floor(Math.random() * 365) + 1));

  var mm = d.getMonth() + 1;
  var dd = d.getDate();
  if (mm < 10) mm = "0" + mm;
  if (dd < 10) dd = "0" + dd;

  return d.getFullYear() + "-" + mm + "-" + dd;
}

function fetchSpace() {
  
  if (!apiKey) {
    newSense();
    return;
  }

  senseText.textContent = "looking at the stars...";

  var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + randomDate();

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      
      if (data.media_type != "image") {
        fetchSpace();
        return;
      }

      sensePic.src = data.url;

      
      var words = data.explanation.split(" ");
      senseText.textContent = data.title + " - " + words.slice(0, 18).join(" ") + "...";
    })
    .catch(function () {
      newSense();
    });
}

senseRefresh.addEventListener("click", fetchSpace);
fetchSpace();
