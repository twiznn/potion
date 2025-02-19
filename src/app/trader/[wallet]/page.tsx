import { traders } from "@/lib/mockData";
import TraderPageClient from "./TraderPageClient";

export async function generateStaticParams() {
  return traders.map((trader) => ({
    wallet: trader.wallet,
  }));
}

interface TraderPageProps {
  params: {
    wallet: string;
  };
}

export default function TraderPage({ params }: TraderPageProps) {
  // Simply render the client component, passing along the params.
  return <TraderPageClient params={params} />;
}
