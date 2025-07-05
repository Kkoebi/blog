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

// 

const canvas = document.getElementById('falling-lines-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const CHAR = '|';
const TOTAL = 60;
const particles = [];

const gradientColors = [
  '#f6d365', '#fda085', '#fbc2eb', '#a6c1ee', '#84fab0', '#8fd3f4'
];

function getRandomGradient() {
  const start = gradientColors[Math.floor(Math.random() * gradientColors.length)];
  const end = gradientColors[Math.floor(Math.random() * gradientColors.length)];
  const gradient = ctx.createLinearGradient(0, 0, 20, 20);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  return gradient;
}

function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    angle: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    opacity: 0,
    fadeIn: true,
    color: getRandomGradient(),
    size: Math.random() * 24 + 16
  };
}

// 初始化粒子
for (let i = 0; i < TOTAL; i++) {
  particles.push(createParticle());
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    // 漸層填色
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.font = `${p.size}px monospace`;
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fillText(CHAR, 0, 0);
    ctx.restore();

    // 更新位置與透明度
    p.x += p.vx;
    p.y += p.vy;
    p.angle += p.rotationSpeed;

    if (p.fadeIn) {
      p.opacity += 0.005;
      if (p.opacity >= 0.8) p.fadeIn = false;
    } else {
      p.opacity -= 0.002;
    }

    // 超出畫面或透明度為 0，重生
    if (
      p.x < -50 || p.x > width + 50 ||
      p.y < -50 || p.y > height + 50 ||
      p.opacity <= 0
    ) {
      Object.assign(p, createParticle());
    }
  });

  ctx.globalAlpha = 1.0;
  requestAnimationFrame(draw);
}

draw();

// 響應式
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});
