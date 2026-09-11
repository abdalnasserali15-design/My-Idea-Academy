
create table public.course_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  unit_id uuid references public.units(id) on delete cascade,
  kind text not null check (kind in ('unit_exam', 'final_exam')),
  score integer not null,
  total integer not null,
  percentage integer not null,
  passed boolean not null,
  created_at timestamptz not null default now()
);

alter table public.course_exam_attempts enable row level security;

create policy "Users read own exam attempts"
  on public.course_exam_attempts
  for select
  to authenticated
  using (auth.uid() = user_id);

create index course_exam_attempts_user_course_idx
  on public.course_exam_attempts (user_id, course_id);
