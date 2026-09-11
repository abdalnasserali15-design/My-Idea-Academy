
DROP POLICY IF EXISTS "Users insert own attempts" ON public.quiz_attempts;
REVOKE INSERT ON public.quiz_attempts FROM authenticated;

DROP POLICY IF EXISTS "Users insert own certificates" ON public.certificates;
REVOKE INSERT ON public.certificates FROM authenticated;

DROP POLICY IF EXISTS "Users read own certificates" ON public.certificates;
CREATE POLICY "Certificates are publicly verifiable" ON public.certificates FOR SELECT USING (true);
GRANT SELECT ON public.certificates TO anon;

CREATE TABLE public.chat_usage (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_date)
);
ALTER TABLE public.chat_usage ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.chat_usage TO service_role;

CREATE OR REPLACE FUNCTION public.check_and_increment_chat_usage(p_user_id UUID, p_daily_limit INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO public.chat_usage (user_id, usage_date, message_count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET message_count = public.chat_usage.message_count + 1
  RETURNING message_count INTO v_count;

  RETURN v_count <= p_daily_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.check_and_increment_chat_usage(UUID, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_and_increment_chat_usage(UUID, INTEGER) TO service_role;
