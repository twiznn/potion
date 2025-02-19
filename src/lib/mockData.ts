// utils/mockData.ts

// Trader Interface & Data
export interface Stats {
  tokens: number;
  winRate: number;
  trades: { won: number; lost: number };
  avgBuy: { value: number; usd: number };
  avgEntry: string;
  avgHold: string;
  realizedPnl: { value: number; usd: number };
  roi: number;
  totalInvested: { value: number; usd: number };
}

export interface Trader {
  positionsOpen: number;
  rank: number;
  name: string;
  avatar: string;
  wallet: string;
  followers: string;
  twitter: string;
  daily: Stats;
  weekly: Stats;
  monthly: Stats;
  allTime: Stats;
}

export const traders: Trader[] = [
  {
    positionsOpen: 5,
    rank: 1,
    name: "Orangie",
    avatar: "/demo.jpg",
    wallet: "F72vY99ihQsYwqEDCfz7igKXA5me6vN2zqVsVUTpw6qL",
    followers: "279K",
    twitter: "@orangie",
    daily: {
      tokens: 104,
      winRate: 74,
      trades: { won: 201, lost: 321 },
      avgBuy: { value: 10.2, usd: 2.346 },
      avgEntry: "$212K",
      avgHold: "32 m",
      realizedPnl: { value: 101.2, usd: 23.276 },
      roi: 15.2,
      totalInvested: { value: 500, usd: 115.23 },
    },
    weekly: {
      tokens: 150,
      winRate: 78,
      trades: { won: 250, lost: 300 },
      avgBuy: { value: 9.8, usd: 2.1 },
      avgEntry: "$210K",
      avgHold: "30 m",
      realizedPnl: { value: 120.5, usd: 25.5 },
      roi: 16.0,
      totalInvested: { value: 520, usd: 120.0 },
    },
    monthly: {
      tokens: 200,
      winRate: 80,
      trades: { won: 350, lost: 400 },
      avgBuy: { value: 10.0, usd: 2.2 },
      avgEntry: "$215K",
      avgHold: "35 m",
      realizedPnl: { value: 150.0, usd: 30.0 },
      roi: 18.0,
      totalInvested: { value: 600, usd: 130.0 },
    },
    allTime: {
      tokens: 500,
      winRate: 82,
      trades: { won: 900, lost: 1100 },
      avgBuy: { value: 10.5, usd: 2.5 },
      avgEntry: "$220K",
      avgHold: "40 m",
      realizedPnl: { value: 200.0, usd: 40.0 },
      roi: 20.0,
      totalInvested: { value: 800, usd: 150.0 },
    },
  },
  {
    positionsOpen: 3,
    rank: 2,
    name: "CryptoWhale",
    avatar: "/demo.jpg",
    wallet: "3faB7D9xK2ELm6NXwPa7MJEzGn2NKoRMhKLm9NXwPa7M",
    followers: "195K",
    twitter: "@cryptowhale",
    daily: {
      tokens: 87,
      winRate: 68,
      trades: { won: 168, lost: 245 },
      avgBuy: { value: 8.7, usd: 1.982 },
      avgEntry: "$180K",
      avgHold: "45 m",
      realizedPnl: { value: 92.5, usd: 19.876 },
      roi: 12.8,
      totalInvested: { value: 400, usd: 98.76 },
    },
    weekly: {
      tokens: 90,
      winRate: 70,
      trades: { won: 180, lost: 260 },
      avgBuy: { value: 8.8, usd: 2.0 },
      avgEntry: "$182K",
      avgHold: "47 m",
      realizedPnl: { value: 100.0, usd: 21.0 },
      roi: 13.5,
      totalInvested: { value: 420, usd: 102.0 },
    },
    monthly: {
      tokens: 100,
      winRate: 72,
      trades: { won: 210, lost: 290 },
      avgBuy: { value: 8.9, usd: 2.05 },
      avgEntry: "$185K",
      avgHold: "50 m",
      realizedPnl: { value: 110.0, usd: 22.5 },
      roi: 14.0,
      totalInvested: { value: 440, usd: 105.0 },
    },
    allTime: {
      tokens: 300,
      winRate: 75,
      trades: { won: 600, lost: 800 },
      avgBuy: { value: 9.0, usd: 2.1 },
      avgEntry: "$190K",
      avgHold: "55 m",
      realizedPnl: { value: 150.0, usd: 25.0 },
      roi: 15.0,
      totalInvested: { value: 500, usd: 110.0 },
    },
  },
  {
    positionsOpen: 4,
    rank: 3,
    name: "TraderPro",
    avatar: "/demo.jpg",
    wallet: "9xYz2A7BcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkL",
    followers: "142K",
    twitter: "@traderpro",
    daily: {
      tokens: 65,
      winRate: 71,
      trades: { won: 145, lost: 198 },
      avgBuy: { value: 9.1, usd: 2.123 },
      avgEntry: "$165K",
      avgHold: "28 m",
      realizedPnl: { value: 85.3, usd: 18.432 },
      roi: 14.5,
      totalInvested: { value: 450, usd: 104.56 },
    },
    weekly: {
      tokens: 70,
      winRate: 73,
      trades: { won: 150, lost: 210 },
      avgBuy: { value: 9.2, usd: 2.15 },
      avgEntry: "$167K",
      avgHold: "30 m",
      realizedPnl: { value: 90.0, usd: 19.0 },
      roi: 15.0,
      totalInvested: { value: 460, usd: 106.0 },
    },
    monthly: {
      tokens: 80,
      winRate: 74,
      trades: { won: 170, lost: 220 },
      avgBuy: { value: 9.3, usd: 2.2 },
      avgEntry: "$170K",
      avgHold: "32 m",
      realizedPnl: { value: 95.0, usd: 20.0 },
      roi: 15.5,
      totalInvested: { value: 470, usd: 108.0 },
    },
    allTime: {
      tokens: 250,
      winRate: 76,
      trades: { won: 400, lost: 500 },
      avgBuy: { value: 9.5, usd: 2.3 },
      avgEntry: "$175K",
      avgHold: "35 m",
      realizedPnl: { value: 120.0, usd: 22.0 },
      roi: 16.0,
      totalInvested: { value: 500, usd: 110.0 },
    },
  },
  {
    positionsOpen: 1,
    rank: 4,
    name: "RandomGuy420",
    avatar: "/demo.jpg",
    wallet: "5mNp8QrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbC",
    followers: "-",
    twitter: "-",
    daily: {
      tokens: 12,
      winRate: 12,
      trades: { won: 12, lost: 12 },
      avgBuy: { value: 0.01, usd: 2.32 },
      avgEntry: "$1.4M",
      avgHold: "5 h",
      realizedPnl: { value: -1.02, usd: 237.06 },
      roi: -0.5,
      totalInvested: { value: 10, usd: 2.32 },
    },
    weekly: {
      tokens: 15,
      winRate: 15,
      trades: { won: 15, lost: 15 },
      avgBuy: { value: 0.02, usd: 2.50 },
      avgEntry: "$1.42M",
      avgHold: "5.5 h",
      realizedPnl: { value: -0.9, usd: 230.0 },
      roi: -0.4,
      totalInvested: { value: 11, usd: 2.50 },
    },
    monthly: {
      tokens: 20,
      winRate: 18,
      trades: { won: 18, lost: 18 },
      avgBuy: { value: 0.03, usd: 2.60 },
      avgEntry: "$1.45M",
      avgHold: "6 h",
      realizedPnl: { value: -0.8, usd: 225.0 },
      roi: -0.3,
      totalInvested: { value: 12, usd: 2.60 },
    },
    allTime: {
      tokens: 50,
      winRate: 20,
      trades: { won: 50, lost: 50 },
      avgBuy: { value: 0.05, usd: 3.00 },
      avgEntry: "$1.5M",
      avgHold: "7 h",
      realizedPnl: { value: -0.5, usd: 220.0 },
      roi: -0.2,
      totalInvested: { value: 15, usd: 3.00 },
    },
  },
];


export interface Trade {
  token: string;
  icon: string;
  wallet: string;
  CA: string; // Contract Address of the token
  lastTrade: string;
  mc: string;
  tokens: { value: number; usd: number };
  invested: { value: number; usd: number };
  winRate: string;
  roi: string;
  trades: string;
  avgBuy: string;
  avgSell: string;
  averageHold: string;
  realizedPnl: { value: number; usd: number };
}

export const trades: Trade[] = [
  {
    token: "SOL",
    icon: "/demo.jpg",
    wallet: "F72vY99ihQsYwqEDCfz7igKXA5me6vN2zqVsVUTpw6qL",
    CA: "F72vY99ihQsYwqEDCfz7igKXA5me6vN2zqVsVUTpw6qL",
    lastTrade: "2 min",
    mc: "279K",
    tokens: { value: 10.2, usd: 2346 },
    invested: { value: 2346, usd: 2346 },
    winRate: "74%",
    roi: "15.2%",
    trades: "2/8",
    avgBuy: "$69K",
    avgSell: "$225K",
    averageHold: "3 min",
    realizedPnl: { value: 101.2, usd: 23276 },
  },
  {
    token: "BTC",
    icon: "/demo.jpg",
    wallet: "3faB7D9xK2ELm6NXwPa7MJEzGn2NKoRMhKLm9NXwPa7M",
    CA: "contract_address_btc",
    lastTrade: "5 min",
    mc: "195K",
    tokens: { value: 8.7, usd: 1982 },
    invested: { value: 1982, usd: 1982 },
    winRate: "68%",
    roi: "12.8%",
    trades: "3/7",
    avgBuy: "$65K",
    avgSell: "$215K",
    averageHold: "4 min",
    realizedPnl: { value: 92.5, usd: 19876 },
  },
  {
    token: "ETH",
    icon: "/demo.jpg",
    wallet: "9xYz2A7BcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkL",
    CA: "contract_address_eth",
    lastTrade: "10 min",
    mc: "142K",
    tokens: { value: 9.1, usd: 2123 },
    invested: { value: 2123, usd: 2123 },
    winRate: "71%",
    roi: "14.5%",
    trades: "4/8",
    avgBuy: "$80K",
    avgSell: "$200K",
    averageHold: "5 min",
    realizedPnl: { value: 85.3, usd: 18432 },
  },
  {
    token: "DOGE",
    icon: "/demo.jpg",
    wallet: "5mNp8QrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbC",
    CA: "contract_address_doge",
    lastTrade: "15 min",
    mc: "12K",
    tokens: { value: 0.01, usd: 2.32 },
    invested: { value: 2.32, usd: 2.32 },
    winRate: "12%",
    roi: "-0.5%",
    trades: "1/3",
    avgBuy: "$1K",
    avgSell: "$1.5K",
    averageHold: "20 min",
    realizedPnl: { value: -1.02, usd: 237.06 },
  },
];
