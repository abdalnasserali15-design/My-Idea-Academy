
alter table public.certificates
  alter column topic_slug drop not null,
  add column course_id uuid references public.courses(id) on delete cascade,
  add constraint certificates_topic_xor_course_check check (
    (topic_slug is not null and course_id is null) or
    (topic_slug is null and course_id is not null)
  ),
  add constraint certificates_user_id_course_id_key unique (user_id, course_id);

drop function public.get_certificate_for_verification(uuid);

create function public.get_certificate_for_verification(p_cert_id uuid)
returns table(
  recipient_name text,
  topic_slug text,
  course_slug text,
  course_title jsonb,
  unit_titles jsonb,
  score integer,
  issued_at timestamptz
)
language sql
stable security definer
set search_path = public
as $$
  select
    c.recipient_name,
    c.topic_slug,
    co.slug,
    co.title,
    (
      select jsonb_agg(u.title order by u.order_index)
      from public.units u
      where u.course_id = c.course_id
    ),
    c.score,
    c.issued_at
  from public.certificates c
  left join public.courses co on co.id = c.course_id
  where c.id = p_cert_id;
$$;
