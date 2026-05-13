import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Product, Artist, Testimonial } from "./types";

function client() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
}

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = client();
  const [{ data: products }, { data: testimonials }] = await Promise.all([
    supabase.from("products").select("*, artists(*)").order("featured", { ascending: false }).limit(12),
    supabase.from("testimonials").select("*").order("sort_order", { ascending: true }),
  ]);
  return {
    products: (products ?? []) as Product[],
    testimonials: (testimonials ?? []) as Testimonial[],
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
  return { artists: (data ?? []) as Artist[] };
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
    const subtotal = data.items.reduce((s, i) => s + i.price * i.qty, 0);
    const status = data.payment_method === "cod" ? "cod_pending" : "pending";
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        email: data.email,
        items: data.items,
        subtotal,
        shipping_address: data.shipping,
        payment_method: data.payment_method,
        payment_status: status,
      })
      .select("id")
      .single();
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const, orderId: order.id };
  });