// JumiHome · web interactiva. JavaScript a mano, sin librerías.
const TIENDA = "https://tienda.alvarodeveloper.es";
const UTM = "utm_source=jumihome-web&utm_medium=web&utm_campaign=blackfriday";
const FIN_BF = new Date("2026-11-30T23:59:59+01:00");
const VID = "https://cdn.shopify.com/videos/c/vp/";

// Lo que la tienda no guarda: nombre corto, frase, color y vídeo de cada producto
const EXTRA = {
  "proyector-oceano-nova": { nombre: "Proyector Océano", frase: "Olas en movimiento en tu techo, 16 colores y mando.", color: "#2bd9f5" },
  "mini-medusa-nova": { nombre: "Mini Lámpara Medusa", frase: "Le hablas o la tocas y cambia de color. Sus tentáculos se mueven solos.", color: "#c084fc" },
  "barra-enfriadora-vino-nova": { nombre: "Barras Enfriadoras de Vino", frase: "Vino fresco en la mesa sin aguarlo: congélala, métela en la botella y sirve.", color: "#e0446a" },
  "lampara-cristal-nova": { nombre: "Lámpara Cristal", frase: "Reflejos de diamante, táctil y sin cables.", color: "#f5c46b" },
  "lampara-atardecer-nova": { nombre: "Lámpara Atardecer", frase: "Tu puesta de sol en la pared, a cualquier hora.", color: "#ff8a3d" },
  "lampara-inalambrica-nova": { nombre: "Lámpara Inalámbrica", frase: "Luz de restaurante en tu mesa, sin enchufe.", color: "#ffd23f" },
  "calentador-manos-nova": { nombre: "Calentador de Manos", frase: "Calor por las dos caras, recargable por USB.", color: "#ff7a45" },
  "despertador-proyector-nova": { nombre: "Despertador Proyector", frase: "La hora en el techo, sin abrir los ojos del todo.", color: "#ff4d6d" },
  "luces-sensor-nova": { nombre: "Luces con Sensor", frase: "Se encienden solas al pasar: armarios, pasillos, escaleras.", color: "#7cf5c9" },
  "proyector-nieve-nova": { nombre: "Proyector Copos de Nieve", frase: "Una nevada de luz en tu pared esta Navidad.", color: "#cfe8ff" },
  "difusor-llama-nova": { nombre: "Difusor Llama", frase: "Una llama de colores que no quema: vapor iluminado y silencioso.", color: "#ff9f43" },
  "luces-arbol-navidad-nova": { nombre: "Luces de Árbol con App", frase: "Tu árbol cambia de color con la música, desde el móvil.", color: "#4ade80" },
  "linterna-frontal-nova": { nombre: "Linterna Frontal con Sensor", frase: "Se enciende con un gesto de la mano: manos libres para todo.", color: "#a3e635" },
  "soporte-sonido-bambu-nova": { nombre: "Soporte Acústico de Bambú", frase: "Tu móvil suena más fuerte, sin pilas ni Bluetooth.", color: "#d6b37a" },
  "calentador-tazas-nova": { nombre: "Calentador de Tazas", frase: "Tu café caliente hasta el último sorbo, 3 temperaturas.", color: "#f9a8d4" },
};
const ORDEN = ["proyector-oceano-nova", "proyector-nieve-nova", "luces-arbol-navidad-nova", "barra-enfriadora-vino-nova", "mini-medusa-nova", "linterna-frontal-nova", "soporte-sonido-bambu-nova", "difusor-llama-nova", "calentador-tazas-nova", "lampara-cristal-nova", "lampara-atardecer-nova", "lampara-inalambrica-nova", "calentador-manos-nova", "despertador-proyector-nova", "luces-sensor-nova"];
// Categorías para los filtros (un producto puede estar en varias)
const CATS = {
  "proyector-oceano-nova": ["luz"], "mini-medusa-nova": ["luz", "navidad"], "barra-enfriadora-vino-nova": ["hogar", "navidad"], "proyector-nieve-nova": ["luz", "navidad"],
  "luces-arbol-navidad-nova": ["luz", "navidad"], "difusor-llama-nova": ["calor", "luz"], "calentador-tazas-nova": ["calor", "navidad"],
  "lampara-cristal-nova": ["luz"], "lampara-atardecer-nova": ["luz"], "lampara-inalambrica-nova": ["luz"],
  "calentador-manos-nova": ["calor", "navidad", "hogar"], "linterna-frontal-nova": ["hogar", "navidad"], "soporte-sonido-bambu-nova": ["hogar"], "despertador-proyector-nova": ["luz"], "luces-sensor-nova": ["luz", "hogar"],
};
// Packs regalo: 2 productos (1 ud de cada) con el código PACKREGALO (10 % con 2 o más productos)
const PACK_DTO = 0.10, PACK_COD = "PACKREGALO";
const PACKS = [
  { nombre: "Pack Invierno Calentito", pagina: "pack-invierno-calentito", frase: "Manos calientes en la calle y café caliente en casa.", color: "#ff7a45", emoji: "🧤☕", productos: ["calentador-manos-nova", "calentador-tazas-nova"] },
  { nombre: "Pack Navidad en Casa", pagina: "pack-navidad-en-casa", frase: "Nieve en la pared y un árbol que baila con la música.", color: "#4ade80", emoji: "🎄❄️", productos: ["proyector-nieve-nova", "luces-arbol-navidad-nova"] },
  { nombre: "Pack Rincón Relax", pagina: "pack-rincon-relax", frase: "Una llama que no quema y un atardecer a cualquier hora.", color: "#ff9f43", emoji: "🔥🌅", productos: ["difusor-llama-nova", "lampara-atardecer-nova"] },
  { nombre: "Pack Dormitorio de Ensueño", pagina: "pack-dormitorio-ensueno", frase: "El mar en el techo para dormir y la hora proyectada al despertar.", color: "#2bd9f5", emoji: "🌊⏰", productos: ["proyector-oceano-nova", "despertador-proyector-nova"] },
];
const BF_VIDEO = VID + "90d3bca9ec2b41f29d30a28919d7f6e6/90d3bca9ec2b41f29d30a28919d7f6e6.HD-720p-4.5Mbps-100721855.mp4";

const euros = (n) => Number(n).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Portada: el castillo de JumiHome con la luz real de España (sol de día, atardecer, luna y estrellas de noche) ---------- */
(() => {
  const cv = document.getElementById("luz"), cx = cv.getContext("2d");
  let w, h, r = 1, t = 0, px = 0.5, tx = 0.5, luz = 0;
  let estrellas = [], copos = [], fugaz = null;
  const ajustar = () => {
    r = Math.min(devicePixelRatio || 1, 1.5); w = cv.width = cv.offsetWidth * r; h = cv.height = cv.offsetHeight * r;
    const n = Math.round((w * h) / (9000 * r * r));
    estrellas = Array.from({ length: Math.min(n, 220) }, () => ({ x: Math.random(), y: Math.random() * 0.62, s: Math.random() * 1.4 + 0.3, f: Math.random() * 6.28, v: 0.6 + Math.random() * 1.6 }));
    copos = Array.from({ length: Math.min(Math.round(n * 0.45), 90) }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 2 + 0.6, v: 0.0006 + Math.random() * 0.0012, d: Math.random() * 6.28 }));
  };
  addEventListener("resize", ajustar); ajustar();
  addEventListener("pointermove", (e) => { tx = e.clientX / innerWidth; }, { passive: true });

  // Castillo (mismas piezas que el logo, coordenadas 0..234 x 0..161)
  const piezas = [[62,96,116,62],[40,62,34,96],[38,54,8,9],[51,54,8,9],[64,54,8,9],[150,38,62,120],[148,29,9,10],[162,29,9,10],[176,29,9,10],[190,29,9,10],[204,29,9,10],[20,104,24,54],[20,97,7,8],[32,97,7,8],[10,156,214,5]];
  const ventanas = [[55,96,4,16,0],[172,62,4,15,1.7],[194,96,4,15,3.1],[178,110,4,13,4.4],[86,114,4,11,2.3],[144,114,4,11,5.2]];

  // Altura real del sol sobre Madrid (grados), calculada con la hora actual. ?hora=13 fuerza una hora para probar.
  const forzada = new URLSearchParams(location.search).get("hora");
  const elevSol = () => {
    let d = new Date();
    if (forzada !== null) { d = new Date(); d.setHours(+forzada, 0, 0, 0); }
    const rad = Math.PI / 180, lat = 40.42 * rad, lon = -3.70;
    const dia = (Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5;
    const g = 2 * Math.PI / 365 * (dia - 1 + (d.getUTCHours() - 12) / 24);
    const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g);
    const ecu = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const minSolar = d.getUTCHours() * 60 + d.getUTCMinutes() + ecu + 4 * lon;
    const ang = (minSolar / 4 - 180) * rad;
    const el = Math.asin(Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ang)) / rad;
    return { el, manana: ang < 0 };
  };
  let sol = elevSol(); setInterval(() => { sol = elevSol(); }, 60000);
  const mezcla = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;
  const P = { // cielo: arriba, medio, horizonte, suelo
    noche: [[5, 6, 15], [18, 26, 51], [58, 38, 24], [26, 18, 11]],
    ocaso: [[42, 44, 92], [196, 98, 82], [250, 170, 90], [60, 36, 22]],
    dia: [[58, 128, 205], [130, 186, 235], [236, 222, 196], [92, 66, 40]],
  };
  const paleta = (el) => {
    if (el <= -8) return P.noche.map((c) => c.slice());
    if (el < 0) { const k = (el + 8) / 8; return P.noche.map((c, i) => mezcla(c, P.ocaso[i], k)); }
    if (el < 10) { const k = el / 10; return P.ocaso.map((c, i) => mezcla(c, P.dia[i], k)); }
    return P.dia.map((c) => c.slice());
  };

  const poner = () => document.body.classList.add("encendido");
  setTimeout(poner, 300);

  const dibujar = () => {
    t += 0.016; px += (tx - px) * 0.04; luz += (1 - luz) * 0.03;
    document.documentElement.style.setProperty("--luz", luz.toFixed(3));
    // cielo con la luz real
    const el = sol.el, pal = paleta(el);
    const noche = Math.min(1, Math.max(0, (-el - 2) / 8));      // 1 = noche cerrada
    const diaK = Math.min(1, Math.max(0, el / 10));              // 1 = pleno día
    const cielo = cx.createLinearGradient(0, 0, 0, h);
    cielo.addColorStop(0, rgb(pal[0])); cielo.addColorStop(0.55, rgb(pal[1])); cielo.addColorStop(0.82, rgb(pal[2])); cielo.addColorStop(1, rgb(pal[3]));
    cx.fillStyle = cielo; cx.fillRect(0, 0, w, h);
    const lr = Math.min(w, h) * 0.06;
    if (el > -4) {
      // sol: sale por la izquierda, sube y baja por la derecha
      const alto = Math.min(1, Math.max(0, (el + 4) / 34));
      const sx = w * (sol.manana ? 0.12 + 0.38 * alto : 0.88 - 0.38 * alto), sy = h * (0.86 - 0.66 * alto);
      const halo = cx.createRadialGradient(sx, sy, lr * 0.5, sx, sy, lr * 7);
      halo.addColorStop(0, `rgba(255,${200 + 40 * diaK | 0},120,.45)`); halo.addColorStop(1, "rgba(255,220,140,0)");
      cx.fillStyle = halo; cx.fillRect(0, 0, w, h);
      cx.fillStyle = `rgb(255,${180 + 60 * diaK | 0},${90 + 110 * diaK | 0})`; cx.beginPath(); cx.arc(sx, sy, lr * 0.9, 0, 6.29); cx.fill();
    }
    if (noche > 0) {
      // luna
      const lx = w * (0.82 - (px - 0.5) * 0.03), ly = h * 0.2;
      cx.globalAlpha = noche;
      const halo = cx.createRadialGradient(lx, ly, lr * 0.6, lx, ly, lr * 5);
      halo.addColorStop(0, "rgba(255,226,170,.28)"); halo.addColorStop(1, "rgba(255,226,170,0)");
      cx.fillStyle = halo; cx.fillRect(0, 0, w, h);
      const disco = cx.createRadialGradient(lx - lr * 0.3, ly - lr * 0.3, lr * 0.1, lx, ly, lr);
      disco.addColorStop(0, "#fff6e0"); disco.addColorStop(1, "#f0d29a");
      cx.fillStyle = disco; cx.beginPath(); cx.arc(lx, ly, lr, 0, 6.29); cx.fill();
      cx.globalAlpha = 1;
    }
    // estrellas que titilan (solo cuando oscurece)
    for (const e of estrellas) {
      if (noche <= 0) break;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t * e.v + e.f));
      cx.fillStyle = `rgba(255,244,220,${a * luz * noche})`;
      cx.fillRect((e.x - (px - 0.5) * 0.02) * w, e.y * h, e.s * r, e.s * r);
    }
    // estrella fugaz de vez en cuando
    if (!fugaz && noche > 0.8 && Math.random() < 0.004) fugaz = { x: Math.random() * 0.6 + 0.1, y: Math.random() * 0.25, k: 0 };
    if (fugaz) {
      fugaz.k += 0.025;
      const x = (fugaz.x + fugaz.k * 0.35) * w, y = (fugaz.y + fugaz.k * 0.18) * h;
      const g = cx.createLinearGradient(x, y, x - 90 * r, y - 46 * r);
      g.addColorStop(0, `rgba(255,240,210,${1 - fugaz.k})`); g.addColorStop(1, "rgba(255,240,210,0)");
      cx.strokeStyle = g; cx.lineWidth = 2 * r; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x - 90 * r, y - 46 * r); cx.stroke();
      if (fugaz.k >= 1) fugaz = null;
    }
    // resplandor cálido del horizonte
    const hor = cx.createRadialGradient(w / 2, h * 1.05, 0, w / 2, h * 1.05, Math.max(w, h) * 0.6);
    hor.addColorStop(0, `rgba(200,135,63,${0.45 * luz * (1 - diaK * 0.7)})`); hor.addColorStop(1, "rgba(200,135,63,0)");
    cx.fillStyle = hor; cx.fillRect(0, 0, w, h);
    // colina
    const base = h * 0.93;
    cx.fillStyle = rgb(mezcla([13, 9, 7], [70, 52, 34], diaK)); cx.beginPath(); cx.moveTo(0, h);
    for (let x = 0; x <= w; x += 20 * r) cx.lineTo(x, base - Math.sin(x / w * 3.14) * h * 0.06 + Math.sin(x * 0.01 / r) * 4 * r);
    cx.lineTo(w, h); cx.fill();
    // castillo
    const ancha = w > h * 1.1;
    const esc = ancha ? Math.min(w * 0.3, h * 0.62 * 234 / 161) / 234 : Math.min(w * 0.7, h * 0.3 * 234 / 161) / 234;
    const cw = 234 * esc, chh = 161 * esc;
    const ox = (ancha ? w * 0.04 : w / 2 - cw / 2) + (px - 0.5) * 18 * r;
    const oy = base - (ancha ? h * 0.01 : h * 0.05) - chh + 6 * esc;
    cx.save(); cx.translate(ox, oy); cx.scale(esc, esc);
    cx.shadowColor = `rgba(230,150,70,${0.8 * (1 - diaK * 0.8)})`; cx.shadowBlur = 40;
    cx.fillStyle = rgb(mezcla([46, 29, 16], [200, 135, 63], diaK)); for (const [x, y, a, b] of piezas) cx.fillRect(x, y, a, b);
    cx.shadowBlur = 0;
    // puerta y ventanas encendidas (parpadean como velas)
    const encendidas = 1 - diaK;
    for (const [x, y, a, b, f] of ventanas) {
      if (encendidas <= 0.02) { cx.shadowBlur = 0; cx.fillStyle = "rgba(0,0,0,.45)"; cx.fillRect(x, y, a, b); continue; }
      const brillo = 0.7 + 0.3 * Math.sin(t * 3 + f) * Math.sin(t * 1.3 + f * 2);
      cx.shadowColor = "#ffb347"; cx.shadowBlur = 14 * brillo;
      cx.fillStyle = `rgba(255,${190 + 30 * brillo | 0},110,${luz * brillo * encendidas})`; cx.fillRect(x, y, a, b);
    }
    cx.shadowBlur = 20 * encendidas; cx.fillStyle = encendidas > 0.02 ? `rgba(255,190,110,${0.85 * luz * encendidas})` : "rgba(0,0,0,.45)";
    cx.beginPath(); cx.moveTo(100, 158); cx.lineTo(100, 138); cx.arc(109, 138, 9, Math.PI, 0); cx.lineTo(118, 158); cx.fill();
    cx.restore();
    // nieve suave
    for (const c of copos) {
      c.y += c.v; c.x += Math.sin(t + c.d) * 0.0004; if (c.y > 1) { c.y = -0.02; c.x = Math.random(); }
      cx.fillStyle = `rgba(255,255,255,${0.5 * luz * (1 - diaK * 0.5)})`; cx.beginPath(); cx.arc(c.x * w, c.y * h, c.s * r, 0, 6.29); cx.fill();
    }
    if (!quieto) requestAnimationFrame(dibujar);
  };
  if (quieto) { luz = 1; }
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
// Nombre, frase y color: los de EXTRA si existen; si no (producto nuevo en Shopify), se sacan del título de la tienda
function info(p) {
  if (EXTRA[p.handle]) return EXTRA[p.handle];
  const [a, b] = p.titulo.split(/\s+[–-]\s+/);
  return { nombre: a.replace(/\s*(JumiHome|NOVA)\s*/g, " ").trim(), frase: b ? b.charAt(0).toUpperCase() + b.slice(1) + (/[.!?]$/.test(b) ? "" : ".") : "", color: "#f5c46b" };
}
async function cargarProductos() {
  let datos;
  try { const r = await fetch("/api/productos"); if (!r.ok) throw 0; datos = await r.json(); }
  catch { datos = await (await fetch("/data/productos.json")).json(); }
  // Qué productos salen y en qué orden lo decide Shopify (colección «Regalos de Navidad», orden manual):
  // si un producto se activa, se retira o se reordena en la tienda, esta web cambia sola.
  const pos = (h) => { const o = datos.orden || []; const i = o.indexOf(h); if (i >= 0) return i; const j = ORDEN.indexOf(h); return j >= 0 ? 500 + j : 900; };
  const lista = datos.productos.filter((p) => datos.fuente !== "shopify" ? EXTRA[p.handle] : true).sort((a, b) => pos(a.handle) - pos(b.handle));
  const rejilla = document.getElementById("rejilla");
  rejilla.innerHTML = "";
  lista.forEach((p) => rejilla.appendChild(tarjeta(p)));
  observar(rejilla.querySelectorAll(".tarjeta"));
  montarFiltros(rejilla);
  montarGuia(lista, rejilla);
  montarBuscador(lista);
  montarPacks(datos.productos);
}

function montarFiltros(rejilla) {
  const botones = document.querySelectorAll("#filtros button");
  botones.forEach((b) => b.addEventListener("click", () => {
    botones.forEach((x) => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll("#guia-lista button").forEach((x) => x.setAttribute("aria-pressed", "false"));
    rejilla.querySelectorAll(".tarjeta").forEach((t) => {
      const ok = b.dataset.cat === "todo" || (CATS[t.dataset.handle] || []).includes(b.dataset.cat);
      t.hidden = !ok;
    });
  }));
}

function montarPacks(productos) {
  const zona = document.getElementById("rejilla-packs");
  const porHandle = Object.fromEntries(productos.map((p) => [p.handle, p]));
  PACKS.forEach((pk) => {
    const items = pk.productos.map((h) => porHandle[h]).filter(Boolean);
    if (items.length !== pk.productos.length) return; // si falta alguno (agotado o retirado), no se enseña el pack
    const vars = items.map((p) => p.variantes.find((v) => v.disponible));
    if (vars.some((v) => !v)) return;
    const separado = vars.reduce((t, v) => t + Number(v.precio), 0);
    // igual que la caja de Shopify: el 10 % del total se redondea hacia abajo al céntimo (55,98 → 5,59 de descuento)
    const pack = (Math.round(separado * 100) - Math.floor(Math.round(separado * 100) * PACK_DTO)) / 100;
    const el = document.createElement("article");
    el.className = "pack aparece"; el.style.setProperty("--color", pk.color);
    el.innerHTML = `
      <div class="pack-fotos">${items.map((p) => `<img src="${p.fotos[0]}&width=500" alt="${EXTRA[p.handle] ? EXTRA[p.handle].nombre : p.titulo}" loading="lazy">`).join('<span class="mas">+</span>')}</div>
      <div class="pack-info">
        <span class="pack-emoji" aria-hidden="true">${pk.emoji}</span>
        <h3>${pk.nombre}</h3>
        <p class="frase">${pk.frase}</p>
        <p class="pack-lleva">${items.map((p) => EXTRA[p.handle] ? EXTRA[p.handle].nombre : p.titulo).join(" + ")}</p>
        <div class="precio"><b>${euros(pack)}</b><span class="separado">por separado ${euros(separado)}</span></div>
        <p class="ahorro">Ahorras ${euros(separado - pack)}</p>
        <a class="comprar" href="${TIENDA}/cart/${vars.map((v) => v.id + ":1").join(",")}?${UTM}&discount=${PACK_COD}">Comprar el pack</a>
        <a class="ver" href="${TIENDA}/collections/${pk.pagina}?${UTM}">Ver el pack en la tienda</a>
      </div>`;
    el.querySelector(".comprar").addEventListener("click", () => avisar(`Te llevamos a la caja… ${pk.nombre}`));
    zona.appendChild(el);
  });
  observar(zona.querySelectorAll(".pack"));
}

function tarjeta(p) {
  const ex = info(p);
  const el = document.createElement("article");
  el.className = "tarjeta aparece"; el.dataset.handle = p.handle; el.style.setProperty("--color", ex.color);
  const vs = p.variantes.filter((v) => v.disponible);
  let sel = vs[0];
  const urlFicha = `${TIENDA}/products/${p.handle}?${UTM}${window.novaCodigo && window.novaCodigo() ? `&discount=${window.novaCodigo()}` : ""}`;
  el.innerHTML = `
    <a class="foto" href="${urlFicha}" aria-label="Ver detalles de ${ex.nombre}"><span class="etiqueta">${vs.some((v) => v.antes) ? "Black Friday" : "Ideal para regalar"}</span>
      ${p.fotos.slice(0, 2).map((f, i) => `<img src="${f}&width=700" alt="${ex.nombre}${i ? " en uso" : ""}" loading="lazy">`).join("")}
    </a>
    <div class="info">
      <h3>${ex.nombre}</h3>
      <p class="frase">${ex.frase}</p>
      <div class="packs">${vs.length > 1 ? vs.map((v, i) => `<button type="button" aria-pressed="${i === 0}" data-i="${i}">${v.titulo}</button>`).join("") : ""}</div>
      <div class="precio"></div>
      <a class="comprar" target="_self">Comprar</a>
      <p class="garantias">🚚 Envío gratis · llega en 7–14 días<br>↩️ Devolución gratis 14 días · 🔒 PayPal, Klarna o tarjeta<br>💬 Atención en español en menos de 24 h</p>
      <a class="ver" href="${urlFicha}">Ver todos los detalles</a>
    </div>`;
  const precio = el.querySelector(".precio"), comprar = el.querySelector(".comprar");
  const pintar = () => {
    precio.innerHTML = `<b>${euros(sel.precio)}</b>${sel.antes ? `<s>${euros(sel.antes)}</s>` : ""}`;
    const cod = window.novaCodigo ? window.novaCodigo() : "";
    comprar.href = `${TIENDA}/cart/${sel.id}:1?${UTM}${cod ? `&discount=${cod}` : ""}`;
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
  const fuentes = [...ORDEN.map((h) => (EXTRA[h] || {}).video).filter(Boolean)];
  // orden aleatorio en cada visita (Fisher-Yates) para que no salgan siempre los mismos primero
  for (let i = fuentes.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [fuentes[i], fuentes[j]] = [fuentes[j], fuentes[i]]; }
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

/* ---------- 6. Guía de regalos por precio (precio "desde" real de cada producto) ---------- */
function montarGuia(lista, rejilla) {
  const zona = document.getElementById("guia-lista");
  const desde = (p) => Math.min(...p.variantes.filter((v) => v.disponible).map((v) => Number(v.precio)));
  const tramos = [
    { txt: "Menos de 20 €", ok: (n) => n < 20 },
    { txt: "De 20 a 30 €", ok: (n) => n >= 20 && n <= 30 },
    { txt: "Más de 30 €", ok: (n) => n > 30 },
  ];
  const botones = [];
  tramos.forEach((t) => {
    const hand = lista.filter((p) => isFinite(desde(p)) && t.ok(desde(p))).map((p) => p.handle);
    if (!hand.length) return;
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-pressed", "false");
    b.innerHTML = `<b>${t.txt}</b><span>${hand.length} ${hand.length === 1 ? "regalo" : "regalos"}</span>`;
    b.addEventListener("click", () => {
      const ya = b.getAttribute("aria-pressed") === "true";
      botones.forEach((x) => x.setAttribute("aria-pressed", "false"));
      document.querySelectorAll("#filtros button").forEach((x) => x.setAttribute("aria-pressed", ya ? x.dataset.cat === "todo" : "false"));
      if (!ya) b.setAttribute("aria-pressed", "true");
      rejilla.querySelectorAll(".tarjeta").forEach((c) => { c.hidden = !ya && !hand.includes(c.dataset.handle); });
      document.getElementById("productos").scrollIntoView({ behavior: quieto ? "auto" : "smooth" });
    });
    botones.push(b); zona.appendChild(b);
  });
  if (!botones.length) document.getElementById("guia").hidden = true;
}

/* ---------- 7. Plazo de Navidad: días que quedan para pedir (hasta el 7/12 incluido) ---------- */
(() => {
  const limite = new Date("2026-12-08T00:00:00+01:00"), el = document.getElementById("plazo-dias");
  const dias = Math.ceil((limite - Date.now()) / 86400000);
  el.textContent = dias > 1 ? `Te quedan ${dias} días para pedir.` : dias === 1 ? "Hoy es el último día para pedir." : "El plazo de Navidad ha terminado: el envío sigue siendo gratis y tarda 7–14 días.";
})();

/* ---------- 8. Botón fijo «Ver regalos» en móvil: sale al dejar la portada y se esconde sobre los productos ---------- */
(() => {
  const fijo = document.getElementById("fijo"); let fuera = false, dentro = false;
  const poner = () => { fijo.hidden = !(fuera && !dentro); };
  const o1 = new IntersectionObserver(([e]) => { fuera = !e.isIntersecting; poner(); }, { threshold: 0.1 });
  o1.observe(document.getElementById("portada"));
  const vis = new Set();
  const o2 = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target))); dentro = vis.size > 0; poner(); });
  o2.observe(document.getElementById("productos")); o2.observe(document.getElementById("packs"));
})();

/* ---------- 9. Buscador de regalos: 3 preguntas → los 3 regalos que mejor encajan ---------- */
// para: pareja, peques, mayores, amigo (amigo invisible), yo · gusto: relax, frio, curioso, navidad
const PERFIL = {
  "proyector-oceano-nova": [["pareja", "peques", "yo"], ["relax"]],
  "mini-medusa-nova": [["pareja", "peques", "amigo", "yo"], ["relax", "curioso"]],
  "barra-enfriadora-vino-nova": [["amigo", "mayores", "pareja"], ["navidad", "curioso"]],
  "proyector-nieve-nova": [["peques", "mayores", "amigo"], ["navidad", "relax"]],
  "luces-arbol-navidad-nova": [["mayores", "pareja", "yo"], ["navidad", "curioso"]],
  "linterna-frontal-nova": [["mayores", "amigo", "yo"], ["curioso"]],
  "soporte-sonido-bambu-nova": [["amigo", "mayores", "yo"], ["curioso"]],
  "difusor-llama-nova": [["pareja", "amigo", "yo"], ["relax"]],
  "calentador-tazas-nova": [["mayores", "amigo", "pareja"], ["frio"]],
  "lampara-cristal-nova": [["pareja", "yo"], ["relax"]],
  "lampara-atardecer-nova": [["pareja", "amigo", "yo"], ["relax"]],
  "lampara-inalambrica-nova": [["pareja", "mayores"], ["relax"]],
  "calentador-manos-nova": [["mayores", "pareja", "amigo"], ["frio"]],
  "despertador-proyector-nova": [["peques", "yo", "pareja"], ["curioso"]],
  "luces-sensor-nova": [["mayores", "yo"], ["curioso"]],
};
const PREGUNTAS = [
  { k: "para", t: "¿Para quién es?", o: [["pareja", "💞 Mi pareja"], ["peques", "🧸 Peques de la casa"], ["mayores", "👵 Padres o abuelos"], ["amigo", "🎁 Amigo invisible"], ["yo", "😌 Para mí"]] },
  { k: "gusto", t: "¿Qué le va más?", o: [["relax", "🕯️ Ambiente y relax"], ["frio", "🧤 Es friolero/a"], ["curioso", "🔧 Cacharros curiosos"], ["navidad", "🎄 La Navidad"]] },
  { k: "euros", t: "¿Cuánto quieres gastar?", o: [["20", "Hasta 20 €"], ["30", "Hasta 30 €"], ["99", "Me da igual"]] },
];
function montarBuscador(lista) {
  const caja = document.getElementById("bus-caja");
  const desde = (p) => Math.min(...p.variantes.filter((v) => v.disponible).map((v) => Number(v.precio)));
  const disp = lista.filter((p) => PERFIL[p.handle] && isFinite(desde(p)));
  if (disp.length < 3) { document.getElementById("buscador").hidden = true; return; }
  let paso = 0; const r = {};
  const pintar = () => {
    if (paso < PREGUNTAS.length) {
      const q = PREGUNTAS[paso];
      caja.innerHTML = `<p class="bus-paso">Pregunta ${paso + 1} de ${PREGUNTAS.length}</p><h3>${q.t}</h3>
        <div class="bus-op">${q.o.map(([v, txt]) => `<button type="button" data-v="${v}">${txt}</button>`).join("")}</div>
        ${paso ? '<button type="button" class="bus-atras">← Atrás</button>' : ""}`;
      caja.querySelectorAll(".bus-op button").forEach((b) => b.addEventListener("click", () => { r[q.k] = b.dataset.v; paso++; pintar(); }));
      const at = caja.querySelector(".bus-atras"); if (at) at.addEventListener("click", () => { paso--; pintar(); });
      return;
    }
    const tope = Number(r.euros) === 99 ? Infinity : Number(r.euros);
    const nota = (p) => { const [pa, gu] = PERFIL[p.handle]; return (pa.includes(r.para) ? 2 : 0) + (gu.includes(r.gusto) ? 3 : 0) - ORDEN.indexOf(p.handle) / 100; };
    let cand = disp.filter((p) => desde(p) <= tope);
    if (cand.length < 3) cand = disp.slice().sort((a, b) => desde(a) - desde(b)).slice(0, Math.max(3, cand.length));
    const top = cand.sort((a, b) => nota(b) - nota(a)).slice(0, 3);
    caja.innerHTML = `<p class="bus-paso">Tus 3 regalos</p><h3>Esto le va a encantar</h3><div class="rejilla bus-res"></div>
      <button type="button" class="bus-atras">↺ Volver a empezar</button>`;
    const zona = caja.querySelector(".bus-res");
    top.forEach((p) => { const t = tarjeta(p); t.classList.add("visto"); zona.appendChild(t); });
    caja.querySelector(".bus-atras").addEventListener("click", () => { paso = 0; pintar(); });
    caja.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" });
  };
  pintar();
}
