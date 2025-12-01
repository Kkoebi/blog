window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.transition = "opacity 0.5s";
    loader.style.opacity = 0;
    setTimeout(() => loader.remove(), 500);
});

const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    toggleBtn.classList.remove('dark');
    toggleBtn.classList.add('light');
    toggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    toggleBtn.classList.remove('light');
    toggleBtn.classList.add('dark');
    toggleBtn.textContent = '🌙';
  }
});

const backToTop = document.getElementById('back-to-top');

// 顯示 / 隱藏
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// 點擊滾回頂部
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 監控深淺模式切換（假設你的 body 有 light / dark class）
const observer = new MutationObserver(() => {
  if (document.body.classList.contains('dark')) {
    backToTop.classList.remove('light');
    backToTop.classList.add('dark');
  } else {
    backToTop.classList.remove('dark');
    backToTop.classList.add('light');
  }
});

observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

const fadeElems = document.querySelectorAll('.fade-up');

function checkFade() {
  const windowBottom = window.innerHeight + window.scrollY;

  fadeElems.forEach(elem => {
    const elemTop = elem.offsetTop;

    if (windowBottom > elemTop + 50) {
      elem.classList.add('visible');
    } else {
      elem.classList.remove('visible');  // 不在視窗範圍就移除
    }
  });
}

checkFade();

window.addEventListener('scroll', checkFade);

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
  } 

  else {
    nav.classList.remove("scrolled");
    mobileMenu.classList.remove("scrolled");
  }
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if(scrollY > 50) {
    mobileMenu.classList.add('scrolled');
  } else {
    mobileMenu.classList.remove('scrolled');
  }
});

const mobileLinks = document.querySelectorAll('.mobile-menu a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  mobileLinks.forEach(link => {
    if(body.classList.contains('light')) {
      // 淺色模式：隨滾動變深色
      if(scrollY > 50) {
        link.style.color = 'var(--text-color)';        // 深色
      } else {
        link.style.color = 'var(--text-color-light)';  // 原淺色
      }
    } else {
      // 深色模式：一直保持淺色
      link.style.color = 'var(--text-color)';
    }
  });
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

const postCount = document.querySelectorAll('.post').length;
const uniqueTags = new Set(
    Array.from(document.querySelectorAll('.tag')).map(t => t.textContent.trim())
);
const followCount = 2;

document.querySelector('.stat:nth-of-type(1) .value').textContent = postCount;
document.querySelector('.stat:nth-of-type(2) .value').textContent = tagCount;
document.querySelector('.stat:nth-of-type(3) .value').textContent = followCount;

const postsContainer = document.getElementById('projects');

// md 檔路徑清單（你也可以用 JSON 或手動列）
const posts = [
  { file: '/blog/my_notes/2024/post1.md', title: '第一篇筆記', date: '2024-01-01' },
  { file: '/blog/my_notes/2024/post2.md', title: '第二篇筆記', date: '2024-01-02' },
];

posts.forEach(post => {
  fetch(post.file)
    .then(res => res.text())
    .then(md => {
      const article = document.createElement('article');
      article.className = 'post';
      article.innerHTML = `
        <div class="post-info">
          <div class="post-meta">
            <span>${post.date}</span>
            <span>0</span>
            <span>0</span>
          </div>
          <h2 class="post-title">${post.title}</h2>
          <div class="post-article">${marked.parse(md)}</div>
        </div>
      `;
      postsContainer.appendChild(article);
    });
});

document.querySelectorAll('.post').forEach(post => {
  const btn = post.querySelector('.read-more');
  const mdFile = post.dataset.md;
  const articleDiv = post.querySelector('.post-article');

  console.log(btn, mdFile, articleDiv); // 測試用

  if (btn && mdFile && articleDiv) {
    btn.addEventListener('click', () => {
      fetch(mdFile)
        .then(res => res.text())
        .then(md => {
          articleDiv.innerHTML = marked.parse(md);
          btn.style.display = 'none';
        })
        .catch(err => {
          articleDiv.textContent = "文章載入失敗 😭";
          console.error(err);
        });
    });
  }
});
