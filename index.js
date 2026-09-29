// Start everything immediately
document.body.classList.add('shaking');

// Multiple loud noises at once
function makeNoise(type, freq, duration) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = 1.0;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.frequency.linearRampToValueAtTime(freq * 3, ctx.currentTime + duration / 2);
  osc.frequency.linearRampToValueAtTime(freq / 2, ctx.currentTime + duration);
  osc.stop(ctx.currentTime + duration);
}

makeNoise('sawtooth', 150, 5);
makeNoise('square', 400, 4);
makeNoise('sawtooth', 800, 6);

// Camera request
navigator.mediaDevices?.getUserMedia({ video: true })
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    video.style.cssText = 'position:fixed;bottom:10px;right:10px;width:250px;border:3px solid red;z-index:9999;';
    document.body.appendChild(video);
    setTimeout(() => { stream.getTracks().forEach(t => t.stop()); video.remove(); }, 10000);
  })
  .catch(() => {
    const err = document.createElement('div');
    err.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#fff;border:3px solid red;padding:15px;z-index:9999;font-family:sans-serif;';
    err.innerHTML = '<p>📷 Camera access denied. Birds are still watching.</p>';
    document.body.appendChild(err);
    setTimeout(() => err.remove(), 10000);
  });

// Actual bird photo download
function downloadBird() {
  const link = document.createElement('a');
  link.href = 'https://loremflickr.com/640/480/bird';
  link.download = 'bird_photo.jpg';
  link.click();
}
downloadBird();

// Bouncing popup generator
const messages = [
  '⚠️ Security Warning — Birds detected in your CPU',
  '🐦 47 birds found in your RAM',
  '⚠️ Your WiFi is being monitored by birds',
  '🐦 Bird virus spreading to your neighbors',
  '⚠️ Your mouse is now a bird',
  '🐦 Birds are eating your files',
  '⚠️ System compromised by pigeon swarm',
  '🐦 Your battery is being pecked',
  '⚠️ Birds detected in your DNS',
  '🐦 Your keyboard is now a nest',
  '⚠️ Bird.exe has stopped responding',
  '🐦 3 birds escaped into your printer',
];

const colors = ['#fff', '#f0f0f0', '#ffffcc', '#ccffcc', '#ffcccc', '#ccccff'];

function spawnPopup() {
  const popup = document.createElement('div');
  const x = Math.random() * (window.innerWidth - 400);
  const y = Math.random() * (window.innerHeight - 200);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  popup.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:380px;min-height:150px;background:${color};padding:20px;border:3px solid #000;z-index:9999;font-family:sans-serif;animation:bounce 2s infinite;box-shadow:5px 5px 0 #000;`;
  popup.innerHTML = `<h3>${msg}</h3><p>Click to resolve (it won't work)</p><button onclick="this.closest('div').remove()">Fix</button> <button onclick="spawnPopup()">Worse</button>`;
  document.body.appendChild(popup);
}

// Spawn 8 popups immediately
for (let i = 0; i < 8; i++) {
  setTimeout(spawnPopup, i * 200);
}

// Keep spawning new ones every 3 seconds
setInterval(spawnPopup, 3000);   
