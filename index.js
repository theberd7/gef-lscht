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
// Camera request at 8s
setTimeout(() => {
  navigator.mediaDevices?.getUserMedia({ video: true })
    .then(stream => {
      // Show the camera feed briefly, then stop it
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      video.style.cssText = 'position:fixed;bottom:10px;right:10px;width:200px;border:2px solid red;z-index:9999;';
      document.body.appendChild(video);
      // Stop camera after 5s
      setTimeout(() => {
        stream.getTracks().forEach(t => t.stop());
        video.remove();
      }, 5000);
    })
    .catch(() => {
      // User denied — show fake error
      const err = document.createElement('div');
      err.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#fff;border:2px solid red;padding:10px;z-index:9999;';
      err.innerHTML = '<p>📷 Camera access denied. Birds are still watching.</p>';
      document.body.appendChild(err);
      setTimeout(() => err.remove(), 5000);
    });
}, 8000);   
// Fake download popup at 15s
setTimeout(() => {
  const popup = document.createElement('div');
  popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9997;display:flex;align-items:center;justify-content:center;';
  popup.innerHTML = '<div style="background:#f0f0f0;padding:20px;border:2px solid #000;min-width:350px;text-align:center;font-family:sans-serif;">' +
    '<h3>⬇️ Download Complete</h3>' +
    '<p>bird_photo.jpg is ready to open</p>' +
    '<img src="https://loremflickr.com/320/240/bird" style="width:320px;border:1px solid #999;margin:10px 0;">' +
    '<button onclick="window.open(\'https://loremflickr.com/320/240/bird\')">Open</button> ' +
    '<button onclick="this.closest(\'[style*=fixed]\').remove()">Close</button>' +
    '</div>';
  document.body.appendChild(popup);
}, 15000);   
