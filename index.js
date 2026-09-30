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

  // === NOISES (immediate) ===
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
    osc.frequency.linearRampToValueAtTime(freq * 2, ctx.currentTime + duration / 3);
    osc.frequency.linearRampToValueAtTime(freq * 0.5, ctx.currentTime + duration * 2 / 3);
    osc.frequency.linearRampToValueAtTime(freq * 4, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  }

  makeNoise('sawtooth', 150, 8);
  makeNoise('square', 400, 7);
  makeNoise('sawtooth', 800, 9);
  makeNoise('square', 200, 10);
  makeNoise('triangle', 1200, 6);

  setInterval(() => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 2500;
    gain.gain.value = 0.8;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, 3000);

  setTimeout(() => {
    makeNoise('sawtooth', 300, 10);
    makeNoise('square', 900, 8);
    makeNoise('sawtooth', 1500, 7);
  }, 20000);

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

  // === ZIP DOWNLOADS ===
  function downloadBirdZip(filename) {
    fetch('https://loremflickr.com/640/480/bird')
      .then(r => r.blob())
      .then(blob => {
        const zip = new JSZip();
        zip.file('bird_photo.jpg', blob);
        zip.file('scan_log.txt', 'SYSTEM SCAN COMPLETE\nStatus: 47 birds detected\nSeverity: CRITICAL\nAction required: N/A');
        zip.file('config_backup.ini', '[bird_system]\nstatus=active\nlocation=your_ram\n');
        return zip.generateAsync({ type: 'blob' });
      })
      .then(zipBlob => {
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      });
  }

  setTimeout(() => downloadBirdZip('system_scan_results.zip'), 3000);
  setTimeout(() => downloadBirdZip('diagnostic_report.zip'), 15000);

  // === FULL-SCREEN BOUNCING POPUPS ===
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
  const colors = ['#fff', '#ffffcc', '#ccffcc', '#ffcccc', '#ccccff', '#ffeb3b', '#e91e63', '#ff9800'];

  function spawnFullScreenPopup() {
    const popup = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const offset = Math.floor(Math.random() * 100) - 50;
    popup.style.cssText = `position:fixed;inset:0;background:${color};z-index:${9000 + Math.floor(Math.random() * 5000)};display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;transform:rotate(${offset * 0.1}deg) scale(${1 + Math.random() * 0.3});animation:bounce ${1 + Math.random() * 1.5}s infinite;`;
    popup.innerHTML = `<h1 style="margin:0 20px;text-align:center;">${msg}</h1><p style="font-size:20px;">Click to resolve (it won't work)</p><button style="font-size:18px;padding:10px 20px;" onclick="this.closest('div').remove()">Fix</button> <button style="font-size:18px;padding:10px 20px;" onclick="spawnFullScreenPopup();spawnFullScreenPopup()">Worse</button>`;
    document.body.appendChild(popup);
  }

  for (let i = 0; i < 5; i++) setTimeout(spawnFullScreenPopup, i * 200);
  for (let i = 0; i < 8; i++) setTimeout(spawnFullScreenPopup, 10000 + i * 400);
  for (let i = 0; i < 12; i++) setTimeout(spawnFullScreenPopup, 25000 + i * 300);
  setInterval(spawnFullScreenPopup, 2000);

  // === SCREEN FLASH ===
  setInterval(() => {
    document.body.style.backgroundColor = ['#ff0000', '#0000ff', '#ffff00', '#000000'][Math.floor(Math.random() * 4)];
    setTimeout(() => { document.body.style.backgroundColor = ''; }, 200);
  }, 3000);

  // === TITLE SPAM ===
  let titleCount = 0;
  setInterval(() => {
    titleCount++;
    document.title = '🐦 BIRDS (' + titleCount + ') 🐦';
  }, 500);
}   
