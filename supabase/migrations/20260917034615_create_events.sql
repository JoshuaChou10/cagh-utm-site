create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tag text not null default 'Event',
  location text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_title_length check (char_length(title) between 1 and 160),
  constraint events_tag_length check (char_length(tag) between 1 and 40),
  constraint events_location_length check (char_length(location) between 1 and 160)
);

create table if not exists public.event_signups (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint event_signups_name_length check (char_length(name) between 1 and 120),
  constraint event_signups_email_length check (char_length(email) between 3 and 254)
);

create index if not exists events_starts_at_idx on public.events (starts_at);
create index if not exists event_signups_event_id_idx on public.event_signups (event_id);
create unique index if not exists event_signups_event_email_idx
  on public.event_signups (event_id, lower(email));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row execute procedure public.set_updated_at();

alter table public.events enable row level security;
alter table public.event_signups enable row level security;

drop policy if exists "Public can read events" on public.events;
create policy "Public can read events"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can sign up" on public.event_signups;
create policy "Anyone can sign up"
  on public.event_signups for insert
  to anon, authenticated
  with check (true);

grant usage on schema public to anon, authenticated;
grant select on table public.events to anon, authenticated;
grant insert on table public.event_signups to anon, authenticated;
