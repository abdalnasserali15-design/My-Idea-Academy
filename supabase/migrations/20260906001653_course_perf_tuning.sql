
create index if not exists certificates_course_id_idx on public.certificates(course_id);
create index if not exists course_exam_attempts_course_id_idx on public.course_exam_attempts(course_id);
create index if not exists course_exam_attempts_unit_id_idx on public.course_exam_attempts(unit_id);
create index if not exists course_progress_course_id_idx on public.course_progress(course_id);
create index if not exists course_progress_last_lesson_id_idx on public.course_progress(last_lesson_id);

alter policy "Users read own certificates" on public.certificates
  using ((select auth.uid()) = user_id);

alter policy "Users read own exam attempts" on public.course_exam_attempts
  using ((select auth.uid()) = user_id);

alter policy "Users manage own course progress" on public.course_progress
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

alter policy "Users insert own profile" on public.profiles
  with check ((select auth.uid()) = id);

alter policy "Users read own profile" on public.profiles
  using ((select auth.uid()) = id);

alter policy "Users update own profile" on public.profiles
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

alter policy "Users read own attempts" on public.quiz_attempts
  using ((select auth.uid()) = user_id);
