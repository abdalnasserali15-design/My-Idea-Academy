
insert into storage.buckets (id, name, public)
values ('tts-cache', 'tts-cache', true)
on conflict (id) do nothing;

create policy "tts cache is publicly readable"
on storage.objects for select
to public
using (bucket_id = 'tts-cache');
