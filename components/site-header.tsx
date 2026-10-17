import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const navLink =
  "rounded-lg px-2.5 py-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-violet-600 text-white">
            C
          </span>
          <span className="hidden sm:inline">Hackathon Starter</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {/* <Show> reemplaza a <SignedIn>/<SignedOut> en la versión actual de Clerk */}
          <Show when="signed-in">
            <Link href="/dashboard" className={navLink}>
              Dashboard
            </Link>
            <Link href="/equipo" className={navLink}>
              Equipo
            </Link>
            <Link href="/admin" className={navLink}>
              Admin
            </Link>
            <div className="ml-2 flex">
              <UserButton />
            </div>
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className={`${navLink} cursor-pointer`}>Iniciar sesión</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="cursor-pointer rounded-lg bg-violet-600 px-3 py-1.5 font-medium text-white hover:bg-violet-500">
                Crear cuenta
              </button>
            </SignUpButton>
          </Show>
        </nav>
      </div>
    </header>
  );
}
