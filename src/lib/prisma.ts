import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only initialize PrismaClient when PRISMA_DATABASE_URL is provided.
// In development environments we may not have a database available (local dev without docker).
// Other modules check `if (prisma) { ... }` before using the client, so exporting `undefined`
// when the env var is missing is safe and prevents Prisma initialization errors.
let _prisma: PrismaClient | undefined = undefined;
if (process.env.PRISMA_DATABASE_URL) {
  _prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;
} else {
  // eslint-disable-next-line no-console
  console.warn("PRISMA_DATABASE_URL is not set — Prisma client will not be initialized.");
}

// Export as `any` so callers don't need to change their call sites while we
// gracefully handle missing DB in development. Callers should still check
// `if (prisma)` before performing DB operations in production-safe code.
export const prisma: any = _prisma;


