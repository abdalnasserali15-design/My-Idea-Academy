
alter table public.courses
  add column topic_slug text
  constraint courses_topic_slug_check check (
    topic_slug in (
      'cybersecurity',
      'ai',
      'software-engineering',
      'networking',
      'ethical-hacking',
      'data-science',
      'cloud-computing',
      'operating-systems',
      'professional-skills'
    )
  );

update public.courses
set topic_slug = 'cybersecurity'
where slug in (
  'introduction-to-cybersecurity',
  'beyond-the-introduction-to-cybersecurity'
);
