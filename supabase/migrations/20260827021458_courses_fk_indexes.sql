
create index if not exists units_course_id_idx on public.units(course_id);
create index if not exists lessons_unit_id_idx on public.lessons(unit_id);
create index if not exists assessment_questions_lesson_id_idx on public.assessment_questions(lesson_id);
create index if not exists assessment_questions_unit_id_idx on public.assessment_questions(unit_id);
create index if not exists assessment_questions_course_id_idx on public.assessment_questions(course_id);
