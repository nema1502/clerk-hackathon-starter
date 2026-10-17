import { SignUp } from "@clerk/nextjs";

// Página de registro dentro de tu app (ruta: NEXT_PUBLIC_CLERK_SIGN_UP_URL).
export default function SignUpPage() {
  return (
    <div className="flex justify-center py-6">
      <SignUp />
    </div>
  );
}
