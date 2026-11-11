/* H-konet: confetti + congratulations popup
   Usage: call celebrateAcceptance("Grace & Truth Scholars Court") when the student taps "Accept room".
   No libraries needed. Works in plain JS or inside a React handler. */

function celebrateAcceptance(hostelName) {
  // ---------- Popup ----------
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:9998;padding:16px;";
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;padding:28px 22px;max-width:340px;width:100%;text-align:center;font-family:system-ui,sans-serif;animation:hkPop .35s ease-out;">
      <div style="font-size:56px;line-height:1">🎉</div>
      <h2 style="margin:12px 0 6px;font-size:24px;color:#0b3d2e;">Congratulations!</h2>
      <p style="margin:0 0 6px;color:#333;font-size:16px;">You've accepted your room at</p>
      <p style="margin:0 0 16px;color:#059669;font-weight:700;font-size:18px;">${hostelName}</p>
      <p style="margin:0 0 20px;color:#666;font-size:14px;">Enjoy your stay and all the best this academic year!</p>
      <button id="hkCelebrateClose" style="background:#059669;color:#fff;border:0;border-radius:14px;padding:12px 28px;font-size:16px;font-weight:700;">Awesome!</button>
    </div>
    <style>@keyframes hkPop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}</style>`;
  document.body.appendChild(overlay);

  // ---------- Confetti ----------
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const colors = ["#059669", "#fbbf24", "#f97316", "#3b82f6", "#ec4899", "#a855f7"];
  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.6,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 8,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI,
    vr: -0.2 + Math.random() * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  let running = true;
  const stopAt = Date.now() + 4500;

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y > canvas.height && Date.now() < stopAt) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (Date.now() > stopAt && pieces.every((p) => p.y > canvas.height)) {
      cleanup();
      return;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  function cleanup() {
    running = false;
    canvas.remove();
  }

  document.getElementById("hkCelebrateClose").onclick = () => {
    cleanup();
    overlay.remove();
  };
}
