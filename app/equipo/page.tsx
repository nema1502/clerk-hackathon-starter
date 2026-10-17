import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function EquipoPage() {
  // orgId/orgSlug/orgRole describen el equipo (Organization) activo.
  const { orgId, orgSlug, orgRole } = await auth.protect();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Tu equipo</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Crea un equipo para tu hackatón, invita a tus compañeras y compañeros por correo y
          cambia entre equipos.
        </p>
      </div>

      {/* Fondo claro para que el componente se lea bien también en modo oscuro */}
      <div className="w-fit rounded-xl border border-zinc-200 bg-white p-3">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/equipo"
          afterSelectOrganizationUrl="/equipo"
        />
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {orgId ? (
          <>
            Equipo activo: <code>{orgSlug ?? orgId}</code> · tu rol: <code>{orgRole}</code>
          </>
        ) : (
          "Estás usando tu cuenta personal. Crea o elige un equipo arriba."
        )}
      </p>

      <p className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        ¿No ves el selector de equipos? Activa <strong>Organizations</strong> en el Dashboard
        de Clerk, o ejecuta <code>pnpm dlx clerk@latest enable orgs</code>. Detalles en el
        README.
      </p>
    </div>
  );
}
