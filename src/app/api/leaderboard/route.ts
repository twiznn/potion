// app/api/traders/route.ts
import { traders } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ traders });
}
