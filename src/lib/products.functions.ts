import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Product, Artist, Testimonial, JournalPost, PressMention } from "./types";

function client() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
}

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = client();
  const [{ data: products }, { data: testimonials }, { data: journal }, { data: press }] = await Promise.all([
    supabase.from("products").select("*, artists(*)").order("featured", { ascending: false }).limit(12),
    supabase.from("testimonials").select("*").order("sort_order", { ascending: true }),
    supabase.from("journal_posts").select("*").order("published_at", { ascending: false }).limit(3),
    supabase.from("press_mentions").select("*").order("sort_order", { ascending: true }),
  ]);
  return {
    products: (products ?? []) as Product[],
    testimonials: (testimonials ?? []) as Testimonial[],
    journal: (journal ?? []) as JournalPost[],
    press: (press ?? []) as PressMention[],
  };
});

export const getAllProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = client();
  const { data } = await supabase.from("products").select("*, artists(*)").order("created_at", { ascending: false });
  return { products: (data ?? []) as Product[] };
});

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const supabase = client();
    const { data: product } = await supabase
      .from("products")
      .select("*, artists(*)")
      .eq("slug", data.slug)
      .maybeSingle();
    return { product: (product ?? null) as Product | null };
  });

export const getArtists = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = client();
  const { data } = await supabase.from("artists").select("*").order("name");
  const { data: products } = await supabase.from("products").select("id, artist_id, images, title, category, slug");
  return {
    artists: (data ?? []) as Artist[],
    products: (products ?? []) as Pick<Product, "id" | "artist_id" | "images" | "title" | "category" | "slug">[],
  };
});

export const getArtist = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const supabase = client();
    const { data: artist } = await supabase.from("artists").select("*").eq("slug", data.slug).maybeSingle();
    const { data: works } = artist
      ? await supabase.from("products").select("*, artists(*)").eq("artist_id", artist.id)
      : { data: [] };
    return { artist: (artist ?? null) as Artist | null, works: (works ?? []) as Product[] };
  });

export const getRelatedWorks = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) =>
    z.object({ productId: z.string().uuid(), artistId: z.string().uuid().nullable() }).parse(d),
  )
  .handler(async ({ data }) => {
    const supabase = client();
    let q = supabase.from("products").select("*, artists(*)").neq("id", data.productId).limit(8);
    if (data.artistId) q = q.eq("artist_id", data.artistId);
    const { data: works } = await q;
    return { works: (works ?? []) as Product[] };
  });

export const getJournalPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = client();
  const { data } = await supabase.from("journal_posts").select("*").order("published_at", { ascending: false });
  return { posts: (data ?? []) as JournalPost[] };
});

export const getJournalPost = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().min(1).max(160) }).parse(d))
  .handler(async ({ data }) => {
    const supabase = client();
    const { data: post } = await supabase.from("journal_posts").select("*").eq("slug", data.slug).maybeSingle();
    return { post: (post ?? null) as JournalPost | null };
  });

const orderSchema = z.object({
  email: z.string().trim().email().max(255),
  shipping: z.object({
    name: z.string().min(1).max(120),
    line1: z.string().min(1).max(200),
    city: z.string().min(1).max(80),
    pincode: z.string().min(4).max(20),
    country: z.string().min(2).max(80),
  }),
  items: z.array(z.object({
    productId: z.string().uuid(),
    title: z.string().max(200),
    price: z.number().int().nonnegative(),
    qty: z.number().int().min(1).max(20),
    size: z.string().max(80).optional(),
  })).min(1).max(40),
  payment_method: z.enum(["stripe", "upi", "cod"]),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    const supabase = client();
    // SECURITY: Never trust client-supplied prices. Fetch from DB.
    const ids = data.items.map((i) => i.productId);
    const { data: dbProducts, error: priceErr } = await supabase
      .from("products")
      .select("id, price_inr, title, in_stock")
      .in("id", ids);
    if (priceErr || !dbProducts) {
      console.error("[placeOrder] price lookup failed:", priceErr);
      return { ok: false as const, error: "Unable to complete request. Please try again." };
    }
    const priceMap = new Map(dbProducts.map((p) => [p.id, p]));
    if (data.items.some((i) => !priceMap.has(i.productId) || priceMap.get(i.productId)!.in_stock === false)) {
      return { ok: false as const, error: "One or more items are unavailable." };
    }
    const verifiedItems = data.items.map((i) => {
      const p = priceMap.get(i.productId)!;
      return { productId: i.productId, title: p.title, price: p.price_inr, qty: i.qty, size: i.size };
    });
    const subtotal = verifiedItems.reduce((s, i) => s + i.price * i.qty, 0);
    const status = data.payment_method === "cod" ? "cod_pending" : "pending";
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        email: data.email,
        items: verifiedItems,
        subtotal,
        shipping_address: data.shipping,
        payment_method: data.payment_method,
        payment_status: status,
      })
      .select("id")
      .single();
    if (error) {
      console.error("[placeOrder] insert failed:", error);
      return { ok: false as const, error: "Unable to place order. Please try again." };
    }
    return { ok: true as const, orderId: order.id };
  });