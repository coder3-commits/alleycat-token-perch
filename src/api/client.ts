// All data calls live here. Swap mocks for real fetches against VITE_API_BASE_URL later.
export const API_BASE_URL: string = import.meta.env["VITE_API_BASE_URL"] ?? "";

export type AirdropStatus = {
  qualified: number;
  target: number;
  snapshotsTaken: number;
  totalSnapshots: number;
};

export async function getAirdropStatus(): Promise<AirdropStatus> {
  // Mock data. Replace with: fetch(`${API_BASE_URL}/airdrop/status`).then(r => r.json())
  return { qualified: 0, target: 1000, snapshotsTaken: 0, totalSnapshots: 7 };
}
