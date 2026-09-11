
create table public.course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  last_lesson_id uuid not null references public.lessons(id) on delete cascade,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.course_progress enable row level security;

create policy "Users manage own course progress"
  on public.course_progress
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
