"use client";

import { useEffect, useState } from "react";
import { Share2, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { traders } from "@/lib/mockData";

import { FaCopy } from "react-icons/fa";

interface TraderPageClientProps {
  params: {
    wallet: string;
  };
}

export default function TraderPageClient({ params }: TraderPageClientProps) {
  // Compute trader (this is safe to do outside of hooks)
  const trader = traders.find((t) => t.wallet === params.wallet);

  // Call all hooks unconditionally.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "daily" | "weekly" | "monthly" | "allTime"
  >("daily");

  useEffect(() => {
    // Guard inside the effect instead of conditionally calling the hook.
    if (!trader) return;
    async function fetchTrades() {
      if (!trader) {
        setError("Trader not found");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/trader/${trader.wallet}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trades");
        }
        const data = await response.json();
        setTrades(data.trades);
      } catch (err) {
        console.error(err);
        setError("Error fetching trades");
      } finally {
        setLoading(false);
      }
    }
    fetchTrades();
  }, [trader]);

  // Now conditionally render after all hooks have been called.
  if (!trader) {
    return <div>Trader not found.</div>;
  }

  // Since trader exists, get the selected stats.
  const stats = trader[selectedTimeframe]!;

  return (
    <div className="min-h-screen bg-[#0D0B16] text-white">
      <main className="py-6 px-8">
        {/* Trader Top Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <Image
                src={trader.avatar || "/placeholder.svg"}
                alt={trader.name}
                width={160}
                height={160}
                className="rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold">{trader.name}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400">
                    {trader.wallet.slice(0, 6)}...{trader.wallet.slice(-6)}
                  </p>
                  <FaCopy
                    className="cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => navigator.clipboard.writeText(trader.wallet)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  Last refreshed seconds ago
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-[#B341F9]"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column: X Account and Last Trade */}
            <div className="flex flex-col gap-4 w-full md:w-1/4">
              <div className="bg-[#1A1726] rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">X Account</span>
                  <div className="text-right">
                    <p className="font-semibold">{trader.twitter}</p>
                    <p className="text-xs text-gray-400">
                      {trader.followers} followers
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1A1726] rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Last Trade</span>
                  <div className="text-right">
                    <p className="font-semibold">30 min ago</p>
                    <p className="text-green-500 text-xs">↑</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Timeframe Tabs and Stats Grid */}
            <div className="flex flex-col gap-4 w-full md:w-3/4">
              <div className="mb-4">
                <Tabs
                  value={selectedTimeframe}
                  onValueChange={(value) =>
                    setSelectedTimeframe(
                      value as "daily" | "weekly" | "monthly" | "allTime"
                    )
                  }
                >
                  <TabsList className="bg-transparent space-x-2">
                    <TabsTrigger
                      value="daily"
                      className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                    >
                      Daily
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                    >
                      Weekly
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="allTime"
                      className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                    >
                      All-Time
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tokens</span>
                    <span className="font-semibold text-white">
                      {stats.tokens}
                    </span>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="font-semibold text-green-500">
                      {stats.winRate}%
                    </span>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Trades</span>
                    <div>
                      <span className="text-green-500">{stats.trades.won}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-red-500">{stats.trades.lost}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Buy</span>
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        {stats.avgBuy.value}
                      </p>
                      <p className="text-xs text-gray-400">
                        ${stats.avgBuy.usd}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Entry</span>
                    <span className="font-semibold text-white">
                      {stats.avgEntry}
                    </span>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Hold</span>
                    <span className="font-semibold text-white">
                      {stats.avgHold}
                    </span>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Realized PNL</span>
                    <div className="text-right">
                      <p className="font-semibold text-green-500">
                        {stats.realizedPnl.value >= 0
                          ? `+${stats.realizedPnl.value}`
                          : stats.realizedPnl.value}
                      </p>
                      <p className="text-xs text-gray-400">
                        ${stats.realizedPnl.usd}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">ROI</span>
                    <span className="font-semibold text-green-500">
                      {stats.roi >= 0 ? `+${stats.roi}` : stats.roi}%
                    </span>
                  </div>
                </div>
                <div className="bg-[#1A1726] rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Invested</span>
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        {stats.totalInvested.value}
                      </p>
                      <p className="text-xs text-gray-400">
                        ${stats.totalInvested.usd}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trades Section */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <Tabs defaultValue="trades">
              <TabsList className="bg-transparent space-x-2">
                <TabsTrigger
                  value="trades"
                  className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                >
                  Trades
                </TabsTrigger>
                <TabsTrigger
                  value="tokens"
                  className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                >
                  Tokens
                </TabsTrigger>
                <TabsTrigger
                  value="groups"
                  className="px-5 py-2 rounded-full text-sm data-[state=active]:bg-[#2D2A3E] data-[state=active]:text-white"
                >
                  Groups
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex w-full md:w-auto">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by token or contract address"
                  className="pl-9 bg-[#1A1726] border-gray-800 text-white placeholder:text-gray-400 text-sm h-10"
                />
              </div>
              <Button
                variant="outline"
                className="ml-2 bg-[#1A1726] border-gray-800 text-white hover:text-[#B341F9] h-10 w-10 rounded-lg"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Trades Table */}
          {!loading && !error && (
            <div className="overflow-x-auto rounded-lg bg-[#1A1726]">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left bg-[#2D2A3E]">
                    <th className="p-3 font-bold text-[#B341F9]">Token</th>
                    <th className="p-3 font-bold text-[#B341F9]">Tokens</th>
                    <th className="p-3 font-bold text-[#B341F9]">Last Trade</th>
                    <th className="p-3 font-bold text-[#B341F9]">MC</th>
                    <th className="p-3 font-bold text-[#B341F9]">Invested</th>
                    <th className="p-3 font-bold text-[#B341F9]">Win Rate</th>
                    <th className="p-3 font-bold text-[#B341F9]">ROI</th>
                    <th className="p-3 font-bold text-[#B341F9]">Trades</th>
                    <th className="p-3 font-bold text-[#B341F9]">Avg Buy</th>
                    <th className="p-3 font-bold text-[#B341F9]">Avg Sell</th>
                    <th className="p-3 font-bold text-[#B341F9]">
                      Average Hold
                    </th>
                    <th className="p-3 font-bold text-[#B341F9]">
                      Realized PNL
                    </th>
                    <th className="p-3 font-bold text-[#B341F9]">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {trades.map((trade, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#232030] transition-colors font-semibold"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Image
                            src={trade.icon || "/placeholder.svg"}
                            alt={trade.token}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-bold text-white">
                              {trade.token}
                            </div>
                            <div className="text-xs text-gray-400">
                              {trade.CA}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-white font-bold">
                          {trade.tokens.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          ${trade.tokens.usd}
                        </div>
                      </td>
                      <td className="p-3 text-white">{trade.lastTrade}</td>
                      <td className="p-3 text-white">{trade.mc}</td>
                      <td className="p-3">
                        <div className="text-white font-bold">
                          {trade.invested.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          ${trade.invested.usd}
                        </div>
                      </td>
                      <td className="p-3 text-white">{trade.winRate}</td>
                      <td className="p-3 text-white">{trade.roi}</td>
                      <td className="p-3 text-white">{trade.trades}</td>
                      <td className="p-3 text-white">{trade.avgBuy}</td>
                      <td className="p-3 text-white">{trade.avgSell}</td>
                      <td className="p-3 text-white">{trade.averageHold}</td>
                      <td className="p-3">
                        <div className="text-green-500 font-bold">
                          {trade.realizedPnl.value >= 0
                            ? `+${trade.realizedPnl.value}`
                            : trade.realizedPnl.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          ${trade.realizedPnl.usd}
                        </div>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          className="text-gray-400 hover:text-[#B341F9] transition-colors rounded-lg h-8 w-8"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {error && (
            <div className="text-center py-4 text-red-500">{error}</div>
          )}
        </div>
      </main>
    </div>
  );
}
