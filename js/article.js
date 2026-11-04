'use strict';
const effectLayer = document.querySelector('.explosion-container');
if (effectLayer) {
  window.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button === 2) return;
    for (let i=0; i<12; i++) {
      const part = document.createElement('span');
      const size = 5 + Math.random()*12;
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random()*82;
      part.className = 'explosion-box';
      part.style.width = `${size}px`;
      part.style.height = `${size}px`;
      part.style.left = `${event.clientX-size/2}px`;
      part.style.top = `${event.clientY-size/2}px`;
      part.style.setProperty('--dx',`${Math.cos(angle)*distance}px`);
      part.style.setProperty('--dy',`${Math.sin(angle)*distance}px`);
      part.style.setProperty('--dr',`${Math.random()*720-360}deg`);
      effectLayer.appendChild(part);
      part.addEventListener('animationend',()=>part.remove(),{once:true});
    }
  });
}
