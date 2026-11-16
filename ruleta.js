/* Ruleta de descuento NOVA.
   Premios y probabilidades REALES (se publican en las bases):
   10 % → 65 %, 15 % → 20 %, 5 % → 12 %, 25 % → 3 %.
   Un giro por navegador. El código se guarda y se añade solo a los botones «Comprar». */
(() => {
  const PREMIOS = [
    { pct: 10, codigo: "RULETA10", prob: 0.65 },
    { pct: 15, codigo: "RULETA15", prob: 0.20 },
    { pct: 5, codigo: "RULETA5", prob: 0.12 },
    { pct: 25, codigo: "RULETA25", prob: 0.03 },
  ];
  // Casillas que se ven en la rueda (8). El premio se sortea con PREMIOS y la rueda para en una casilla de ese valor.
  const CASILLAS = [10, 15, 10, 5, 10, 25, 10, 15];
  const COLORES = ["#8b5cf6", "#2bd9f5", "#8b5cf6", "#ffd23f", "#8b5cf6", "#ff5c8a", "#8b5cf6", "#2bd9f5"];
  const CLAVE = "nova_ruleta";
  const VALIDO = "31 de diciembre de 2026";

  const leer = () => { try { return JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { return null; } };
  const guardar = (v) => { try { localStorage.setItem(CLAVE, JSON.stringify(v)); } catch (e) {} };

  // Código ganado → lo usan los enlaces de compra (app.js también lo consulta al pintar)
  window.novaCodigo = () => (leer() || {}).codigo || "";
  function aplicarAEnlaces() {
    const c = window.novaCodigo(); if (!c) return;
    document.querySelectorAll("a.comprar, a.ver").forEach((a) => {
      if (!a.href) return;
      const u = new URL(a.href); u.searchParams.set("discount", c); a.href = u.toString();
    });
  }
  window.novaAplicarCodigo = aplicarAEnlaces;

  function sortear() {
    let r = Math.random(), acc = 0;
    for (const p of PREMIOS) { acc += p.prob; if (r < acc) return p; }
    return PREMIOS[0];
  }

  const grados = 360 / CASILLAS.length;
  const fondo = CASILLAS.map((_, i) => `${COLORES[i]} ${i * grados}deg ${(i + 1) * grados}deg`).join(",");
  const etiquetas = CASILLAS.map((v, i) =>
    `<span style="transform:rotate(${i * grados + grados / 2}deg) translateY(calc(-1 * var(--r))) rotate(${-(i * grados + grados / 2)}deg)">${v}%</span>`).join("");

  const caja = document.createElement("div");
  caja.className = "ruleta-fondo"; caja.hidden = true;
  caja.innerHTML = `
    <div class="ruleta" role="dialog" aria-modal="true" aria-labelledby="ruleta-t">
      <button class="ruleta-cerrar" type="button" aria-label="Cerrar">✕</button>
      <h2 id="ruleta-t">Gira y gana un descuento</h2>
      <p class="ruleta-sub">Del 5 % al 25 % en toda la tienda. Un giro por persona.</p>
      <div class="ruleta-rueda-zona">
        <div class="ruleta-flecha" aria-hidden="true">▼</div>
        <div class="ruleta-rueda" style="background:conic-gradient(${fondo})">${etiquetas}<div class="ruleta-centro">NOVA</div></div>
      </div>
      <button class="ruleta-girar" type="button">Girar</button>
      <div class="ruleta-premio" aria-live="polite"></div>
      <details class="ruleta-bases"><summary>Bases y probabilidades</summary>
        <p>Organiza NOVA (tienda.alvarodeveloper.es). Premios y probabilidad de cada giro: 10 % de descuento (65 %), 15 % (20 %), 5 % (12 %) y 25 % (3 %).
        Un giro por persona y navegador. El código es de un solo uso por cliente, vale para cualquier producto hasta el ${VALIDO}, se aplica sobre el precio actual y no se combina con otros códigos de descuento. Gratis, sin compra obligatoria.</p>
      </details>
    </div>`;
  document.body.appendChild(caja);

  const boton = document.createElement("button");
  boton.className = "ruleta-boton"; boton.type = "button"; boton.textContent = "🎁 Gira la ruleta";
  document.body.appendChild(boton);

  const rueda = caja.querySelector(".ruleta-rueda"), girar = caja.querySelector(".ruleta-girar"), premio = caja.querySelector(".ruleta-premio");

  function mostrarGanado(g) {
    premio.innerHTML = `<b>¡${g.pct} % de descuento!</b><br>Tu código: <code>${g.codigo}</code><br><small>Se aplica solo al pulsar «Comprar». Válido hasta el ${VALIDO}.</small>
      <button class="ruleta-ir" type="button">Ver productos</button>`;
    premio.querySelector(".ruleta-ir").addEventListener("click", () => { cerrar(); document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" }); });
    girar.hidden = true;
    boton.textContent = `🎁 Tu código: ${g.codigo}`;
  }

  function abrir() { caja.hidden = false; void caja.offsetWidth; caja.classList.add("abierta"); }
  function cerrar() { caja.classList.remove("abierta"); setTimeout(() => (caja.hidden = true), 250); }

  girar.addEventListener("click", () => {
    if (leer()) return;
    const g = sortear();
    const opciones = CASILLAS.map((v, i) => (v === g.pct ? i : -1)).filter((i) => i >= 0);
    const i = opciones[Math.floor(Math.random() * opciones.length)];
    const destino = 360 * 6 + (360 - (i * grados + grados / 2)) + (Math.random() - 0.5) * grados * 0.6;
    girar.disabled = true;
    rueda.style.transform = `rotate(${destino}deg)`;
    const fin = () => {
      const ganado = { pct: g.pct, codigo: g.codigo, fecha: new Date().toISOString() };
      guardar(ganado); mostrarGanado(ganado); aplicarAEnlaces();
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) fin();
    else rueda.addEventListener("transitionend", fin, { once: true });
  });

  caja.querySelector(".ruleta-cerrar").addEventListener("click", cerrar);
  caja.addEventListener("click", (e) => { if (e.target === caja) cerrar(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !caja.hidden) cerrar(); });
  boton.addEventListener("click", abrir);

  const ya = leer();
  if (ya) { mostrarGanado(ya); aplicarAEnlaces(); }
  else {
    // Se abre sola una vez, a los 8 segundos
    let vista = false; try { vista = sessionStorage.getItem("nova_ruleta_vista"); } catch (e) {}
    if (!vista) setTimeout(() => { try { sessionStorage.setItem("nova_ruleta_vista", "1"); } catch (e) {} if (!leer()) abrir(); }, 8000);
  }
})();
