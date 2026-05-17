gsap.registerPlugin(ScrollTrigger);

// --- 1. GLOBAL BACKGROUND (Three.js) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: '#c1c4e6',
  transparent: true,
  opacity: 0.8
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
});

const animate = () => {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.001;
  particlesMesh.position.x += (mouseX * 0.1 - particlesMesh.position.x) * 0.05;
  particlesMesh.position.y += (-mouseY * 0.1 - particlesMesh.position.y) * 0.05;
  renderer.render(scene, camera);
};
animate();

// --- 2. HERO SECTION ANIMATIONS ---
const heroTl = gsap.timeline();
heroTl.to(".word-reveal span", {
  opacity: 1,
  filter: "blur(0px)",
  y: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out"
})
.to("#hero-sub", { opacity: 1, duration: 1 }, "-=0.4");

// Cake Orbiting Particles
gsap.to("#hero-cake", {
  scale: 1.05,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Balloon Pop Interaction
const popBtn = document.getElementById('pop-balloon-btn');
const balloon = document.getElementById('balloon-container');
const balloonMsg = document.getElementById('balloon-msg');
    
popBtn.addEventListener('click', () => {
  const tl = gsap.timeline();
  tl.to(balloon, { opacity: 1, scale: 1.5, duration: 1, ease: "back.out(1.7)" })
    .to(balloon, { scale: 0, opacity: 0, duration: 0.1, onComplete: createBurst })
    .to(balloonMsg, { opacity: 1, y: -20, duration: 0.5 });
});

function createBurst() {
  for(let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.innerHTML = ['❤️', '✨', '🌸'][Math.floor(Math.random() * 3)];
    p.className = 'absolute text-xl pointer-events-none';
    p.style.left = '50%';
    p.style.top = '20%';
    document.getElementById('balloon-container').parentElement.appendChild(p);
    gsap.to(p, {
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      rotation: Math.random() * 360,
      opacity: 0,
      duration: 1 + Math.random(),
      onComplete: () => p.remove()
    });
  }
}

// --- 3. MAKE A WISH SECTION ---
const candleFlame = document.getElementById('candle-flame');
gsap.to(candleFlame, {
  scaleX: 0.8,
  scaleY: 1.2,
  duration: 0.1,
  repeat: -1,
  yoyo: true,
  ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
});

document.getElementById('blow-candle-btn').addEventListener('click', () => {
  // Smoke effect
  for(let i = 0; i < 10; i++) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke-particle w-2 h-2';
    smoke.style.left = '50%';
    smoke.style.top = '40px';
    document.getElementById('candle-flame').parentElement.appendChild(smoke);
    gsap.to(smoke, {
      y: -100 - Math.random() * 100,
      x: (Math.random() - 0.5) * 50,
      opacity: 0,
      scale: 4,
      duration: 2,
      onComplete: () => smoke.remove()
    });
  }
    
  gsap.to('#candle-flame', { opacity: 0, duration: 0.2 });
  gsap.to('body', { backgroundColor: '#050505', duration: 1 });
  gsap.to('#wish-input-group, #wish-instruction', { opacity: 0, duration: 0.5 });
  setTimeout(() => {
    document.getElementById('post-wish-msg').classList.remove('hidden');
    gsap.from('#post-wish-msg', { opacity: 0, scale: 0.9, duration: 1 });
  }, 600);
});

// --- 4. MEMORY LANE ---
const cards = document.querySelectorAll('#memory-lane .memory-card.tilt-card');
cards.forEach((card, i) => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const floatDistance = isMobile ? 4 : 6;
  const floatDuration = 3.4 + i * 0.5;

  // Continuous float
  gsap.to(card, {
    y: -floatDistance,
    duration: floatDuration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // 3D Tilt
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;
    gsap.to(card, { rotateX, rotateY, scale: 1.028, duration: 0.45, ease: "power2.out" });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
  });

  // Scroll Reveal
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 88%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 46,
    filter: "blur(12px)",
    duration: 1.15,
    delay: i * 0.14,
    ease: "power3.out"
  });
});

// --- 5. FINAL SURPRISE ---
const unlockBtn = document.getElementById('unlock-surprise-btn');
const magneticWrap = document.querySelector('.magnetic-wrap');

magneticWrap.addEventListener('mousemove', (e) => {
  const rect = magneticWrap.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(unlockBtn, { x: x * 0.5, y: y * 0.5, duration: 0.3 });
});

magneticWrap.addEventListener('mouseleave', () => {
  gsap.to(unlockBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
});

unlockBtn.addEventListener('click', () => {
  const overlay = document.getElementById('surprise-overlay');
  overlay.style.display = 'flex';
  overlay.classList.add('active');
  
  gsap.to(overlay, { opacity: 1, duration: 1.5, ease: "power4.inOut", onComplete: startFinale });
});

function startFinale() {
  const container = document.getElementById('surprise-container');

  // soft moon glow element
  const moonGlow = document.createElement('div');
  moonGlow.className = 'moon-glow';
  container.appendChild(moonGlow);

  // gently intensify Three.js particles (brighter, slightly larger)
  gsap.to(particlesMaterial, { opacity: 1.0, size: 0.012, duration: 2.2, ease: 'power2.inOut' });

  // gradually spawn ambient drifting particles
  function spawnAmbient() {
    const p = document.createElement('div');
    p.className = 'ambient-particle';
    const startLeft = 20 + Math.random() * 60;
    const startTop = 10 + Math.random() * 60;
    p.style.left = startLeft + '%';
    p.style.top = startTop + '%';
    container.appendChild(p);
    gsap.to(p, {
      x: (Math.random() - 0.5) * 240,
      y: (Math.random() - 0.5) * 240,
      opacity: 0.9,
      duration: 6 + Math.random() * 6,
      ease: 'sine.inOut',
      onComplete: () => p.remove()
    });
  }
  const ambientInterval = setInterval(spawnAmbient, 480);

  // soft hearts appearing occasionally
  const heartInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'heart-soft';
    heart.style.left = (35 + Math.random() * 30) + '%';
    heart.style.top = (30 + Math.random() * 30) + '%';
    container.appendChild(heart);
    gsap.to(heart, {
      opacity: 0.14 + Math.random() * 0.12,
      y: '-=' + (10 + Math.random() * 30),
      scale: 1 + Math.random() * 0.08,
      duration: 4 + Math.random() * 4,
      ease: 'sine.inOut',
      onComplete: () => heart.remove()
    });
  }, 900 + Math.random() * 300);

  // Cinematic reveal timeline
  const letterCard = document.getElementById('letter-card');
  // initial blur state for dramatic blur-to-clear
  letterCard.style.opacity = 0;
  letterCard.style.filter = 'blur(18px)';
  letterCard.style.transform = 'translateY(18px)';

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  // moon glow rises softly
  tl.to(moonGlow, { opacity: 1, duration: 1.6, scale: 1, ease: 'power3.out' }, 0)
    .to('#surprise-overlay', { backgroundColor: 'rgba(2,4,8,0.86)', duration: 1.6 }, 0)
    .to(particlesMesh.rotation, { y: particlesMesh.rotation.y + 0.6, duration: 2.2 }, 0);

  // pause for dramatic effect
  tl.to({}, { duration: 0.6 });

  // reveal the letter card with blur-to-clear and float
  tl.to(letterCard, { opacity: 1, filter: 'blur(0px)', y: -12, duration: 1.4 }, 'reveal')
    .to(letterCard, { scale: 1.002, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 'reveal+=1.6');

  // reveal each line, cinematic timing
  const lines = document.querySelectorAll('.letter-line');
  tl.to(lines, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.1,
    stagger: 0.9,
    onStart: function() {
      lines.forEach(l => l.classList.add('glow'));
    }
  }, 'reveal+=0.4');

  // gentle pulse behind letter after all text appears
  tl.call(() => {
    const pulse = document.createElement('div');
    pulse.className = 'letter-pulse';
    letterCard.insertAdjacentElement('beforebegin', pulse);
    gsap.to(pulse, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    gsap.to(pulse, { opacity: 0.25, scale: 1.06, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, null, '+=1.2');

  // keep ambient intervals alive; store references if needed to clear later
  // preserve gentle star twinkle by animating particlesMaterial opacity subtly
  gsap.to(particlesMaterial, { opacity: 0.9, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
}
