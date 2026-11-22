# nova-web · nova.alvarodeveloper.es
Escaparate interactivo de NOVA (HTML + JS a mano, como el portfolio). El pago, pedidos, DSers y agentes siguen en Shopify:
- Precios en vivo: `api/productos.js` (función de Vercel, lee `tienda.alvarodeveloper.es/products.json`, caché 5 min). Si falla, usa `data/productos.json`.
- «Comprar» = enlace de carrito de Shopify `/cart/<variante>:1?utm_source=nova-web` → caja de Shopify. Las ventas se ven en Shopify con origen nova-web.
- Productos: la web enseña SOLA los productos activos de Shopify, en el orden manual de la colección `regalos-de-navidad` (lo devuelve `api/productos.js` como `orden`). Activar, retirar o reordenar en Shopify cambia esta web en ≤ 5 min. `EXTRA` (nombre corto, frase, color, vídeo), `CATS` y `PERFIL` en `app.js` son opcionales: sin ellos se usa el título de Shopify y el producto no sale en filtros ni en el buscador de regalos.
- Fin de Black Friday: `FIN_BF` en `app.js`, barra y textos de `index.html`.
Probar en local: `python3 -m http.server 4321` en esta carpeta.
