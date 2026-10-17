# Clerk Hackathon Starter

Plantilla mínima de **Next.js 16 + Clerk** para hackatones, proyectos universitarios y eventos.
Trae listo lo aburrido (inicio de sesión, rutas protegidas, roles, equipos y una API segura)
para que dediques tu tiempo a tu idea.

> Hecho para el Clerk Workshop × Women Techmakers Santa Cruz

## ¿Qué incluye?

| Ruta | Qué muestra | Archivo |
| --- | --- | --- |
| `/` | Landing con botones de inicio de sesión y registro (o tu avatar con `<UserButton />`) | `app/page.tsx` |
| `/dashboard` | Solo con sesión. Te saluda por tu nombre (`currentUser()`) y muestra tu correo y rol | `app/dashboard/page.tsx` |
| `/admin` | Solo para el rol `admin` (leído del session token). Si no lo tienes, ves un 403 amigable | `app/admin/page.tsx` |
| `/equipo` | `<OrganizationSwitcher />` para crear equipos e invitar gente | `app/equipo/page.tsx` |
| `/api/yo` | API protegida: devuelve tu `userId` en JSON, o `401` sin sesión | `app/api/yo/route.ts` |
| `/sign-in`, `/sign-up` | Páginas de inicio de sesión y registro dentro de tu app | `app/sign-in`, `app/sign-up` |

Además: `proxy.ts` (el antiguo `middleware.ts` en Next.js 16) con `clerkMiddleware()`,
componentes de Clerk en español (`@clerk/localizations`) y Tailwind CSS con modo claro/oscuro.

## Inicio rápido (3 pasos)

Necesitas [Node.js 20.9 o superior](https://nodejs.org) y [pnpm](https://pnpm.io/installation)
(`npm install -g pnpm`).

1. **Usa la plantilla**: en GitHub, botón **Use this template** → **Create a new repository**.
   Luego clona tu repo: `git clone <URL-de-tu-repo>` y entra a la carpeta.
2. **Instala**: `pnpm install`
3. **Arranca**: `pnpm dev` y abre <http://localhost:3000>

¡No necesitas claves para empezar! La primera vez que corres `pnpm dev`, si no hay claves de Clerk,
el script `scripts/ensure-clerk-keys.mjs` usa el [CLI de Clerk](https://clerk.com/docs/cli)
para crear una **app temporal sin cuenta** (accountless) y guarda las claves de desarrollo en
`.env.local`. Crea tu primera cuenta con el botón **Crear cuenta** y listo.

> ¿Prefieres npm? `npm install` y `npm run dev` también funcionan.

## Claves de Clerk

Tienes dos caminos:

- **Automático (recomendado para empezar)**: `pnpm dev` crea las claves por ti (ver arriba).
  Para ver y configurar esa app en el [Dashboard de Clerk](https://dashboard.clerk.com),
  **reclámala** con tu cuenta (gratis):

  ```bash
  pnpm dlx clerk@latest auth login
  ```

  Inicia sesión o crea tu cuenta en el navegador y la app queda asociada a ti.

- **Tu propia app**: crea una aplicación en <https://dashboard.clerk.com>, copia `.env.example`
  como `.env.local` y reemplaza las claves por las de la página **API keys**.

Variables de entorno que usa la plantilla (ver `.env.example`):

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clave pública (`pk_test_...`). Puede ir al navegador. |
| `CLERK_SECRET_KEY` | Clave secreta (`sk_test_...`). **Nunca** la compartas ni la subas a GitHub. |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `..._SIGN_UP_URL` | Rutas de tus páginas `/sign-in` y `/sign-up`. |

> Nota: las versiones recientes de `@clerk/nextjs` (7.x) ya no arrancan sin claves (el antiguo
> "keyless mode" automático); ahora las claves temporales se crean con el CLI (`clerk init`),
> que es lo que hace `pnpm dev` aquí.
> `.env.local` y la carpeta `.clerk/` están en `.gitignore`: no se suben a GitHub.

## Activar Google y GitHub

1. En el Dashboard de Clerk, ve a **SSO connections**.
2. Elige **Add connection** → **For all users**.
3. Selecciona **Google** (repite para **GitHub**).

En desarrollo, Clerk usa credenciales OAuth compartidas: no necesitas configurar nada más.
En producción tendrás que poner tus propias credenciales (**Use custom credentials**).

## Roles (página `/admin`)

El rol se guarda en el `publicMetadata` de cada cuenta y viaja dentro del session token, así
el servidor lo lee sin llamadas extra a la API.

1. **Agrega el rol al session token**: Dashboard → **Sessions** → **Customize session token**.
   En el editor **Claims** pega esto y guarda (**Save**):

   ```json
   {
     "metadata": "{{user.public_metadata}}"
   }
   ```

2. **Date el rol de admin**: Dashboard → **Users** → tu cuenta → sección **User metadata** →
   **Public** → **Edit**, pega esto y guarda:

   ```json
   {
     "role": "admin"
   }
   ```

3. **Cierra sesión y vuelve a entrar** (o espera un minuto) para que tu token se actualice.
   Entra a `/admin`. En `/dashboard` puedes comparar el rol del metadata y el del token.

Los tipos de TypeScript del rol (`CustomJwtSessionClaims`) están en `types/globals.d.ts`.
Para agregar más roles (por ejemplo `"jurado"`), edita el tipo `Roles` en ese archivo.

## Equipos (página `/equipo`)

`<OrganizationSwitcher />` usa **Organizations** de Clerk, que viene apagado por defecto.
Actívalo con el CLI (funciona incluso antes de reclamar la app):

```bash
pnpm dlx clerk@latest enable orgs
```

O desde el Dashboard de Clerk, en la sección **Organizations**. Luego recarga `/equipo`:
podrás crear un equipo, invitar gente por correo y cambiar de equipo. En el servidor,
`auth()` te da `orgId`, `orgSlug` y `orgRole` del equipo activo.

## API protegida (`/api/yo`)

```bash
curl -i http://localhost:3000/api/yo
# HTTP/1.1 401 → {"error":"No autenticado: inicia sesión primero."}
```

Con sesión iniciada, abre <http://localhost:3000/api/yo> en el navegador y verás
`{"userId":"user_..."}`. Usa este patrón (`auth()` + `401`) en todas tus rutas de API.

## Deploy en Vercel

1. Sube tu repo a GitHub.
2. En <https://vercel.com/new> importa el repo (Vercel detecta Next.js solo).
3. En **Environment Variables** agrega `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`
   (las de tu `.env.local`) y las rutas `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` y
   `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`.
4. **Deploy**.

Las claves `pk_test_`/`sk_test_` (desarrollo) sirven para la demo de tu hackatón; reclama tu app
antes de usarlas fuera de tu compu. Para un lanzamiento real, crea una instancia de
**producción** en Clerk (necesitas un dominio propio) y usa las claves `pk_live_`/`sk_live_`.

## Ideas para tu hackatón o proyecto

- **Jurado y participantes**: roles `jurado` y `participante` en `publicMetadata`; una página
  `/evaluar` que solo ve el jurado (copia el patrón de `/admin`).
- **Proyecto de grado solo para tu universidad**: en el Dashboard, **Access mode** →
  **Enable allowlist** y agrega tu dominio institucional (ej. `miuniversidad.edu.bo`).
  Gratis en desarrollo; en producción requiere un plan pago.
- **Panel de evento**: `/admin` ya lista a las personas registradas; agrégale check-in,
  asistencia o exportar a CSV.
- **Equipos de hackatón**: cada equipo es una Organization; guarda el proyecto con el `orgId`
  para que todo el equipo lo vea.
- **Lista de espera** para tu lanzamiento con el componente `<Waitlist />` de Clerk.

## Solución de problemas

**"Clerk keys are missing from your environment"**
No hay claves en `.env.local`. Corre `pnpm dev` (las crea solo), o ejecuta
`pnpm dlx clerk@latest init --accountless`, o copia `.env.example` como `.env.local` con tus
claves. Después reinicia el servidor. En Vercel: revisa las Environment Variables y vuelve a
hacer deploy.

**`/admin` me muestra 403 aunque ya soy admin**
Falta el claim `metadata` en el session token (paso 1 de Roles) o tu token es viejo: cierra
sesión y vuelve a entrar. Revisa en `/dashboard` que "Rol en el session token" diga `admin`.

**No aparece el selector de equipos en `/equipo`**
Organizations está apagado. Corre `pnpm dlx clerk@latest enable orgs` y recarga la página.

## Estructura

```
app/
  page.tsx               Landing
  dashboard/page.tsx     Página protegida (cualquier sesión)
  admin/page.tsx         Página protegida por rol
  equipo/page.tsx        Equipos con Organizations
  api/yo/route.ts        API protegida
  sign-in/, sign-up/     Páginas de Clerk
components/site-header.tsx
proxy.ts                 clerkMiddleware()
types/globals.d.ts       Tipos del session token (roles)
scripts/ensure-clerk-keys.mjs
```

Documentación: [Clerk + Next.js](https://clerk.com/docs/nextjs/getting-started/quickstart) ·
[Roles con metadata](https://clerk.com/docs/guides/secure/basic-rbac) ·
[Organizations](https://clerk.com/docs/guides/organizations/overview)

---

Hecho para el Clerk Workshop × Women Techmakers Santa Cruz
