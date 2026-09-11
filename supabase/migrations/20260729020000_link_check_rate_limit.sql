
CREATE TABLE public.link_check_usage (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_date)
);
ALTER TABLE public.link_check_usage ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.link_check_usage TO service_role;

CREATE OR REPLACE FUNCTION public.check_and_increment_link_check_usage(p_user_id UUID, p_daily_limit INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO public.link_check_usage (user_id, usage_date, check_count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET check_count = public.link_check_usage.check_count + 1
  RETURNING check_count INTO v_count;

  RETURN v_count <= p_daily_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.check_and_increment_link_check_usage(UUID, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_and_increment_link_check_usage(UUID, INTEGER) TO service_role;
