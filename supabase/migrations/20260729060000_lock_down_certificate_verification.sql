
DROP POLICY IF EXISTS "Certificates are publicly verifiable" ON public.certificates;

CREATE OR REPLACE FUNCTION public.get_certificate_for_verification(p_cert_id UUID)
RETURNS TABLE (recipient_name TEXT, topic_slug TEXT, score INTEGER, issued_at TIMESTAMPTZ)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.recipient_name, c.topic_slug, c.score, c.issued_at
  FROM public.certificates c
  WHERE c.id = p_cert_id;
$$;

REVOKE EXECUTE ON FUNCTION public.get_certificate_for_verification(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_certificate_for_verification(UUID) TO anon, authenticated;
