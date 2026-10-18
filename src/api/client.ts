// All data calls live here. Swap mocks for real fetches against VITE_API_BASE_URL later.
export const API_BASE_URL: string = import.meta.env["VITE_API_BASE_URL"] ?? "";

export type AirdropStatus = {
  phase: "prelaunch";
  qualified: number;
  target: number;
  snapshotsTaken: number;
  totalSnapshots: number;
};

export async function getAirdropStatus(): Promise<AirdropStatus> {
  // Mock data. Replace with: fetch(`${API_BASE_URL}/airdrop/status`).then(r => r.json())
  return { phase: "prelaunch", qualified: 0, target: 1000, snapshotsTaken: 0, totalSnapshots: 7 };
}

export type CurveProgress = { phase: "prelaunch"; progress: number };
export type WalletEligibility = { status: "prelaunch" | "invalid"; message: string };

// MOCK ONLY: no chain requests or wallet connections. Real progress starts at launch.
export async function getCurveProgress(): Promise<CurveProgress> {
  return { phase: "prelaunch", progress: 0 };
}

// MOCK ONLY: syntax checking is not verification of an on-chain wallet or its holdings.
export async function checkWalletEligibility(address: string): Promise<WalletEligibility> {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address.trim())) {
    return { status: "invalid", message: "Enter a valid Solana wallet address." };
  }
  return { status: "prelaunch", message: "Starts at launch" };
}
