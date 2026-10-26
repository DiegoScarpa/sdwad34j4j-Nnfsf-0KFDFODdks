create table if not exists public.lesson_projects (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  content jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists lesson_projects_user_updated_idx on public.lesson_projects(user_id, updated_at desc);
alter table public.lesson_projects enable row level security;
create policy "Users can read own lessons" on public.lesson_projects for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can insert own lessons" on public.lesson_projects for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update own lessons" on public.lesson_projects for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete own lessons" on public.lesson_projects for delete to authenticated using ((select auth.uid()) = user_id);
