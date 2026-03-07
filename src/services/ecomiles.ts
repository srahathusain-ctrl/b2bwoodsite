import { EcoMilesAccount } from "@/types";

const MOCK_ECO_MILES: EcoMilesAccount = {
  balance: 18_450,
  tier: "Gold",
  pointsToNextTier: 31_550,
  nextTier: "Platinum",
  ytdEarned: 6_200,
  redeemableValue: 1_845,
  history: [
    { date: "2025-03-10", description: "Order SW-2024-0892 (FireGuard FR-18)", points: 840, orderId: "SW-2024-0892" },
    { date: "2025-03-09", description: "Order SW-2024-0891 (MoistureSeal Plus)", points: 525, orderId: "SW-2024-0891" },
    { date: "2025-03-08", description: "Order SW-2024-0890 (Chipboard FSC)", points: 210, orderId: "SW-2024-0890" },
    { date: "2025-02-28", description: "Referral bonus — Intermetal FZCO", points: 500 },
    { date: "2025-02-20", description: "LEED project submission bonus", points: 1000 },
  ],
};

export async function getEcoMiles(): Promise<EcoMilesAccount> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_ECO_MILES;
}
