create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now(),
  constraint admins_email_length check (char_length(email) between 3 and 254)
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Admins can read admins" on public.admins;
create policy "Admins can read admins"
  on public.admins for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can insert admins" on public.admins;
create policy "Admins can insert admins"
  on public.admins for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can delete admins" on public.admins;
create policy "Admins can delete admins"
  on public.admins for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can insert events" on public.events;
create policy "Admins can insert events"
  on public.events for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update events" on public.events;
create policy "Admins can update events"
  on public.events for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete events" on public.events;
create policy "Admins can delete events"
  on public.events for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can read signups" on public.event_signups;
create policy "Admins can read signups"
  on public.event_signups for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can delete signups" on public.event_signups;
create policy "Admins can delete signups"
  on public.event_signups for delete
  to authenticated
  using (public.is_admin());

grant insert, update, delete on table public.events to authenticated;
grant select, delete on table public.event_signups to authenticated;
grant select, insert, delete on table public.admins to authenticated;

insert into public.admins (user_id, email)
select id, lower(email)
from auth.users
where email is not null
on conflict (user_id) do nothing;
