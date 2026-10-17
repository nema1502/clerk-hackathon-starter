import { SignIn } from "@clerk/nextjs";

// Página de inicio de sesión dentro de tu app (ruta: NEXT_PUBLIC_CLERK_SIGN_IN_URL).
export default function SignInPage() {
  return (
    <div className="flex justify-center py-6">
      <SignIn />
    </div>
  );
}
