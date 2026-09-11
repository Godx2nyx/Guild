import { createClient, type RedisClientType } from "redis";

let clientPromise: Promise<RedisClientType> | null = null;

async function redis() {
  if (!process.env.REDIS_URL) throw new Error("Missing REDIS_URL");
  if (!clientPromise) {
    const c = createClient({ url: process.env.REDIS_URL });
    c.on("error", (err) => console.error("Redis error", err));
    clientPromise = c.connect().then(() => c as RedisClientType);
  }
  return clientPromise;
}

export async function createRaw(id: string, code: string) {
  const r = await redis();
  // 7 วัน; เปลี่ยนเป็น 0 ถ้าต้องการเก็บถาวร
  await r.set(`pigraw:${id}`, code, { EX: 60 * 60 * 24 * 0 });
}

export async function getRaw(id: string) {
  const r = await redis();
  return await r.get(`pigraw:${id}`);
}
