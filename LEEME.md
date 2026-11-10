# nova-web · nova.alvarodeveloper.es
Escaparate interactivo de NOVA (HTML + JS a mano, como el portfolio). El pago, pedidos, DSers y agentes siguen en Shopify:
- Precios en vivo: `api/productos.js` (función de Vercel, lee `tienda.alvarodeveloper.es/products.json`, caché 5 min). Si falla, usa `data/productos.json`.
- «Comprar» = enlace de carrito de Shopify `/cart/<variante>:1?utm_source=nova-web` → caja de Shopify. Las ventas se ven en Shopify con origen nova-web.
- Productos nuevos: añadir su handle a `EXTRA` y `ORDEN` en `app.js` (nombre, frase, color, vídeo).
- Fin de Black Friday: `FIN_BF` en `app.js`, barra y textos de `index.html`.
Probar en local: `python3 -m http.server 4321` en esta carpeta.
