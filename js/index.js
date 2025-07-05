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

const container = document.getElementById('lines-container');
const lineCount = 50;
const isMobile = window.innerWidth <= 768;

const lines = Array.from({ length: isMobile ? 40 : 80 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  length: Math.random() * 80 + 20,
  speed: (Math.random() * 2 + 1) * (isMobile ? 0.5 : 1),
  opacity: Math.random() * 0.5 + 0.3,
}));

for(let i = 0; i < lineCount; i++) {
  const line = document.createElement('div');
  line.className = 'line';
  line.style.left = Math.random() * 100 + 'vw';
  line.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2~5秒
  line.style.animationDelay = (Math.random() * 5) + 's'; // 隨機延遲
  container.appendChild(line);
}
