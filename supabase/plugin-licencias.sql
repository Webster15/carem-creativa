-- =============================================================================
--  LogoForge — licencias del plugin de Illustrator
--  Ejecutar en Supabase: SQL Editor > New query > pegar > Run
-- =============================================================================

create table if not exists public.licencias (
  clave         text primary key,
  correo        text        not null,
  herramientas  text[]      not null default '{}',
  producto      text        not null,
  referencia    text,
  transaccion   text unique,           -- evita emitir dos licencias por un pago
  monto_cop     integer,
  monto_usd     numeric(10,2),
  estado        text        not null default 'activa'
                check (estado in ('activa', 'anulada')),
  max_equipos   smallint    not null default 2,
  creada        timestamptz not null default now()
);

create index if not exists licencias_correo_idx on public.licencias (correo);
create index if not exists licencias_creada_idx on public.licencias (creada desc);

create table if not exists public.activaciones (
  clave   text        not null references public.licencias(clave) on delete cascade,
  huella  text        not null,
  creada  timestamptz not null default now(),
  primary key (clave, huella)
);

-- Nadie debe llegar a estas tablas desde el navegador: solo el servidor, con
-- la clave de servicio, que salta estas politicas. Se activa RLS sin crear
-- ninguna politica permisiva, de modo que la clave anonima no ve nada.
alter table public.licencias    enable row level security;
alter table public.activaciones enable row level security;

-- -----------------------------------------------------------------------------
--  Consultas utiles para el dia a dia
-- -----------------------------------------------------------------------------

-- Ventas de los ultimos 30 dias
--   select date_trunc('day', creada) as dia, producto, count(*), sum(monto_cop)
--   from licencias where creada > now() - interval '30 days'
--   group by 1, 2 order by 1 desc;

-- Buscar la licencia de un cliente que escribe a soporte
--   select clave, producto, herramientas, creada from licencias
--   where correo ilike '%buscado%';

-- Liberar todos los equipos de una clave (cliente que cambio de ordenador)
--   delete from activaciones where clave = 'LF-XXXX-XXXX-XXXX';

-- Anular una licencia por reembolso o fraude
--   update licencias set estado = 'anulada' where clave = 'LF-XXXX-XXXX-XXXX';
