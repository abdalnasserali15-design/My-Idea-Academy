
revoke select (correct_choice_id) on public.assessment_questions from anon, authenticated;

create table public.course_check_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null default current_date,
  check_count integer not null default 0,
  primary key (user_id, usage_date)
);
alter table public.course_check_usage enable row level security;
grant all on public.course_check_usage to service_role;

create or replace function public.check_and_increment_course_check_usage(p_user_id uuid, p_daily_limit integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.course_check_usage (user_id, usage_date, check_count)
  values (p_user_id, current_date, 1)
  on conflict (user_id, usage_date)
  do update set check_count = public.course_check_usage.check_count + 1
  returning check_count into v_count;

  return v_count <= p_daily_limit;
end;
$$;

revoke execute on function public.check_and_increment_course_check_usage(uuid, integer) from public, anon, authenticated;
grant execute on function public.check_and_increment_course_check_usage(uuid, integer) to service_role;
