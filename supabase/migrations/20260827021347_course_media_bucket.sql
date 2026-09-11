
insert into storage.buckets (id, name, public)
values ('course-media', 'course-media', true)
on conflict (id) do nothing;

create policy "course media is publicly readable"
on storage.objects for select
to public
using (bucket_id = 'course-media');
