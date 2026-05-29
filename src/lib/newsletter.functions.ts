import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const schema = z.object({ email: z.string().trim().email().max(255) });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
    );
    const { error } = await supabase.from("newsletter").insert({ email: data.email.toLowerCase() });
    if (error && !error.message.includes("duplicate")) {
      console.error("[subscribeNewsletter] insert failed:", error);
      return { ok: false, error: "Unable to subscribe. Please try again." };
    }
    return { ok: true };
  });