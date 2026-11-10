const giftButton = document.getElementById('openGift');
const giftMessage = document.getElementById('giftMessage');
const heartMessageButton = document.getElementById('openHeartMessage');
const heartMessage = document.getElementById('heartMessage');
const confettiLayer = document.getElementById('confettiLayer');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const removePhotoButton = document.getElementById('removePhoto');
const photoStatus = document.getElementById('photoStatus');

const colors = ['#ffd972', '#ff8bc7', '#9ce7ff', '#bca7ff', '#7af0c1', '#fff4ab'];
let photoUrl = null;

function showGift() {
  giftMessage.classList.add('visible');
  giftMessage.setAttribute('aria-hidden', 'false');
  giftMessage.inert = false;
  giftButton.textContent = '💝 Close your gift';
  giftButton.setAttribute('aria-expanded', 'true');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    spawnConfettiBurst();
  }
}

function hideGift() {
  giftMessage.classList.remove('visible');
  giftMessage.setAttribute('aria-hidden', 'true');
  giftMessage.inert = true;
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

function createSakuraPetals() {
  for (let i = 0; i < 36; i += 1) {
    const petal = document.createElement('span');
    const duration = 10 + Math.random() * 10;

    petal.className = 'sakura-petal';
    petal.setAttribute('aria-hidden', 'true');
    petal.textContent = '🌸';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty('--duration', `${duration}s`);
    petal.style.setProperty('--delay', `${-Math.random() * duration}s`);
    petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`);
    petal.style.setProperty('--spin', `${Math.random() * 720 - 360}deg`);
    petal.style.setProperty('--size', `${0.8 + Math.random() * 1.1}rem`);
    document.body.appendChild(petal);
  }
}

function clearPhoto() {
  if (photoUrl) {
    URL.revokeObjectURL(photoUrl);
    photoUrl = null;
  }

  photoPreview.removeAttribute('src');
  photoPreview.hidden = true;
  photoPlaceholder.hidden = false;
  removePhotoButton.hidden = true;
  photoInput.value = '';
  photoStatus.textContent = 'Photo removed.';
}

photoInput.addEventListener('change', () => {
  const [file] = photoInput.files;

  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    photoInput.value = '';
    photoStatus.textContent = 'Please choose an image file.';
    return;
  }

  if (photoUrl) {
    URL.revokeObjectURL(photoUrl);
  }

  photoUrl = URL.createObjectURL(file);
  photoPreview.src = photoUrl;
  photoPreview.hidden = false;
  photoPlaceholder.hidden = true;
  removePhotoButton.hidden = false;
  photoStatus.textContent = `${file.name} added to the birthday card.`;
});

removePhotoButton.addEventListener('click', clearPhoto);

heartMessageButton.addEventListener('click', () => {
  const isOpen = heartMessage.classList.toggle('visible');
  heartMessage.setAttribute('aria-hidden', String(!isOpen));
  heartMessage.inert = !isOpen;
  heartMessageButton.setAttribute('aria-expanded', String(isOpen));
  heartMessageButton.textContent = isOpen ? '💗 Close my message' : '💌 Open my heart';
});

giftButton.addEventListener('click', () => {
  if (giftMessage.classList.contains('visible')) {
    hideGift();
  } else {
    showGift();
  }
});

createBalloons();
createFloatingHearts();
createSakuraPetals();
