const blurImg = document.getElementById('blurImg');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const nav = document.querySelector("nav");

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxBlur = 4;
    const speed = 60;
    const blur = Math.min(scrollY / speed, maxBlur);
    blurImg.style.filter = `blur(${blur}px)`;

    if (scrollY > 50) {
      nav.classList.add("scrolled");
      mobileMenu.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
      mobileMenu.classList.remove("scrolled");
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');      // 漢堡變 X
    mobileMenu.classList.toggle('active');     // 選單顯示/隱藏
    // aria 狀態同步（無障礙）
    const expanded = hamburger.classList.contains('active');
    mobileMenu.setAttribute('aria-hidden', !expanded);
});

  // 點選選單連結自動關閉（手機版體驗佳）
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
    });
});

// 自動關掉手機選單（避免桌面版還殘留）
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
});

// ===== Falling Lines Effect =====
const canvas = document.getElementById('falling-lines-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const isMobile = window.innerWidth <= 768;

let lines = Array.from({ length: isMobile ? 40 : 80 }, () => createLine());

function createLine() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    length: Math.random() * 80 + 20,
    speed: (Math.random() * 2 + 1) * (isMobile ? 0.5 : 1),
    opacity: Math.random() * 0.5 + 0.3
  };
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  lines.forEach(line => {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x, line.y + line.length);
    ctx.stroke();

    line.y += line.speed;
    line.opacity -= 0.002;

    if (line.y > height || line.opacity <= 0) {
      Object.assign(line, createLine(), { y: -line.length });
    }
  });
  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // 更新 isMobile 狀態與重設線條
  const isNowMobile = window.innerWidth <= 768;
  lines = Array.from({ length: isNowMobile ? 40 : 80 }, () => createLine());
});