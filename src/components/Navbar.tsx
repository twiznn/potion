import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-transparent py-6 px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Image src="/logo.png" alt="Potion Leaderboard Logo" className="w-auto h-auto" width={160} height={64} />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-lg">
            <Link href="#" className="font-bold text-white">
              Leaderboards
            </Link>
            <Link href="https://docs.potionleaderboard.com" className="font-bold text-gray-400 hover:text-white transition-colors">
              Learn
            </Link>
            <Link href="/prizes" className="font-bold text-gray-400 hover:text-white transition-colors">
              Prizes
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://x.com/potionalpha" className="text-gray-400 hover:text-white">
            <FaXTwitter className="h-6 w-6" />
          </Link>
          <Link href="http://discord.gg/potionalpha" className="text-gray-400 hover:text-white">
            <FaDiscord className="h-8 w-8" />
          </Link>
          <Image src="/demo.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
        </div>
      </div>
    </header>
  );
}
