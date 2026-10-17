export {};

// Roles de tu app. Agrega los que necesites (por ejemplo: "jurado", "mentora").
export type Roles = "admin" | "moderator";

declare global {
  // Le dice a TypeScript qué hay dentro del session token.
  // `metadata` existe solo si agregaste el claim en el Dashboard (ver README → Roles).
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: Roles;
    };
  }
}
