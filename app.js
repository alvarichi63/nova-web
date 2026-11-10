// NOVA · web interactiva. JavaScript a mano, sin librerías.
const TIENDA = "https://tienda.alvarodeveloper.es";
const UTM = "utm_source=nova-web&utm_medium=web&utm_campaign=blackfriday";
const FIN_BF = new Date("2026-11-30T23:59:59+01:00");
const VID = "https://cdn.shopify.com/videos/c/vp/";

// Lo que la tienda no guarda: nombre corto, frase, color y vídeo de cada producto
const EXTRA = {
  "proyector-oceano-nova": { nombre: "Proyector Océano", frase: "Olas en movimiento en tu techo, 16 colores y mando.", color: "#2bd9f5", video: VID + "b3ca24bfe5da471191058b5882660e9b/b3ca24bfe5da471191058b5882660e9b.HD-720p-4.5Mbps-100721433.mp4" },
  "lampara-medusa-nova": { nombre: "Lámpara Medusa", frase: "Tentáculos que se mueven y cambian de color con el mando.", color: "#c084fc", video: VID + "46903c71cad34b90be71ebb07422e27c/46903c71cad34b90be71ebb07422e27c.HD-720p-3.0Mbps-100721250.mp4" },
  "lampara-cristal-nova": { nombre: "Lámpara Cristal", frase: "Reflejos de diamante, táctil y sin cables.", color: "#f5c46b", video: VID + "88446181fbf84aa7aba4a852bd50163a/88446181fbf84aa7aba4a852bd50163a.HD-720p-3.0Mbps-100721255.mp4" },
  "lampara-atardecer-nova": { nombre: "Lámpara Atardecer", frase: "Tu puesta de sol en la pared, a cualquier hora.", color: "#ff8a3d", video: VID + "759aa40e4f2c48d68f13b411264039eb/759aa40e4f2c48d68f13b411264039eb.HD-720p-3.0Mbps-100721434.mp4" },
  "lampara-inalambrica-nova": { nombre: "Lámpara Inalámbrica", frase: "Luz de restaurante en tu mesa, sin enchufe.", color: "#ffd23f", video: VID + "3a1e1461b94e46ad96c9a29b59f43e9b/3a1e1461b94e46ad96c9a29b59f43e9b.HD-720p-2.1Mbps-100721249.mp4" },
  "calentador-manos-nova": { nombre: "Calentador de Manos", frase: "Calor por las dos caras, recargable por USB.", color: "#ff7a45", video: VID + "7a3424b0f9a54267a28f376231f0fb4e/7a3424b0f9a54267a28f376231f0fb4e.HD-720p-3.0Mbps-100721253.mp4" },
  "despertador-proyector-nova": { nombre: "Despertador Proyector", frase: "La hora en el techo, sin abrir los ojos del todo.", color: "#ff4d6d" },
  "luces-sensor-nova": { nombre: "Luces con Sensor", frase: "Se encienden solas al pasar: armarios, pasillos, escaleras.", color: "#7cf5c9" },
};
const ORDEN = ["proyector-oceano-nova", "lampara-medusa-nova", "lampara-cristal-nova", "lampara-atardecer-nova", "lampara-inalambrica-nova", "calentador-manos-nova", "despertador-proyector-nova", "luces-sensor-nova"];
const BF_VIDEO = VID + "90d3bca9ec2b41f29d30a28919d7f6e6/90d3bca9ec2b41f29d30a28919d7f6e6.HD-720p-4.5Mbps-100721855.mp4";

const euros = (n) => Number(n).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Luz de la portada: ondas de agua que siguen al dedo ---------- */
(() => {
  const cv = document.getElementById("luz"), cx = cv.getContext("2d");
  let w, h, t = 0, px = 0.5, py = 0.45, tx = 0.5, ty = 0.45, luz = 0, objetivo = 0;
  const ajustar = () => { const r = devicePixelRatio > 1 ? 1.5 : 1; w = cv.width = cv.offsetWidth * r; h = cv.height = cv.offsetHeight * r; };
  addEventListener("resize", ajustar); ajustar();
  const mover = (x, y) => { const r = cv.getBoundingClientRect(); tx = (x - r.left) / r.width; ty = (y - r.top) / r.height; };
  addEventListener("pointermove", (e) => mover(e.clientX, e.clientY), { passive: true });
  addEventListener("touchmove", (e) => mover(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

  // Interruptor y scroll encienden la luz
  const boton = document.getElementById("interruptor");
  const poner = (on) => {
    objetivo = on ? 1 : 0;
    document.body.classList.toggle("encendido", on); document.body.classList.toggle("apagado", !on);
    boton.setAttribute("aria-pressed", on); boton.querySelector(".txt").textContent = on ? "Apaga la luz" : "Enciende la luz";
  };
  boton.addEventListener("click", () => { poner(objetivo === 0); if (navigator.vibrate) navigator.vibrate(12); });
  addEventListener("scroll", () => { if (scrollY > innerHeight * 0.35 && objetivo === 0) poner(true); }, { passive: true });
  setTimeout(() => { if (objetivo === 0 && scrollY < 10) poner(true); }, 2600); // se enciende sola si no tocas nada

  const dibujar = () => {
    t += 0.012; px += (tx - px) * 0.06; py += (ty - py) * 0.06; luz += (objetivo - luz) * 0.05;
    document.documentElement.style.setProperty("--luz", luz.toFixed(3));
    cx.clearRect(0, 0, w, h);
    const fuerza = 0.25 + 0.75 * luz;
    // foco que sigue al dedo
    const g = cx.createRadialGradient(px * w, py * h, 0, px * w, py * h, Math.max(w, h) * (0.25 + 0.2 * luz));
    g.addColorStop(0, `rgba(43,217,245,${0.35 * fuerza})`); g.addColorStop(1, "rgba(43,217,245,0)");
    cx.fillStyle = g; cx.fillRect(0, 0, w, h);
    // cáusticas: líneas de luz que ondulan como el agua
    cx.lineWidth = 2; cx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 14; i++) {
      cx.beginPath();
      const y0 = (i / 14) * h;
      for (let x = 0; x <= w; x += 18) {
        const y = y0 + Math.sin(x * 0.006 + t * 2 + i) * 22 + Math.sin(x * 0.013 - t * 1.4 + i * 2) * 12 + (py - 0.5) * 30;
        x === 0 ? cx.moveTo(x, y) : cx.lineTo(x, y);
      }
      const d = 1 - Math.min(1, Math.abs(y0 / h - py) * 1.6);
      cx.strokeStyle = `rgba(${i % 3 ? "120,230,255" : "190,140,255"},${0.06 + 0.22 * d * fuerza})`;
      cx.stroke();
    }
    cx.globalCompositeOperation = "source-over";
    if (!quieto) requestAnimationFrame(dibujar);
  };
  dibujar();
})();

/* ---------- 2. Cuenta atrás hasta el 30/11 ---------- */
(() => {
  const celdas = Object.fromEntries([...document.querySelectorAll("#reloj b")].map((b) => [b.dataset.u, b]));
  const mini = document.getElementById("cuenta-mini");
  const tic = () => {
    let s = Math.max(0, Math.floor((FIN_BF - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    const p = (n) => String(n).padStart(2, "0");
    celdas.d.textContent = p(d); celdas.h.textContent = p(h); celdas.m.textContent = p(m); celdas.s.textContent = p(s);
    mini.textContent = `${d}d ${p(h)}h ${p(m)}m`;
  };
  tic(); setInterval(tic, 1000);
})();

/* ---------- 3. Productos con precio en vivo ---------- */
async function cargarProductos() {
  let datos;
  try { const r = await fetch("/api/productos"); if (!r.ok) throw 0; datos = await r.json(); }
  catch { datos = await (await fetch("/data/productos.json")).json(); }
  const lista = datos.productos.filter((p) => EXTRA[p.handle]).sort((a, b) => ORDEN.indexOf(a.handle) - ORDEN.indexOf(b.handle));
  const rejilla = document.getElementById("rejilla");
  rejilla.innerHTML = "";
  lista.forEach((p) => rejilla.appendChild(tarjeta(p)));
  observar(rejilla.querySelectorAll(".tarjeta"));
}

function tarjeta(p) {
  const ex = EXTRA[p.handle];
  const el = document.createElement("article");
  el.className = "tarjeta aparece"; el.style.setProperty("--color", ex.color);
  const vs = p.variantes.filter((v) => v.disponible);
  let sel = vs[0];
  el.innerHTML = `
    <div class="foto"><span class="etiqueta">${vs.some((v) => v.antes) ? "Oferta" : "Black Friday"}</span>
      ${p.fotos.slice(0, 2).map((f, i) => `<img src="${f}&width=700" alt="${ex.nombre}${i ? " en uso" : ""}" loading="lazy">`).join("")}
    </div>
    <div class="info">
      <h3>${ex.nombre}</h3>
      <p class="frase">${ex.frase}</p>
      <div class="packs">${vs.length > 1 ? vs.map((v, i) => `<button type="button" aria-pressed="${i === 0}" data-i="${i}">${v.titulo}</button>`).join("") : ""}</div>
      <div class="precio"></div>
      <a class="comprar" target="_self">Comprar</a>
      <a class="ver" href="${TIENDA}/products/${p.handle}?${UTM}">Ver todos los detalles</a>
    </div>`;
  const precio = el.querySelector(".precio"), comprar = el.querySelector(".comprar");
  const pintar = () => {
    precio.innerHTML = `<b>${euros(sel.precio)}</b>${sel.antes ? `<s>${euros(sel.antes)}</s>` : ""}`;
    comprar.href = `${TIENDA}/cart/${sel.id}:1?${UTM}`;
  };
  el.querySelectorAll(".packs button").forEach((b) => b.addEventListener("click", () => {
    el.querySelectorAll(".packs button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    sel = vs[Number(b.dataset.i)]; pintar();
  }));
  comprar.addEventListener("click", () => avisar(`Te llevamos a la caja… ${ex.nombre}`));
  pintar();
  // inclinación 3D y brillo que siguen al dedo
  el.addEventListener("pointermove", (e) => {
    if (quieto) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`); el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
  });
  el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  return el;
}

/* ---------- 4. Carrete de vídeos ---------- */
function montarVideos() {
  const carrete = document.getElementById("carrete");
  const fuentes = [BF_VIDEO, ...ORDEN.map((h) => EXTRA[h].video).filter(Boolean)];
  fuentes.forEach((src) => {
    const c = document.createElement("div");
    c.className = "clip";
    c.innerHTML = `<video muted loop playsinline preload="none" src="${src}"></video><span class="sonido">🔇 Toca</span>`;
    const v = c.querySelector("video"), s = c.querySelector(".sonido");
    c.addEventListener("click", () => { v.muted = !v.muted; s.textContent = v.muted ? "🔇 Toca" : "🔊"; v.play(); });
    carrete.appendChild(c);
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target.querySelector("video");
    if (e.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else { v.pause(); v.muted = true; e.target.querySelector(".sonido").textContent = "🔇 Toca"; }
  }), { threshold: 0.6 });
  carrete.querySelectorAll(".clip").forEach((c) => io.observe(c));
}

/* ---------- 5. Aparecer al hacer scroll y aviso ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }), { threshold: 0.12 });
function observar(els) { els.forEach((el) => io.observe(el)); }
let tAviso;
function avisar(txt) {
  const a = document.getElementById("aviso"); a.textContent = txt; a.classList.add("ver");
  clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove("ver"), 2200);
}

observar(document.querySelectorAll(".aparece"));
cargarProductos();
montarVideos();
