// Loader 淡出
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.transition = "opacity 0.5s";
    loader.style.opacity = 0;
    setTimeout(() => loader.remove(), 500);
});

// 深淺模式切換
const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light');
        toggleBtn.classList.replace('dark', 'light');
        toggleBtn.textContent = '☀️';
    } else {
        body.classList.replace('light', 'dark');
        toggleBtn.classList.replace('light', 'dark');
        toggleBtn.textContent = '🌙';
    }
});

// Back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 200);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 監控深淺模式切換更新 backToTop 顏色
new MutationObserver(() => {
    if (body.classList.contains('dark')) {
        backToTop.classList.replace('light', 'dark');
    } else {
        backToTop.classList.replace('dark', 'light');
    }
}).observe(body, { attributes: true, attributeFilter: ['class'] });

// fade-up 元素淡入
const fadeElems = document.querySelectorAll('.fade-up');
function checkFade() {
    const windowBottom = window.innerHeight + window.scrollY;
    fadeElems.forEach(elem => {
        const elemTop = elem.offsetTop;
        elem.classList.toggle('visible', windowBottom > elemTop + 50);
    });
}
checkFade();
window.addEventListener('scroll', checkFade);

// Hero 圖片模糊 + nav 滾動效果
const blurImg = document.getElementById('blurImg');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const nav = document.querySelector("nav");

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    blurImg.style.filter = `blur(${Math.min(scrollY / 60, 4)}px)`;
    nav.classList.toggle("scrolled", scrollY > 50);
    mobileMenu.classList.toggle("scrolled", scrollY > 50);

    mobileLinks.forEach(link => {
        if (body.classList.contains('light')) {
            link.style.color = scrollY > 50 ? 'var(--text-color)' : 'var(--text-color-light)';
        } else {
            link.style.color = 'var(--text-color)';
        }
    });
});

// 手機選單
const mobileLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
    const expanded = !hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-hidden', !expanded);
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
});

// Line 飄動效果
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
    span.style.color = `rgba(255,255,255,${Math.random() * maxOpacity})`;
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

function animateLines() {
    lines.forEach(line => {
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;
        line.angle += (Math.random() - 0.5) * 0.1;

        if (line.x < 0 || line.x > 100) line.angle = Math.PI - line.angle;
        if (line.y < 0 || line.y > 100) line.angle = -line.angle;

        line.rotate += line.rotateSpeed;
        line.el.style.left = line.x + '%';
        line.el.style.top = line.y + '%';
        line.el.style.transform = `rotate(${line.rotate}deg)`;
    });
    requestAnimationFrame(animateLines);
}
animateLines();

// 點擊爆炸效果
const explosionContainer = document.querySelector('.explosion-container');
function createExplosion(x, y) {
    for (let i = 0; i < 12; i++) {
        const box = document.createElement('div');
        box.className = 'explosion-box';
        const size = Math.random() * 15 + 5;
        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        box.style.left = `${x - size / 2}px`;
        box.style.top = `${y - size / 2}px`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 80 + 20;
        box.style.setProperty('--dx', `${(Math.cos(angle) * distance).toFixed(2)}px`);
        box.style.setProperty('--dy', `${(Math.sin(angle) * distance).toFixed(2)}px`);
        box.style.setProperty('--dr', `${(Math.random() * 720 - 360).toFixed(2)}deg`);
        explosionContainer.appendChild(box);
        box.addEventListener('animationend', () => box.remove());
    }
}
window.addEventListener('click', (e) => createExplosion(e.clientX, e.clientY));
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    createExplosion(touch.clientX, touch.clientY);
});

// 更新部落格統計
const postCount = document.querySelectorAll('.post').length;
const uniqueTags = new Set(Array.from(document.querySelectorAll('.tag')).map(t => t.textContent.trim()));
const followCount = 2;
document.querySelector('.stat:nth-of-type(1) .value').textContent = postCount;
document.querySelector('.stat:nth-of-type(2) .value').textContent = uniqueTags.size;
document.querySelector('.stat:nth-of-type(3) .value').textContent = followCount;

// 動態生成文章改成 <a> 版本
const postsContainer = document.getElementById('projects');
const posts = [
    { file: '/blog/my_notes/2024/post1.html', title: '第一篇筆記', date: '2024-01-01', excerpt: '這是第一篇筆記摘要...' },
    { file: '/blog/my_notes/2024/post2.html', title: '第二篇筆記', date: '2024-01-02', excerpt: '這是第二篇筆記摘要...' }
];

posts.forEach(post => {
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
            <div class="post-article">${post.excerpt}</div>
            <a href="${post.file}" class="read-more">閱讀更多 →</a>
        </div>
    `;
    postsContainer.appendChild(article);
});

window.addEventListener('load', () => {
  document.querySelectorAll('.post-media').forEach(container => {
    const img = container.querySelector('img');
    if (img.complete) { // 如果圖片已經載入
      adjustHeight(container, img);
    } else {
      img.onload = () => adjustHeight(container, img);
    }
  });
});

function adjustHeight(container, img) {
  const aspectRatio = img.naturalWidth / img.naturalHeight;
  const containerWidth = container.offsetWidth;
  container.style.height = `${containerWidth / aspectRatio}px`;
}
