INSERT INTO storage.buckets (id, name, public)
VALUES ('gallary', 'gallary', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Published gallery images are readable"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'gallary');

CREATE POLICY "Staff can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallary'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Staff can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallary'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);