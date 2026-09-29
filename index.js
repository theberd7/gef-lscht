// Click-to-start (unlocks audio)
const startScreen = document.createElement('div');
startScreen.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
startScreen.innerHTML = '<h1 style="color:#fff;font-family:sans-serif;">🐦 Click to enter</h1>';
document.body.appendChild(startScreen);

startScreen.addEventListener('click', () => {
  startScreen.remove();
  startChaos();
});

function startChaos() {
  document.body.classList.add('shaking');

  // === NOISES (3 overlapping, long) ===
  function makeNoise(type, freq, duration, delay) {
    setTimeout(() => {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 1.0;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.frequency.linearRampToValueAtTime(freq * 2, ctx.currentTime + duration / 3);
      osc.frequency.linearRampToValueAtTime(freq * 0.5, ctx.currentTime + duration * 2 / 3);
      osc.frequency.linearRampToValueAtTime(freq * 4, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    }, delay);
  }

  // Phase 1: initial burst
  makeNoise('sawtooth', 150, 6, 0);
  makeNoise('square', 400, 5, 0);
  makeNoise('sawtooth', 800, 7, 0);

  // Phase 2: second wave
  makeNoise('square', 200, 8, 10000);
  makeNoise('sawtooth', 600, 6, 12000);
  makeNoise('triangle', 1000, 5, 11000);

  // Phase 3: final assault
  makeNoise('sawtooth', 300, 10, 30000);
  makeNoise('square', 800, 8, 32000);
  makeNoise('sawtooth', 1500, 6, 31000);

  // Continuous annoying beep every 5s
  setInterval(() => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 2000;
    gain.gain.value = 0.7;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }, 5000);

  // === CAMERA ===
  navigator.mediaDevices?.getUserMedia({ video: true })
    .then(stream => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      video.style.cssText = 'position:fixed;bottom:10px;right:10px;width:250px;border:3px solid red;z-index:9999;';
      document.body.appendChild(video);
      setTimeout(() => { stream.getTracks().forEach(t => t.stop()); video.remove(); }, 30000);
    })
    .catch(() => {
      const err = document.createElement('div');
      err.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#fff;border:3px solid red;padding:15px;z-index:9999;font-family:sans-serif;';
      err.innerHTML = '<p>📷 Camera denied. Birds are still watching.</p>';
      document.body.appendChild(err);
      setTimeout(() => err.remove(), 15000);
    });

  // === ACTUAL BIRD DOWNLOAD ===
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = 'https://loremflickr.com/640/480/bird';
    link.download = 'bird_photo.jpg';
    link.click();
  }, 3000);

  // Second download at 20s
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = 'https://loremflickr.com/640/480/bird';
    link.download = 'another_bird.jpg';
    link.click();
  }, 20000);

  // === BOUNCING POPUPS ===
  const messages = [
    '⚠️ Birds detected in your CPU',
    '🐦 47 birds found in your RAM',
    '⚠️ Your WiFi is monitored by birds',
    '🐦 Bird virus spreading to neighbors',
    '⚠️ Your mouse is now a bird',
    '🐦 Birds are eating your files',
    '⚠️ Pigeon swarm compromised system',
    '🐦 Your battery is being pecked',
    '⚠️ Birds detected in your DNS',
    '🐦 Your keyboard is now a nest',
    '⚠️ Bird.exe has stopped responding',
    '🐦 3 birds escaped into your printer',
    '⚠️ Your GPU is now a bird coop',
    '🐦 Birds are defragmenting your soul',
    '⚠️ Nest detected in your SSD',
    '🐦 Your CPU is now a bird brain',
  ];

  const colors = ['#fff', '#f0f0f0', '#ffffcc', '#ccffcc', '#ffcccc', '#ccccff', '#ffeb3b', '#e91e63'];

  function spawnPopup() {
    const popup = document.createElement('div');
    const x = Math.random() * (window.innerWidth - 420);
    const y = Math.random() * (window.innerHeight - 220);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const size = 350 + Math.random() * 100;

    popup.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;min-height:160px;background:${color};padding:20px;border:4px solid #000;z-index:9999;font-family:sans-serif;animation:bounce ${1 + Math.random() * 2}s infinite;box-shadow:6px 6px 0 #000;`;
    popup.innerHTML = `<h3>${msg}</h3><p>Click to resolve (it won't work)</p><button onclick="this.closest('div').remove()">Fix</button> <button onclick="spawnPopup();spawnPopup()">Worse</button>`;
    document.body.appendChild(popup);
  }

  // Phase 1: 10 popups immediately
  for (let i = 0; i < 10; i++) setTimeout(spawnPopup, i * 300);

  // Phase 2: more at 15s
  for (let i = 0; i < 8; i++) setTimeout(spawnPopup, 15000 + i * 500);

  // Phase 3: more at 35s
  for (let i = 0; i < 12; i++) setTimeout(spawnPopup, 35000 + i * 400);

  // Keep spawning forever
  setInterval(spawnPopup, 2500);

  // === FAKE DOWNLOAD POPUP ===
  setTimeout(() => {
    const popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;left:' + (Math.random() * (window.innerWidth - 450)) + 'px;top:' + (Math.random() * (window.innerHeight - 300)) + 'px;width:420px;background:#f0f0f0;padding:20px;border:4px solid #000;z-index:9999;font-family:sans-serif;animation:bounce 2s infinite;box-shadow:6px 6px 0 #000;';
    popup.innerHTML = '<h3>⬇️ Download Complete</h3><p>bird_photo.jpg is ready</p><img src="https://loremflickr.com/320/240/bird" style="width:100%;border:2px solid #999;margin:10px 0;"><button onclick="this.closest(\'div\').remove()">Close</button>';
    document.body.appendChild(popup);
  }, 8000);

  // === SCREEN FLASH ===
  setInterval(() => {
    document.body.style.backgroundColor = Math.random() > 0.5 ? '#ff0000' : '#0000ff';
    setTimeout(() => { document.body.style.backgroundColor = ''; }, 200);
  }, 4000);

  // === TITLE SPAM ===
  let titleCount = 0;
  setInterval(() => {
    titleCount++;
    document.title = '🐦 BIRDS (' + titleCount + ') 🐦';
  }, 1000);
}   
