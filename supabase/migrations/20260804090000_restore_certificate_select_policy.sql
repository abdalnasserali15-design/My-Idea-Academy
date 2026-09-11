
CREATE POLICY "Users read own certificates" ON public.certificates
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
