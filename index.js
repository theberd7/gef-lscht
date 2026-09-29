setTimeout(() => {
  document.body.classList.add('shaking');
}, 2000);
setTimeout(() => {
  const popup = document.createElement('div');
  popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
  popup.innerHTML = '<div style="background:#f0f0f0;padding:20px;border:2px solid #000;min-width:300px;"><h3>⚠️ Security Warning</h3><p>Your device has birds inside. Click to remove.</p><button onclick="this.parentElement.parentElement.remove()">Remove Birds</button></div>';
  document.body.appendChild(popup);
}, 4000);
setTimeout(() => {
  const popup2 = document.createElement('div');
  popup2.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9998;display:flex;align-items:center;justify-content:center;';
  popup2.innerHTML = '<div style="background:#fff;padding:20px;border:2px solid red;min-width:300px;"><h3>🐦 Bird Detected</h3><p>3 birds found in your RAM.</p><button onclick="this.parentElement.parentElement.remove()">Release</button></div>';
  document.body.appendChild(popup2);
}, 8000);
setTimeout(() => {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.value = 200;
  gain.gain.value = 0.5;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 1);
  osc.stop(ctx.currentTime + 1.5);
}, 6000);   
