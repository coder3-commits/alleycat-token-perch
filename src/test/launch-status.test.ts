import { describe, expect, it } from "vitest";
import { checkWalletEligibility, getAirdropStatus, getCurveProgress } from "@/api/client";

describe("mock-only launch status", () => {
  it("keeps all seven snapshots pending before launch", async () => {
    expect(await getAirdropStatus()).toMatchObject({ phase: "prelaunch", snapshotsTaken: 0, totalSnapshots: 7 });
  });
  it("does not invent curve progress before launch", async () => {
    expect(await getCurveProgress()).toEqual({ phase: "prelaunch", progress: 0 });
  });
  it("returns prelaunch rather than fabricated wallet eligibility", async () => {
    expect(await checkWalletEligibility("11111111111111111111111111111111")).toEqual({ status: "prelaunch", message: "Starts at launch" });
  });
  it("rejects malformed addresses without connecting a wallet", async () => {
    expect((await checkWalletEligibility("not-a-wallet")).status).toBe("invalid");
  });
});