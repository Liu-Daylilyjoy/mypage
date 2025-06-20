import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prismadb: PrismaClient | undefined
}

// 这样做是为了让Prisma实例在每次热更新时不重建
const client = globalForPrisma.prismadb || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismadb = client;
}

export default client;