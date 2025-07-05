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

const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const snowflakes = [];
const maxSnowflakes = 200; // 雪花上限

function createSnowflake(x = Math.random() * width, y = Math.random() * height) {
  return {
    x: x,
    y: y,
    radius: Math.random() * 3 + 1,
    speedY: Math.random() * 1.5 + 0.5,
    speedX: Math.random() * 0.5 - 0.25,
    alpha: Math.random() * 0.5 + 0.5
  };
}

// 初始雪花
for (let i = 0; i < 150; i++) {
  snowflakes.push(createSnowflake());
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, width, height);
  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
    ctx.fill();
  });
}

function updateSnowflakes() {
  snowflakes.forEach((flake, index) => {
    flake.y += flake.speedY;
    flake.x += flake.speedX;

    if (flake.y > height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * width;
    }

    if (flake.x > width || flake.x < 0) {
      flake.x = Math.random() * width;
    }
  });
}

function loop() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(loop);
}

loop();

// 滑鼠產雪
window.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    snowflakes.push(createSnowflake(e.clientX, e.clientY));
  }
  if (snowflakes.length > maxSnowflakes) snowflakes.splice(0, snowflakes.length - maxSnowflakes);
});

// 觸控產雪
window.addEventListener('touchmove', e => {
  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i];
    for (let j = 0; j < 3; j++) {
      snowflakes.push(createSnowflake(touch.clientX, touch.clientY));
    }
  }
  if (snowflakes.length > maxSnowflakes) snowflakes.splice(0, snowflakes.length - maxSnowflakes);
});

// 視窗縮放時調整 canvas 尺寸
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// resize canvas when window resizes
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
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
