import { useState, type FormEvent } from "react";
import { Check, ArrowUpRight, Camera, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkWalletEligibility, type AirdropStatus, type CurveProgress, type WalletEligibility } from "@/api/client";

export function SnapshotTracker({ status }: { status: AirdropStatus | null }) {
  return <div className="snapshot-tracker">
    <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold">Snapshot tracker</h3><span className="launch-label">Starts at launch</span></div>
    <ol className="snapshot-grid mt-5" aria-label="Seven daily snapshots">
      {Array.from({ length: status?.totalSnapshots ?? 7 }, (_, i) => {
        const complete = i < (status?.snapshotsTaken ?? 0);
        return <li className={`snapshot ${complete ? "complete" : ""}`} key={i} aria-label={`Snapshot ${i + 1}: ${complete ? "complete" : "pending"}`}><span>{complete ? <Check size={18} /> : <Camera size={18} />}</span><small>DAY {i + 1}</small></li>;
      })}
    </ol>
  </div>;
}

export function CurveTracker({ curve }: { curve: CurveProgress | null }) {
  return <div className="curve-tracker">
    <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-sm font-semibold">Bonding curve <ArrowUpRight size={16} className="text-neon-cyan" /></h3><span className="launch-label">Starts at launch</span></div>
    <div className="curve-track mt-4" role="progressbar" aria-label="Bonding curve progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={curve?.progress ?? 0} aria-valuetext="Starts at launch"><span ref={node => { if (node) node.style.transform = `scaleX(${(curve?.progress ?? 0) / 100})`; }} /></div>
    <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Launch</span><span>Graduation</span></div>
  </div>;
}

export function EligibilityChecker() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<WalletEligibility | null>(null);
  const [checking, setChecking] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setChecking(true);
    try { setResult(await checkWalletEligibility(address)); } finally { setChecking(false); }
  };
  return <form onSubmit={submit} className="eligibility-checker">
    <label htmlFor="wallet-address" className="block text-sm font-semibold">Check your wallet</label>
    <div className="mt-3 flex gap-2">
      <Input id="wallet-address" value={address} onChange={event => { setAddress(event.target.value); setResult(null); }} placeholder="Solana wallet address" autoComplete="off" spellCheck={false} className="h-12 min-w-0 flex-1 font-mono text-sm" aria-describedby="eligibility-result" required />
      <Button type="submit" variant="secondary" disabled={checking} className="h-12 px-4"><Search size={18} /><span>{checking ? "Checking…" : "Check"}</span></Button>
    </div>
    <p id="eligibility-result" className={`mt-3 min-h-5 text-sm ${result?.status === "invalid" ? "text-destructive" : "text-neon-cyan"}`} role="status">{result?.message ?? "Starts at launch"}</p>
  </form>;
}
