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

const canvas = document.getElementById('falling-lines-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const isMobile = window.innerWidth <= 768;

// 手機少一半，且速度減半
const LINE_COUNT = isMobile ? 30 : 60;
const SPEED_MULTIPLIER = isMobile ? 0.3 : 0.6;

// 生成亂飄的線條（以 `|` 模擬）
let lines = Array.from({ length: LINE_COUNT }, () => createWanderingLine());

function createWanderingLine() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * SPEED_MULTIPLIER, // 左右漂
    dy: (Math.random() - 0.5) * SPEED_MULTIPLIER, // 上下漂
    size: Math.random() * 14 + 12, // 字體大小
    opacity: Math.random() * 0.5 + 0.3
  };
}

function drawWanderingLines() {
  ctx.clearRect(0, 0, width, height);
  ctx.font = "bold 16px monospace";

  lines.forEach(line => {
    ctx.font = `bold ${line.size}px monospace`;
    ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity})`;
    ctx.fillText('|', line.x, line.y);

    line.x += line.dx;
    line.y += line.dy;

    // 緩慢變淡
    line.opacity -= 0.001;

    // 重生條件
    if (
      line.x < 0 || line.x > width ||
      line.y < 0 || line.y > height ||
      line.opacity <= 0
    ) {
      Object.assign(line, createWanderingLine());
      line.y = Math.random() * height;
      line.x = Math.random() * width;
    }
  });

  requestAnimationFrame(drawWanderingLines);
}

drawWanderingLines();

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const isNowMobile = window.innerWidth <= 768;
  const count = isNowMobile ? 30 : 60;
  lines = Array.from({ length: count }, () => createWanderingLine());
});
