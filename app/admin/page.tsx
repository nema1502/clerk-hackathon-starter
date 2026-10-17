import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { sessionClaims } = await auth.protect();

  // El rol viaja dentro del session token: no hace falta otra llamada a la API.
  if (sessionClaims?.metadata?.role !== "admin") {
    return <Forbidden />;
  }

  // Ya sabemos que es admin: podemos usar la Backend API de Clerk.
  const client = await clerkClient();
  const { data: users, totalCount } = await client.users.getUserList({
    limit: 10,
    orderBy: "-created_at",
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Panel de admin</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {totalCount} personas registradas. Estas son las 10 más recientes:
        </p>
      </div>

      <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {users.map((u) => (
          <li key={u.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:justify-between">
            <span className="text-sm">
              {u.fullName ?? u.username ?? "Sin nombre"}{" "}
              <span className="text-zinc-500">{u.primaryEmailAddress?.emailAddress}</span>
            </span>
            <span className="font-mono text-sm text-violet-600 dark:text-violet-400">
              {(u.publicMetadata.role as string | undefined) ?? "sin rol"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Forbidden() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-10 text-center">
      <span className="font-mono text-6xl font-semibold text-violet-600">403</span>
      <h1 className="text-2xl font-semibold">Esta zona es solo para admins</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Tu cuenta no tiene el rol <code>admin</code>. Para dártelo, en el Dashboard de Clerk
        ve a <strong>Users</strong> → tu usuario → <strong>User metadata</strong> →{" "}
        <strong>Public</strong> y guarda <code>{`{"role": "admin"}`}</code>. Revisa también
        que el session token incluya el claim <code>metadata</code> (README → Roles).
      </p>
      <Link href="/dashboard" className="text-violet-600 hover:underline dark:text-violet-400">
        Volver a mi dashboard
      </Link>
    </div>
  );
}
