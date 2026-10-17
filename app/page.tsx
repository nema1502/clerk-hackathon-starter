import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";

const features = [
  {
    href: "/dashboard",
    title: "Dashboard protegido",
    text: "Solo con sesión iniciada. Te saluda por tu nombre y muestra tu correo y rol con currentUser().",
  },
  {
    href: "/admin",
    title: "Panel admin por rol",
    text: "Lee el rol desde publicMetadata (vía session token). Si no eres admin, ves un 403 amigable.",
  },
  {
    href: "/equipo",
    title: "Equipos con Organizations",
    text: "<OrganizationSwitcher /> para crear equipos e invitar a tus compañeras y compañeros.",
  },
  {
    href: "/api/yo",
    title: "API protegida",
    text: "GET /api/yo responde tu userId en JSON, o 401 si no iniciaste sesión.",
  },
];

const steps = [
  { cmd: "Usa la plantilla", text: "Botón “Use this template” en GitHub, o clona el repo." },
  { cmd: "pnpm install", text: "Instala las dependencias." },
  { cmd: "pnpm dev", text: "Abre http://localhost:3000. ¡No necesitas claves para empezar!" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-6 pt-6">
        <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300">
          Plantilla · Next.js 16 + Clerk
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Tu hackatón empieza con el login ya resuelto.
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Una plantilla pequeña para que te enfoques en tu idea: inicio de sesión,
          rutas protegidas, roles, equipos y una API segura, listos con Clerk.
        </p>
        <div className="flex flex-wrap gap-3">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="cursor-pointer rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white hover:bg-violet-500">
                Crear mi cuenta
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white hover:bg-violet-500"
            >
              Ir a mi dashboard
            </Link>
          </Show>
          <a
            href="https://clerk.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-300 px-5 py-2.5 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Documentación de Clerk
          </a>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">¿Qué incluye?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-violet-400 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <code className="text-xs text-violet-600 dark:text-violet-400">{f.href}</code>
              <h3 className="mt-1 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{f.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Empieza en 3 pasos</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.cmd}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-sm text-zinc-500">Paso {i + 1}</span>
              <p className="mt-1 font-mono font-semibold">{s.cmd}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
