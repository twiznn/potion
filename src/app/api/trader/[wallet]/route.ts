// app/api/trader/[wallet]/route.ts
import { NextResponse } from "next/server";
import { trades } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: { wallet: string } }
) {
  if (!params.wallet) {
    return NextResponse.json({ error: "Missing wallet parameter" }, { status: 400 });
  }

  // Filter the trades for the given wallet
  const filteredTrades = trades.filter((trade) => trade.wallet === params.wallet);

  return NextResponse.json({ trades: filteredTrades });
}
