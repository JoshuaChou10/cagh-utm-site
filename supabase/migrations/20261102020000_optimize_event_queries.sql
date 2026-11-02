create index if not exists events_ends_at_idx on public.events (ends_at);

drop index if exists public.event_signups_event_id_idx;
