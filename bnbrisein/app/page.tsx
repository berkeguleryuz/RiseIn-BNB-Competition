"use client"
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import Nav from "@/components/Nav";

import { ThirdwebProvider } from "@thirdweb-dev/react";
const activeChain = "binance-testnet";

export default function Home() {
  return (
    <main className="w-full h-full">
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={activeChain}>
        <Nav />
        <HomePage />
        <Footer />
      </ThirdwebProvider>
    </main>
  );
}
