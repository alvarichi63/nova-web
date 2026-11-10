// Lee los productos en vivo de la tienda Shopify (products.json público) y los devuelve
// simplificados. Vercel guarda la respuesta 5 minutos. Si Shopify falla, la web usa data/productos.json.
const TIENDA = "https://tienda.alvarodeveloper.es";

export default async function handler(req, res) {
  try {
    const r = await fetch(`${TIENDA}/products.json?limit=50`, { headers: { "User-Agent": "nova-web/1.0" } });
    if (!r.ok) throw new Error("Shopify " + r.status);
    const { products } = await r.json();
    const lista = products.map((p) => ({
      handle: p.handle,
      titulo: p.title,
      fotos: p.images.slice(0, 3).map((i) => i.src),
      variantes: p.variants.map((v) => ({
        id: String(v.id),
        titulo: v.title,
        precio: v.price,
        antes: v.compare_at_price && Number(v.compare_at_price) > Number(v.price) ? v.compare_at_price : null,
        disponible: v.available !== false,
      })),
    }));
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
    res.status(200).json({ fuente: "shopify", productos: lista });
  } catch (e) {
    res.setHeader("Cache-Control", "s-maxage=60");
    res.status(502).json({ error: String(e.message || e) });
  }
}
