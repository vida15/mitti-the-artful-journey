
-- Fix orders: remove guest-order exposure via (user_id IS NULL) branch
DROP POLICY IF EXISTS "orders owner read" ON public.orders;

CREATE POLICY "orders owner read"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Fix newsletter: add unique constraint and tighten insert check
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_email_unique_idx
ON public.newsletter (lower(email));

DROP POLICY IF EXISTS "newsletter public insert" ON public.newsletter;

CREATE POLICY "newsletter public insert"
ON public.newsletter
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
