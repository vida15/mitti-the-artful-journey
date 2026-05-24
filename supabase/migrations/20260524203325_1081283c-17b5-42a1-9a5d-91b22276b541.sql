
DROP POLICY IF EXISTS "orders public insert" ON public.orders;

CREATE POLICY "orders insert"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) <= 255
  AND (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  )
);
