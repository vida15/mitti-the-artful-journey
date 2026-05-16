CREATE TABLE public.journal_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body text,
  cover_url text,
  author text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journal public read" ON public.journal_posts FOR SELECT USING (true);

CREATE TABLE public.press_mentions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  publication text NOT NULL,
  quote text,
  url text,
  logo_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.press_mentions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "press public read" ON public.press_mentions FOR SELECT USING (true);

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS year integer;