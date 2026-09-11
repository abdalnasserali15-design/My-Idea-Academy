
grant select on table public.courses to anon, authenticated;
grant select on table public.units to anon, authenticated;
grant select on table public.lessons to anon, authenticated;
grant select (id, kind, lesson_id, unit_id, course_id, prompt, choices, hint, order_index)
  on public.assessment_questions to anon, authenticated;
