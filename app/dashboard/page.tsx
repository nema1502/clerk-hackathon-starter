import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  // Sin sesión, auth.protect() redirige a la página de inicio de sesión.
  const { sessionClaims } = await auth.protect();
  const user = await currentUser();

  const name = user?.firstName ?? user?.username ?? "hacker";
  const email = user?.primaryEmailAddress?.emailAddress ?? "Sin correo";
  // Dos lugares donde vive el rol (ver README → Roles):
  const roleInMetadata = (user?.publicMetadata.role as string | undefined) ?? "sin rol";
  const roleInToken = sessionClaims?.metadata?.role ?? "sin rol";

  const rows = [
    { label: "Correo", value: email },
    { label: "Rol (publicMetadata)", value: roleInMetadata },
    { label: "Rol en el session token", value: roleInToken },
    { label: "userId", value: user?.id },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Hola, {name}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Esta página es privada: solo la ven personas con sesión iniciada.
        </p>
      </div>

      <dl className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:justify-between">
            <dt className="text-sm text-zinc-500">{row.label}</dt>
            <dd className="font-mono text-sm break-all">{row.value}</dd>
          </div>
        ))}
      </dl>

      {roleInMetadata !== roleInToken && (
        <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          Los roles no coinciden: agrega el claim <code>metadata</code> al session token
          (README → Roles) y vuelve a iniciar sesión.
        </p>
      )}
    </div>
  );
}
