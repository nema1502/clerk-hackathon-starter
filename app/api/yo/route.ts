import { auth } from "@clerk/nextjs/server";

// GET /api/yo → { userId } con sesión; 401 sin sesión.
// Usamos auth() y no auth.protect() porque protect() responde 404 en las APIs.
export async function GET() {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    return Response.json(
      { error: "No autenticado: inicia sesión primero." },
      { status: 401 },
    );
  }

  return Response.json({ userId });
}
