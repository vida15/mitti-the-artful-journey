
-- ARTISTS
create table public.artists (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  origin text,
  bio text,
  portrait_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.artists enable row level security;
create policy "artists public read" on public.artists for select using (true);

-- PRODUCTS
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  artist_id uuid references public.artists(id) on delete set null,
  medium text,
  category text not null,
  price_inr integer not null,
  description text,
  story text,
  images jsonb not null default '[]'::jsonb,
  dimensions text,
  sizes jsonb not null default '[]'::jsonb,
  in_stock boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "products public read" on public.products for select using (true);

-- TESTIMONIALS
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  location text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
create policy "testimonials public read" on public.testimonials for select using (true);

-- NEWSLETTER
create table public.newsletter (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);
alter table public.newsletter enable row level security;
create policy "newsletter public insert" on public.newsletter for insert with check (true);

-- ORDERS
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null,
  shipping_address jsonb,
  payment_method text not null,
  payment_status text not null default 'pending',
  stripe_session_id text,
  created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "orders public insert" on public.orders for insert with check (true);
create policy "orders owner read" on public.orders for select using (
  (auth.uid() is not null and auth.uid() = user_id) or user_id is null
);
