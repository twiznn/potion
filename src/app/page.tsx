"use client"

import { Share2, Search, SlidersHorizontal, Triangle, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useEffect, useState } from "react"
import { FaCopy } from "react-icons/fa"
import { SiSolana } from "react-icons/si"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"

interface Stats {
  tokens: number
  winRate: number
  trades: { won: number; lost: number }
  avgBuy: { value: number; usd: number }
  avgEntry: string
  avgHold: string
  realizedPnl: { value: number; usd: number }
  roi: number
  totalInvested: { value: number; usd: number }
}

interface Trader {
  positionsOpen: number
  rank: number
  name: string
  avatar: string
  wallet: string
  followers: string
  twitter: string
  daily: Stats
  weekly: Stats
  monthly: Stats
  allTime: Stats
  verified: boolean
  isFollowed: boolean
}

type Timeframe = "daily" | "weekly" | "monthly" | "allTime"

export default function LeaderboardPage() {
  const [traders, setTraders] = useState<Trader[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("daily")
  const [sortColumn, setSortColumn] = useState<string>("rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const { toast } = useToast()
  const [minTokens, setMinTokens] = useState(0)
  const [maxTokens, setMaxTokens] = useState(5000)
  const [minWinRate, setMinWinRate] = useState(0)
  const [maxWinRate, setMaxWinRate] = useState(100)
  const [minTrades, setMinTrades] = useState(0)
  const [maxTrades, setMaxTrades] = useState(5000)
  const [activeTab, setActiveTab] = useState("traders")

  useEffect(() => {
    async function fetchTraders() {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()
        setTraders(data.traders)
      } catch (error) {
        console.error("Failed to fetch traders:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTraders()
  }, [])

  const copyWalletAddress = (wallet: string) => {
    navigator.clipboard
      .writeText(wallet)
      .then(() => {
        toast({
          title: "Wallet address copied",
          description: "The wallet address has been copied to your clipboard.",
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast({
          title: "Failed to copy",
          description: "An error occurred while copying the wallet address.",
          variant: "destructive",
        })
      })
  }

  const filteredTraders = traders.filter(
    (trader) =>
      (trader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trader.wallet.toLowerCase().includes(searchQuery.toLowerCase())) &&
      trader[activeTimeframe].tokens >= minTokens &&
      trader[activeTimeframe].tokens <= maxTokens &&
      trader[activeTimeframe].winRate >= minWinRate &&
      trader[activeTimeframe].winRate <= maxWinRate &&
      trader[activeTimeframe].trades.won + trader[activeTimeframe].trades.lost >= minTrades &&
      trader[activeTimeframe].trades.won + trader[activeTimeframe].trades.lost <= maxTrades,
  )

  const sortTraders = (traders: Trader[]) => {
    return [...traders].sort((a, b) => {
      const aValue = getNestedValue(a, sortColumn)
      const bValue = getNestedValue(b, sortColumn)

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj)
  }

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedTraders = sortTraders(filteredTraders)

  const resetFilters = () => {
    setMinTokens(0)
    setMaxTokens(1000)
    setMinWinRate(0)
    setMaxWinRate(100)
    setMinTrades(0)
    setMaxTrades(1000)
  }

  return (
    <div className="min-h-screen bg-[#0D0B16] text-white">
      

      <main className="py-6 px-8">
        {loading ? (
          <motion.div
            className="flex justify-center items-center h-[calc(100vh-100px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-t-4 border-[#B341F9] rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header with Tabs */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {/* Traders / Groups Tabs */}
                <Tabs defaultValue="traders" onValueChange={(value) => setActiveTab(value)}>
                  <TabsList className="bg-transparent">
                    <TabsTrigger
                      value="traders"
                      className="px-8 py-3 rounded-full text-lg data-[state=active]:bg-transparent data-[state=active]:text-[#B341F9] data-[state=active]:border-[#B341F9] data-[state=active]:border transition-all duration-300 ease-in-out"
                    >
                      Traders
                    </TabsTrigger>
                    <TabsTrigger
                      value="groups"
                      className="px-8 py-3 rounded-full text-lg data-[state=active]:bg-transparent data-[state=active]:text-[#B341F9] data-[state=active]:border-[#B341F9] data-[state=active]:border transition-all duration-300 ease-in-out"
                    >
                      Groups
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Timeframe Tabs */}
                <Tabs
                  value={activeTimeframe === "allTime" ? "all-time" : activeTimeframe}
                  onValueChange={(value) => setActiveTimeframe(value === "all-time" ? "allTime" : (value as Timeframe))}
                  className="ml-4"
                >
                  <TabsList className="bg-transparent space-x-2">
                    <TabsTrigger
                      value="daily"
                      className="px-6 py-2 rounded-full text-base data-[state=active]:bg-transparent data-[state=active]:text-[#B341F9] data-[state=active]:border-[#B341F9] data-[state=active]:border transition-all duration-300 ease-in-out"
                    >
                      Daily
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      className="px-6 py-2 rounded-full text-base data-[state=active]:bg-transparent data-[state=active]:text-[#B341F9] data-[state=active]:border-[#B341F9] data-[state=active]:border transition-all duration-300 ease-in-out"
                    >
                      Weekly
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      className="px-6 py-2 rounded-full text-base data-[state=active]:bg-transparent data-[state=active]:text-[#B341F9] data-[state=active]:border-[#B341F9] data-[state=active]:border transition-all duration-300 ease-in-out"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="all-time"
                      className="px-6 py-2 rounded-full text-base data-[state=active]:bg-transparent data-[state=active]:text-[#B341F9] data-[state=active]:border-[#B341F9] data-[state=active]:border transition-all duration-300 ease-in-out"
                    >
                      All-Time
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Search & Filters */}
              <div className="flex">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name or wallet"
                    className="pl-10 bg-[#1A1726] border-gray-800 text-white placeholder:text-gray-400 text-base h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="ml-2 bg-[#1A1726] border-gray-800 text-white hover:text-[#B341F9] h-12 w-12 rounded-lg"
                    >
                      <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-[#1A1726] text-white">
                    <DrawerHeader>
                      <div className="flex justify-between items-center">
                        <DrawerTitle className="text-white text-2xl">Filters</DrawerTitle>
                        <DrawerClose asChild>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </DrawerClose>
                      </div>
                      <DrawerDescription className="text-gray-400">Refine your search</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tokens</label>
                        <Slider
                          min={0}
                          max={1000}
                          step={10}
                          value={[minTokens, maxTokens]}
                          onValueChange={([min, max]) => {
                            setMinTokens(min)
                            setMaxTokens(max)
                          }}
                          className="mt-2"
                        />
                        <div className="flex justify-between mt-1 text-sm text-gray-400">
                          <span>{minTokens}</span>
                          <span>{maxTokens}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Win Rate (%)</label>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[minWinRate, maxWinRate]}
                          onValueChange={([min, max]) => {
                            setMinWinRate(min)
                            setMaxWinRate(max)
                          }}
                          className="mt-2"
                        />
                        <div className="flex justify-between mt-1 text-sm text-gray-400">
                          <span>{minWinRate}%</span>
                          <span>{maxWinRate}%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Trades</label>
                        <Slider
                          min={0}
                          max={1000}
                          step={10}
                          value={[minTrades, maxTrades]}
                          onValueChange={([min, max]) => {
                            setMinTrades(min)
                            setMaxTrades(max)
                          }}
                          className="mt-2"
                        />
                        <div className="flex justify-between mt-1 text-sm text-gray-400">
                          <span>{minTrades}</span>
                          <span>{maxTrades}</span>
                        </div>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button onClick={resetFilters} variant="outline" className="w-full mb-2 text-black">
                        Reset Filters
                      </Button>
                      <DrawerClose asChild>
                        <Button className="w-full">Apply Filters</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* Content Section */}
            {activeTab === "traders" ? (
              // Leaderboard Table for Traders
              <div className="overflow-x-auto rounded-lg bg-[#1A1726]">
                <table className="w-full table-auto border-collapse text-base">
                  <thead>
                    <tr className="border-b border-gray-800 text-left bg-[#2D2A3E]">
                      {[
                        { label: "Rank", key: "rank" },
                        { label: "Trader", key: "name" },
                        { label: "Followers", key: "followers" },
                        { label: "Tokens", key: `${activeTimeframe}.tokens` },
                        { label: "Win Rate", key: `${activeTimeframe}.winRate` },
                        { label: "Trades", key: `${activeTimeframe}.trades.won` },
                        {
                          label: "Avg Buy",
                          key: `${activeTimeframe}.avgBuy.value`,
                        },
                        {
                          label: "Avg Entry",
                          key: `${activeTimeframe}.avgEntry`,
                        },
                        { label: "Avg Hold", key: `${activeTimeframe}.avgHold` },
                        {
                          label: "Realized PNL",
                          key: `${activeTimeframe}.realizedPnl.value`,
                        },
                      ].map(({ label, key }) => (
                        <th key={key} className="p-4 font-bold text-white cursor-pointer" onClick={() => handleSort(key)}>
                          <div className="flex items-center">
                            {label}
                            <Triangle
                              fill={sortColumn === key ? "#FFA500" : "#B341F9"}
                              className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                                sortColumn === key ? (sortDirection === "asc" ? "transform rotate-180" : "") : ""
                              }`}
                            />
                          </div>
                        </th>
                      ))}
                      <th className="p-4 font-bold text-white">Share</th>
                    </tr>
                  </thead>
                  <AnimatePresence>
                    <motion.tbody
                      className="divide-y divide-gray-800"
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {sortedTraders.length > 0 ? (
                        sortedTraders.map((trader, index) => {
                          const stats = trader[activeTimeframe]
                          return (
                            <motion.tr
                              key={trader.rank}
                              className="hover:bg-[#232030] transition-colors font-semibold"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              layout
                            >
                              <td className="p-4">
                                {trader.rank === 1 ? (
                                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FFD700] text-black">
                                    {trader.rank}
                                  </span>
                                ) : trader.rank === 2 ? (
                                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C0C0C0] text-black">
                                    {trader.rank}
                                  </span>
                                ) : trader.rank === 3 ? (
                                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#CD7F32] text-black">
                                    {trader.rank}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-8 h-8 text-white">
                                    {trader.rank}
                                  </span>
                                )}
                              </td>
                              <td className="p-4">
                                <div className="block hover:bg-[#2D2A3E] rounded-lg transition-colors">
                                  <Link href={`/trader/${trader.wallet}`} className="flex items-center gap-3">
                                    <Image
                                      src={trader.avatar || "/placeholder.svg"}
                                      alt={trader.name}
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                    <div>
                                      <div className="font-bold text-white text-lg">{trader.name}</div>
                                      <div className="text-sm text-gray-400 flex items-center gap-1">
                                        {`${trader.wallet.slice(0, 6)}...${trader.wallet.slice(-4)}`}
                                      </div>
                                    </div>
                                  </Link>
                                  <FaCopy className="cursor-pointer ml-2" onClick={() => copyWalletAddress(trader.wallet)} />
                                </div>
                              </td>
                              <td className="p-4">
                                <div>
                                  <div className="font-bold text-white text-lg">{trader.followers}</div>
                                  <div className="text-sm text-gray-400">{trader.twitter}</div>
                                </div>
                              </td>
                              <td className="p-4 text-white text-lg">{stats.tokens}</td>
                              <td className="p-4 text-lg">
                                <span className={stats.winRate >= 50 ? "text-green-500" : "text-red-500"}>
                                  {stats.winRate}%
                                </span>
                              </td>
                              <td className="p-4 text-lg">
                                <span className="text-green-500">{stats.trades.won}</span>
                                <span className="text-gray-400">/</span>
                                <span className="text-red-500">{stats.trades.lost}</span>
                              </td>
                              <td className="p-4">
                                <div className="text-white font-bold text-lg flex items-center">
                                  {stats.avgBuy.value} <SiSolana className="ml-1" />
                                </div>
                                <div className="text-sm text-gray-400">${stats.avgBuy.usd}</div>
                              </td>
                              <td className="p-4 text-white text-lg">{stats.avgEntry}</td>
                              <td className="p-4 text-white text-lg">{stats.avgHold}</td>
                              <td className="p-4">
                                <div
                                  className={`${
                                    stats.realizedPnl.value >= 0 ? "text-green-500" : "text-red-500"
                                  } flex flex-col items-center`}
                                >
                                  <div className="font-bold text-lg flex items-center">
                                    {stats.realizedPnl.value >= 0 ? "+" : ""}
                                    {stats.realizedPnl.value} <SiSolana className="ml-1" />
                                  </div>
                                  <div className="text-sm text-gray-400">${stats.realizedPnl.usd}</div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Button variant="ghost" className="text-gray-400 hover:text-[#B341F9] transition-colors rounded-lg h-10 w-10">
                                  <Share2 className="h-5 w-5" />
                                </Button>
                              </td>
                            </motion.tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={11} className="text-center p-4">
                            No traders found.
                          </td>
                        </tr>
                      )}
                    </motion.tbody>
                  </AnimatePresence>
                </table>
              </div>
            ) : (
              // Modern, large "Coming soon" message with eyes emoji for Groups
              <motion.div
                className="flex justify-center items-center h-96"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-bold text-5xl text-center">
                  Coming soon 👀
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
