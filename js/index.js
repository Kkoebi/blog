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

const container = document.querySelector('.line-container');
const lineCount = window.innerWidth < 768 ? 12 : 30;
const maxOpacity = 0.7;
const lines = [];

for (let i = 0; i < lineCount; i++) {
  const span = document.createElement('span');
  span.className = 'line';
  span.innerText = '______';
  span.style.left = `${Math.random() * 100}%`;
  span.style.top = `${Math.random() * 100}%`;
  span.style.fontSize = `${Math.random() * 16 + 10}px`;
  const initialRotate = Math.random() * 360;
  span.style.transform = `rotate(${initialRotate}deg)`;
  const initialOpacity = Math.random() * maxOpacity;
  span.style.color = `rgba(255, 255, 255, ${initialOpacity})`;
  span.style.animationDelay = `${Math.random() * 6}s`;
  container.appendChild(span);

  lines.push({
    el: span,
    x: parseFloat(span.style.left),
    y: parseFloat(span.style.top),
    angle: Math.random() * 2 * Math.PI,
    speed: 0.03 + Math.random() * 0.009,
    rotate: initialRotate,
    rotateSpeed: (Math.random() * 0.5 - 0.25)
  });
}

function animate() {
  lines.forEach(line => {
    // 亂飄位置
    line.x += Math.cos(line.angle) * line.speed;
    line.y += Math.sin(line.angle) * line.speed;

    // 輕微改變移動方向
    line.angle += (Math.random() - 0.5) * 0.1;

    // 邊界限制(百分比) 讓線條不會飛出螢幕外
    if (line.x < 0) {
  line.x = 0;
  line.angle = Math.PI - line.angle;  // 水平方向反向
}
if (line.x > 100) {
  line.x = 100;
  line.angle = Math.PI - line.angle;
}
if (line.y < 0) {
  line.y = 0;
  line.angle = -line.angle;  // 垂直方向反向
}
if (line.y > 100) {
  line.y = 100;
  line.angle = -line.angle;
}


    // 轉動
    line.rotate += line.rotateSpeed;

    // 更新 CSS
    line.el.style.left = line.x + '%';
    line.el.style.top = line.y + '%';
    line.el.style.transform = `rotate(${line.rotate}deg)`;
  });

  requestAnimationFrame(animate);
}

animate();



const explosionContainer = document.querySelector('.explosion-container');

  function createExplosion(x, y) {
    const boxCount = 12; // 方塊數量
    for (let i = 0; i < boxCount; i++) {
      const box = document.createElement('div');
      box.className = 'explosion-box';

      // 方塊大小隨機
      const size = Math.random() * 15 + 5;
      box.style.width = `${size}px`;
      box.style.height = `${size}px`;

      // 位置從點擊點偏移
      box.style.left = `${x - size / 2}px`;
      box.style.top = `${y - size / 2}px`;

      // 隨機位移距離和方向
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 80 + 20;
      const dx = (Math.cos(angle) * distance).toFixed(2) + 'px';
      const dy = (Math.sin(angle) * distance).toFixed(2) + 'px';
      box.style.setProperty('--dx', dx);
      box.style.setProperty('--dy', dy);

      // 隨機旋轉角度
      const dr = (Math.random() * 720 - 360).toFixed(2) + 'deg';
      box.style.setProperty('--dr', dr);

      explosionContainer.appendChild(box);

      // 動畫結束後自動移除
      box.addEventListener('animationend', () => {
        box.remove();
      });
    }
  }

  window.addEventListener('click', (e) => {
    createExplosion(e.clientX, e.clientY);

  document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  explode(touch.clientX, touch.clientY);
});

});