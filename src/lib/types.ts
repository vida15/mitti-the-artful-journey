export type Product = {
  id: string;
  slug: string;
  title: string;
  artist_id: string | null;
  medium: string | null;
  category: string;
  price_inr: number;
  description: string | null;
  story: string | null;
  images: string[];
  dimensions: string | null;
  sizes: { label: string; dim?: string }[];
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  artists?: Artist | null;
};

export type Artist = {
  id: string;
  slug: string;
  name: string;
  origin: string | null;
  bio: string | null;
  portrait_url: string | null;
  featured: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string | null;
  sort_order: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  artist: string;
  price: number;
  size?: string;
  frame?: string;
  qty: number;
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/** Solid-color SVG placeholder so the build is visually complete without art assets. */
export function placeholder(title: string, w = 800, h = 1000, hue = 0): string {
  const palette = [
    ["#1E1A16", "#3a2a18"],
    ["#221816", "#4a2a18"],
    ["#1A1612", "#5a3a20"],
    ["#1d1410", "#3d2418"],
    ["#15110d", "#2a1a10"],
  ];
  const [a, b] = palette[hue % palette.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${a}'/><stop offset='100%' stop-color='${b}'/>
    </linearGradient></defs>
    <rect width='${w}' height='${h}' fill='url(#g)'/>
    <text x='50%' y='95%' text-anchor='middle' font-family='Bebas Neue, sans-serif' font-size='${Math.round(w*0.04)}' fill='#7A6A58' opacity='0.5' letter-spacing='4'>${title.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function productImage(p: Pick<Product, "images" | "title" | "category">, w = 800, h = 1000): string {
  if (p.images && p.images.length > 0 && typeof p.images[0] === "string") return p.images[0];
  const hue =
    p.category === "paintings" ? 1 :
    p.category === "textiles" ? 2 :
    p.category === "ceramics" ? 0 :
    p.category === "objects" ? 3 :
    p.category === "jewelry" ? 4 : 0;
  return placeholder(p.title, w, h, hue);
}