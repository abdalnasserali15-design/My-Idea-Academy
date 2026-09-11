
alter table public.certificates
  add column unit_titles_snapshot text[];

drop function public.get_certificate_for_verification(uuid);

create function public.get_certificate_for_verification(p_cert_id uuid)
returns table(
  recipient_name text,
  topic_slug text,
  course_slug text,
  course_title jsonb,
  unit_titles text[],
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
    c.unit_titles_snapshot,
    c.score,
    c.issued_at
  from public.certificates c
  left join public.courses co on co.id = c.course_id
  where c.id = p_cert_id;
$$;
