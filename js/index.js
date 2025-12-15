/* ===========================
   工具：Throttle
=========================== */
function throttle(fn, delay = 30) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn(...args);
    }
  };
}

/* ===========================
   Loader
=========================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;
  loader.style.opacity = 0;
  setTimeout(() => loader.remove(), 500);
});

/* ===========================
   深淺模式
=========================== */
const body = document.body;
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn?.addEventListener("click", () => {
  const dark = body.classList.toggle("light");
  body.classList.toggle("dark", !dark);
  toggleBtn.textContent = dark ? "☀️" : "🌙";
});

/* ===========================
   Back to top
=========================== */
const backToTop = document.getElementById("back-to-top");
window.addEventListener(
  "scroll",
  throttle(() => {
    backToTop?.classList.toggle("show", window.scrollY > 200);
  })
);

backToTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ===========================
   Hero 視差（不卡版）
=========================== */
const blurImg = document.getElementById("blurImg");
const nav = document.querySelector("nav");

window.addEventListener(
  "scroll",
  throttle(() => {
    const y = window.scrollY;

    if (blurImg) {
      blurImg.style.opacity = Math.min(y / 300, 1);
      blurImg.style.transform = `scale(${1 + y / 2000})`;
    }

    nav?.classList.toggle("scrolled", y > 50);
  })
);

/* ===========================
   fade-up（只執行一次）
=========================== */
const fadeElems = document.querySelectorAll(".fade-up");

const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElems.forEach(el => fadeObserver.observe(el));

/* ===========================
   漂浮線條（GPU 版本）
=========================== */
const container = document.querySelector(".line-container");
if (container) {
  const lineCount = window.innerWidth < 768 ? 8 : 16;
  const lines = [];

  for (let i = 0; i < lineCount; i++) {
    const span = document.createElement("span");
    span.className = "line";
    span.textContent = "______";

    span.style.left = Math.random() * 100 + "%";
    span.style.top = Math.random() * 100 + "%";
    span.style.opacity = Math.random() * 0.5 + 0.2;

    container.appendChild(span);

    lines.push({
      el: span,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: Math.random() * 0.05 - 0.025,
      dy: Math.random() * 0.05 - 0.025,
      r: Math.random() * 360
    });
  }

  function animateLines() {
    for (const l of lines) {
      l.x += l.dx;
      l.y += l.dy;
      l.r += 0.05;

      if (l.x < 0 || l.x > 100) l.dx *= -1;
      if (l.y < 0 || l.y > 100) l.dy *= -1;

      l.el.style.transform = `translate(${l.x}px, ${l.y}px) rotate(${l.r}deg)`;
    }
    requestAnimationFrame(animateLines);
  }
  animateLines();
}

/* ===========================
   爆炸效果（限流版）
=========================== */
const explosionContainer = document.querySelector(".explosion-container");
let lastExplosion = 0;

function createExplosion(x, y) {
  if (!explosionContainer) return;

  for (let i = 0; i < 8; i++) {
    const box = document.createElement("div");
    box.className = "explosion-box";

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 60 + 20;

    box.style.left = x + "px";
    box.style.top = y + "px";
    box.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    box.style.setProperty("--dy", Math.sin(angle) * dist + "px");

    explosionContainer.appendChild(box);
    box.addEventListener("animationend", () => box.remove());
  }
}

window.addEventListener("click", e => {
  const now = Date.now();
  if (now - lastExplosion < 200) return;
  lastExplosion = now;
  createExplosion(e.clientX, e.clientY);
});
