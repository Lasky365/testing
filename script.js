const giftButton = document.getElementById('openGift');
const giftMessage = document.getElementById('giftMessage');
const confettiLayer = document.getElementById('confettiLayer');

const colors = ['#ffd972', '#ff8bc7', '#9ce7ff', '#bca7ff', '#7af0c1', '#fff4ab'];

function showGift() {
  giftMessage.classList.add('visible');
  giftMessage.setAttribute('aria-hidden', 'false');
  giftButton.textContent = '💝 Close your gift';
  giftButton.setAttribute('aria-expanded', 'true');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    spawnConfettiBurst();
  }
}

function hideGift() {
  giftMessage.classList.remove('visible');
  giftMessage.setAttribute('aria-hidden', 'true');
  giftButton.textContent = '🎁 Open your gift';
  giftButton.setAttribute('aria-expanded', 'false');
}

function spawnConfettiBurst() {
  const burstCount = 120;

  for (let i = 0; i < burstCount; i += 1) {
    const particle = document.createElement('span');
    const isHeart = Math.random() > 0.5;

    particle.className = isHeart ? 'heart-piece' : 'confetti-piece';
    particle.textContent = isHeart ? '❤' : '';
    particle.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 180}px`;
    particle.style.top = `${window.innerHeight * 0.22 + (Math.random() - 0.5) * 30}px`;

    if (!isHeart) {
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    } else {
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 240}px`);
    particle.style.setProperty('--spin', `${(Math.random() - 0.5) * 980}deg`);
    particle.style.animationDelay = `${Math.random() * 0.18}s`;
    confettiLayer.appendChild(particle);

    setTimeout(() => particle.remove(), 3000);
  }
}

function createBalloons() {
  const balloonColors = ['#ff7bbd', '#ffd86a', '#8ad8ff', '#ba9cff', '#ff9d75', '#7de7c6'];

  for (let i = 0; i < 12; i += 1) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.setAttribute('aria-hidden', 'true');
    balloon.style.left = `${Math.random() * 90 + 2}%`;
    balloon.style.setProperty('--balloon-color', balloonColors[i % balloonColors.length]);
    balloon.style.setProperty('--duration', `${10 + Math.random() * 10}s`);
    balloon.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(balloon);
  }
}

function createFloatingHearts() {
  const heartIcons = ['❤', '♥', '❣', '♡'];

  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.setAttribute('aria-hidden', 'true');
    heart.textContent = heartIcons[i % heartIcons.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 9}s`;
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;
    document.body.appendChild(heart);
  }
}

giftButton.addEventListener('click', () => {
  if (giftMessage.classList.contains('visible')) {
    hideGift();
  } else {
    showGift();
  }
});

createBalloons();
createFloatingHearts();
