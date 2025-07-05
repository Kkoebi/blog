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
const lineCount = window.innerWidth < 768 ? 15 : 30;

for (let i = 0; i < lineCount; i++) {
  const span = document.createElement('span');
  span.className = 'line';
  span.innerText = '______';
  span.style.left = `${Math.random() * 100}%`;
  span.style.top = `${Math.random() * 100}%`;
  span.style.fontSize = `${Math.random() * 16 + 10}px`;
  span.style.transform = `rotate(${Math.random() * 360}deg)`;
  span.style.animationDelay = `${Math.random() * 6}s`;
  container.appendChild(span);
}

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
  });