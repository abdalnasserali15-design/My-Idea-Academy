
alter table public.courses
  add column learning_summary jsonb;

alter table public.certificates
  add column learning_summary text;

update public.courses
set learning_summary = '{"en": "The student was able to proficiently identify phishing and social-engineering tactics, apply strong password and two-factor authentication practices, recognize common malware and network attacks, and implement foundational defense-in-depth and incident-response principles."}'::jsonb
where slug = 'introduction-to-cybersecurity';

update public.courses
set learning_summary = '{"en": "The student was able to proficiently apply advanced network, cloud, and application security practices, conduct penetration testing and digital forensics fundamentals, and align security operations with governance, risk, and compliance frameworks across modern enterprise environments."}'::jsonb
where slug = 'beyond-the-introduction-to-cybersecurity';

drop function public.get_certificate_for_verification(uuid);

create function public.get_certificate_for_verification(p_cert_id uuid)
returns table(
  recipient_name text,
  topic_slug text,
  course_slug text,
  course_title jsonb,
  learning_summary text,
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
    c.learning_summary,
    c.score,
    c.issued_at
  from public.certificates c
  left join public.courses co on co.id = c.course_id
  where c.id = p_cert_id;
$$;
