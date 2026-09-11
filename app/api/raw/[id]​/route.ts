import { NextResponse } from "next/server";
import { createRaw } from "@/lib/store";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = typeof body?.code === "string" ? body.code : "";
    if (!code.trim()) return NextResponse.json({error:"code ว่าง"}, {status:400});
    if (code.length > 500_000) return NextResponse.json({error:"code ใหญ่เกิน 500KB"}, {status:413});

    const id = crypto.randomBytes(16).toString("hex");
    await createRaw(id, code);
    const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    return NextResponse.json({id, url:`${base}/raw/${id}`});
  } catch {
    return NextResponse.json({error:"server error"}, {status:500});
  }
}
