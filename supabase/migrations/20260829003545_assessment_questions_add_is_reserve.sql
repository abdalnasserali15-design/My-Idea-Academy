
alter table public.assessment_questions
  add column is_reserve boolean not null default false;
