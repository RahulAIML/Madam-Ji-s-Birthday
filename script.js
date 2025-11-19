// A Wish For My Love — Interactivity
// - Typing effect for the hero greeting
// - Floating heart burst animation button
// - Unlockable content with a 4-digit code (0123)

// Smooth scroll to Memories
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Typing effect
(function typewriter() {
  const el = document.getElementById('typing');
  if (!el) return;
  const fullText = 'Happy Birthday, Mou!';
  el.textContent = '';
  let i = 0;
  const speed = 90; // ms per character

  function type() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 400);
})();

// Floating Hearts
const heartBtn = document.getElementById('heartBtn');
const heartsContainer = document.getElementById('hearts-container');

function spawnHeart(x, y, speedSec) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤';
  const size = 12 + Math.random() * 26;
  heart.style.fontSize = `${size}px`;
  heart.style.left = `${x + (Math.random() * 80 - 40)}px`;
  heart.style.top = `${y}px`;
  heart.style.filter = `hue-rotate(${Math.random() * 20 - 10}deg)`;
  if (speedSec) heart.style.animationDuration = `${speedSec}s`;
  heartsContainer.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

function loveStorm() {
  // Hearts from everywhere (faster and more numerous)
  const heartCount = 90;
  for (let i = 0; i < heartCount; i++) {
    const delay = i * 12; // faster cadence
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight; // start hearts at random heights
      const speed = 1.5 + Math.random() * 0.7; // faster than default
      spawnHeart(x, y, speed);
    }, delay);
  }

  // Balloons across full width, quicker rise
  const burstBalloons = 36;
  for (let i = 0; i < burstBalloons; i++) {
    const delay = i * 35;
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const el = document.createElement('div');
      el.className = 'balloon';
      el.textContent = '🎈';
      el.style.left = `${x}px`;
      el.style.top = `${window.innerHeight + 20}px`;
      el.style.setProperty('--sway', `${(Math.random() * 70 - 35).toFixed(0)}px`);
      el.style.animationDuration = `${(3 + Math.random() * 2).toFixed(2)}s`;
      heartsContainer.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }, delay);
  }

  // Sprinkle petals for extra love
  const burstPetals = 40;
  for (let i = 0; i < burstPetals; i++) {
    setTimeout(() => spawnPetal(Math.random() * window.innerWidth), i * 40);
  }
}

if (heartBtn && heartsContainer) {
  heartBtn.addEventListener('click', () => {
    loveStorm();
  });
}

// Opening celebration: balloons and roses/petals
function spawnBalloon(x) {
  if (!heartsContainer) return;
  const el = document.createElement('div');
  el.className = 'balloon';
  el.textContent = '🎈';
  el.style.left = `${x}px`;
  el.style.top = `${window.innerHeight + 20}px`;
  el.style.setProperty('--sway', `${(Math.random() * 60 - 30).toFixed(0)}px`);
  el.style.animationDuration = `${(4 + Math.random() * 4).toFixed(2)}s`;
  heartsContainer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function spawnRose(x) {
  if (!heartsContainer) return;
  const el = document.createElement('div');
  el.className = 'rose';
  el.textContent = '🌹';
  el.style.left = `${x}px`;
  el.style.top = `-40px`;
  el.style.setProperty('--drift', `${(Math.random() * 80 - 40).toFixed(0)}px`);
  el.style.animationDuration = `${(5 + Math.random() * 4).toFixed(2)}s`;
  heartsContainer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function spawnPetal(x) {
  if (!heartsContainer) return;
  const el = document.createElement('div');
  el.className = 'petal';
  // A soft heart/petal symbol
  const symbols = ['❥', '💞', '💮', '💖'];
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = `${x}px`;
  el.style.top = `-40px`;
  el.style.fontSize = `${14 + Math.random() * 10}px`;
  el.style.setProperty('--drift', `${(Math.random() * 100 - 50).toFixed(0)}px`);
  el.style.animationDuration = `${(5 + Math.random() * 4).toFixed(2)}s`;
  heartsContainer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function burstHeartsFromCenter() {
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.65; // slightly below center for nicer arc
  for (let i = 0; i < 32; i++) {
    setTimeout(() => spawnHeart(originX + (Math.random() * 120 - 60), originY), i * 25);
  }
}

window.addEventListener('load', () => {
  // Balloons rising across the width
  const balloonCount = 28;
  for (let i = 0; i < balloonCount; i++) {
    const delay = i * 120 + Math.random() * 200; // staggered start
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      spawnBalloon(x);
    }, delay);
  }

  // Roses and petals gently falling from the top
  const roseCount = 16;
  for (let i = 0; i < roseCount; i++) {
    setTimeout(() => spawnRose(Math.random() * window.innerWidth), i * 180);
  }
  const petalCount = 30;
  for (let i = 0; i < petalCount; i++) {
    setTimeout(() => spawnPetal(Math.random() * window.innerWidth), i * 110);
  }

  // Initial heart burst for extra love
  setTimeout(burstHeartsFromCenter, 600);
});

// Unlockable content
const unlockBtn = document.getElementById('unlockBtn');
const secretInput = document.getElementById('secret');
const hiddenContent = document.getElementById('hiddenContent');

const SECRET_CODE = '0123';

function reveal() {
  if (!hiddenContent) return;
  hiddenContent.classList.add('revealed');
  hiddenContent.setAttribute('aria-hidden', 'false');
}

function shakeInput() {
  secretInput?.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0)' },
  ], { duration: 280, iterations: 1 });
}

function tryUnlock() {
  const val = secretInput?.value || '';
  if (val === SECRET_CODE) {
    reveal();
  } else {
    shakeInput();
  }
}

if (unlockBtn && secretInput) {
  unlockBtn.addEventListener('click', tryUnlock);
  secretInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlock();
  });
}
