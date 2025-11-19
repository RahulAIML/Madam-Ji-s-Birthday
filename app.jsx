/* A Wish For My Love — React Single-File App (CDN + Babel)
   Components: App, Hero, Memories, Message, Unlock, HeartFab
   Effects: typing, hearts/balloons/petals, unlock reveal
*/

const { useEffect, useRef, useState } = React;

// Utilities for effects (reuse between components)
const heartsContainer = () => document.getElementById('hearts-container');

function spawnHeart(x, y, speedSec) {
  const container = heartsContainer();
  if (!container) return;
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤';
  const size = 12 + Math.random() * 26;
  heart.style.fontSize = `${size}px`;
  heart.style.left = `${x + (Math.random() * 80 - 40)}px`;
  heart.style.top = `${y}px`;
  heart.style.filter = `hue-rotate(${Math.random() * 20 - 10}deg)`;
  if (speedSec) heart.style.animationDuration = `${speedSec}s`;
  container.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

function spawnBalloon(x, faster = false) {
  const container = heartsContainer();
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'balloon';
  el.textContent = '🎈';
  el.style.left = `${x}px`;
  el.style.top = `${window.innerHeight + 20}px`;
  el.style.setProperty('--sway', `${(Math.random() * 70 - 35).toFixed(0)}px`);
  el.style.animationDuration = faster ? `${(3 + Math.random() * 2).toFixed(2)}s` : `${(4 + Math.random() * 4).toFixed(2)}s`;
  container.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function spawnRose(x) {
  const container = heartsContainer();
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'rose';
  el.textContent = '🌹';
  el.style.left = `${x}px`;
  el.style.top = `-40px`;
  el.style.setProperty('--drift', `${(Math.random() * 80 - 40).toFixed(0)}px`);
  el.style.animationDuration = `${(5 + Math.random() * 4).toFixed(2)}s`;
  container.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function spawnPetal(x) {
  const container = heartsContainer();
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'petal';
  const symbols = ['❥', '💞', '💮', '💖'];
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = `${x}px`;
  el.style.top = `-40px`;
  el.style.fontSize = `${14 + Math.random() * 10}px`;
  el.style.setProperty('--drift', `${(Math.random() * 100 - 50).toFixed(0)}px`);
  el.style.animationDuration = `${(5 + Math.random() * 4).toFixed(2)}s`;
  container.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function loveStorm() {
  // Hearts from everywhere
  const heartCount = 90;
  for (let i = 0; i < heartCount; i++) {
    const delay = i * 12;
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speed = 1.5 + Math.random() * 0.7;
      spawnHeart(x, y, speed);
    }, delay);
  }
  // Balloons faster
  const burstBalloons = 36;
  for (let i = 0; i < burstBalloons; i++) {
    const delay = i * 35;
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      spawnBalloon(x, true);
    }, delay);
  }
  // Petals
  const burstPetals = 40;
  for (let i = 0; i < burstPetals; i++) {
    setTimeout(() => spawnPetal(Math.random() * window.innerWidth), i * 40);
  }
}

function useTyping(text, speed = 90, startDelay = 400) {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return typed;
}

function Hero() {
  const typed = useTyping('Happy Birthday, Mou!');
  const onScrollClick = () => {
    document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header id="hero" className="section hero" role="banner">
      <div className="hero-inner">
        <h1 className="hero-title">
          <span>{typed}</span>
        </h1>
        <p className="hero-subtitle">A Wish For My Love</p>
        <button id="scrollBtn" className="btn primary" aria-label="Scroll to memories" onClick={onScrollClick}>
          See Our Memories
        </button>
      </div>
    </header>
  );
}

function Memories() {
  const gallery = [
    'Gallery/WhatsApp Image 2025-11-19 at 20.23.44_a5ade316.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 20.23.45_7d21c28d.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 21.31.14_4b7811f0.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 21.31.24_d9663d72.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 21.57.22_b439c024.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 21.57.25_98c23951.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 22.05.00_c734c271.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 22.09.25_288ce3fb.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 22.09.28_2bdeb75e.jpg',
    'Gallery/WhatsApp Image 2025-11-19 at 22.09.31_1421cfb4.jpg',
  ];
  const items = gallery.map((src, i) => (
    <figure key={src} className="card" role="listitem">
      <img src={src} alt={`Memory ${i + 1} of Mou and Rahul`} loading="lazy" />
    </figure>
  ));
  return (
    <section id="memories" className="section memories" aria-labelledby="memories-title">
      <div className="container">
        <h2 id="memories-title" className="section-title">Our Sweet Memories</h2>
        <div className="gallery" role="list">{items}</div>
      </div>
    </section>
  );
}

function Message() {
  return (
    <section id="message" className="section message" aria-labelledby="message-title">
      <div className="container narrow">
        <h2 id="message-title" className="section-title">💌 A Letter From Rahul</h2>
        <article className="love-letter">
          <p><strong>💖 Two Years of Mou and Me 💖</strong></p>
          <p>My dearest Mou,</p>
          <p>
            It's amazing to look back and realize that nearly two years ago, on January 20th, 2024, our story began with a simple chat on Facebook. Who knew that random message would lead to this incredible journey?
          </p>
          <p>
            But the day our lives truly connected was January 23rd, 2024, on our very first face-to-face date. That's when we officially started this beautiful adventure, and every day since has been a gift.
          </p>
          <p><strong>My Rock, My Strength</strong><br/>
            I'll never forget that period when I was empty-pocketed. You didn't just stand by me—you actively helped me, supported me, and saw my potential when I couldn't see it myself. Your belief in me was the greatest encouragement I could have asked for.
          </p>
          <p>
            Now that I've started earning, you are still my biggest cheerleader. You are the reason I strive to be better and the absolute best part of my life.
          </p>
          <p><strong>Looking Ahead</strong><br/>
            Thank you for the two years of laughter, growth, patience, and unconditional love. You have shown me what it means to be truly loved and supported. You are more than a girlfriend; you are my partner, my strength, and my best friend.
          </p>
          <p>
            Happy two-year anniversary to the woman who changed my world. I love you more than words can say.
          </p>
          <p>All my love, always.</p>
          <p><em>Rahul</em></p>
        </article>
      </div>
    </section>
  );
}

function Unlock() {
  const [code, setCode] = useState('');
  // stages: 'locked' | 'before' | 'after'
  const [stage, setStage] = useState('locked');
  const SECRET_CODE = '0123';
  const tryUnlock = () => {
    if (code === SECRET_CODE) {
      setStage('before');
      // After a short cinematic delay, show the clear image and message
      setTimeout(() => setStage('after'), 1600);
    } else {
      const input = document.getElementById('secret');
      if (input?.animate) {
        input.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0)' },
        ], { duration: 280, iterations: 1 });
      }
    }
  };
  return (
    <section id="unlock" className="section unlock" aria-labelledby="unlock-title">
      <div className="container">
        <h2 id="unlock-title" className="section-title">Unlock Our Memory</h2>
        <p className="hint">Enter the 4-digit code to reveal a special surprise 🌟</p>
        <div className="unlock-box">
          <label htmlFor="secret" className="visually-hidden">Enter secret code</label>
          <input
            id="secret"
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            aria-label="Enter 4-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
          />
          <button id="unlockBtn" className="btn secondary" onClick={tryUnlock}>
            Unlock Our Memory
          </button>
        </div>
        <div
          id="hiddenContent"
          className={`hidden-content ${stage !== 'locked' ? 'revealed' : ''}`}
          aria-live="polite"
          aria-hidden={stage === 'locked'}
        >
          <div className="secret-wrapper">
            {/* BEFORE: blurred preview with badge */}
            <figure className={`before-card ${stage === 'before' ? 'show' : ''} ${stage === 'after' ? 'hide' : ''}`}>
              <span className="badge">Before</span>
              <img src="Gallery/Secret_after_giving_Code.jpg" alt="Before preview" className="secret-img blur" />
            </figure>
            {/* AFTER: clear image and heartfelt message */}
            <figure className={`after-card ${stage === 'after' ? 'show' : ''}`}>
              <span className="badge success">After</span>
              <img src="Gallery/Secret_after_giving_Code.jpg" alt="A secret memory of Mou and Rahul" className="secret-img" />
              <figcaption className="secret-text">
                <strong>You remembered!</strong> The code represents our beginning (Jan 23rd).<br/>
                Here is a screenshot of the very first message you sent me on Facebook. I kept it because it was the moment my life changed forever. I love you.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeartFab() {
  return (
    <button
      id="heartBtn"
      className="heart-fab"
      aria-label="Send floating hearts"
      title="Send love"
      onClick={() => loveStorm()}
    >
      ❤
    </button>
  );
}

function OpeningEffects() {
  useEffect(() => {
    // Balloons rising across the width
    const balloonCount = 28;
    for (let i = 0; i < balloonCount; i++) {
      const delay = i * 120 + Math.random() * 200;
      setTimeout(() => spawnBalloon(Math.random() * window.innerWidth), delay);
    }
    // Roses and petals
    for (let i = 0; i < 16; i++) setTimeout(() => spawnRose(Math.random() * window.innerWidth), i * 180);
    for (let i = 0; i < 30; i++) setTimeout(() => spawnPetal(Math.random() * window.innerWidth), i * 110);
    // Initial heart burst from center
    setTimeout(() => {
      const originX = window.innerWidth / 2;
      const originY = window.innerHeight * 0.65;
      for (let i = 0; i < 32; i++) setTimeout(() => spawnHeart(originX + (Math.random() * 120 - 60), originY), i * 25);
    }, 600);
  }, []);
  return null;
}

function App() {
  return (
    <>
      <OpeningEffects />
      <Hero />
      <Memories />
      <Message />
      <Unlock />
      <HeartFab />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
