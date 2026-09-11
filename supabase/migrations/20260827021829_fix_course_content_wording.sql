
update public.lessons
set body = jsonb_set(
  body,
  '{en}',
  to_jsonb(
    replace(
      body->>'en',
      '(course-media:u2-l1-02-malware-types.png)
, so let''s break down the main types.

**Viruses**',
      '(course-media:u2-l1-02-malware-types.png)

**Viruses**'
    )
  )
)
where id = 'ff344d49-dfe1-4b19-8c68-7cdf327e09af';

update public.assessment_questions
set choices = (
  select jsonb_agg(
    case when elem->>'id' = 'c'
      then jsonb_set(elem, '{text,en}', '"Surface web and dark web"')
      else elem
    end
    order by ord
  )
  from jsonb_array_elements(choices) with ordinality as t(elem, ord)
)
where kind = 'final_exam' and order_index = 26;
