import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAirdropStatus, type AirdropStatus } from "@/api/client";
import { AIRDROP, MINT_ADDRESS, TELEGRAM_URL } from "@/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "$ALLEYCAT — The street-smart Solana memecoin" },
      { name: "description", content: "$ALLEYCAT: a community memecoin on Solana. How to buy, holder airdrop rules, and Telegram." },
      { property: "og:title", content: "$ALLEYCAT — Street-smart memecoin" },
      { property: "og:description", content: "How to buy $ALLEYCAT and join the holder airdrop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function ContractBox() {
  const [copied, setCopied] = useState(false);
  if (!MINT_ADDRESS) return null;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MINT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">Contract address</p>
      <div className="mt-2 flex items-center gap-2">
        <code className="min-w-0 flex-1 break-all font-mono text-sm">{MINT_ADDRESS}</code>
        <button onClick={copy} className="min-h-12 shrink-0 rounded-lg bg-secondary px-4 font-semibold text-secondary-foreground">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function TgButton({ className = "" }: { className?: string }) {
  return (
    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-6 text-lg font-bold text-primary-foreground ${className}`}>
      Join our Telegram
    </a>
  );
}

const steps = [
  ["Get a wallet", "Install a Solana wallet such as Phantom or Solflare."],
  ["Add SOL", "Get SOL and send it to your wallet."],
  ["Find the token", "Open pump.fun or PumpSwap and paste the contract address."],
  ["Buy", "Buy $ALLEYCAT."],
];

function Index() {
  const [status, setStatus] = useState<AirdropStatus | null>(null);
  useEffect(() => { getAirdropStatus().then(setStatus).catch(() => {}); }, []);

  const rules = [
    ["Minimum hold", `${AIRDROP.minHold} tokens`],
    ["Snapshots", "One random snapshot per day for 7 days"],
    ["How to qualify", "Hold the minimum in at least 5 of 7 snapshots"],
    ["Per-wallet cap", AIRDROP.perWalletCap],
    ["Excluded", "Dev, team and liquidity addresses"],
  ];

  return (
    <main className="mx-auto max-w-xl px-5">
      <section className="pt-12 pb-10">
        <p className="font-mono text-sm font-bold text-primary">$ALLEYCAT</p>
        <h1 className="mt-2 text-4xl font-black leading-tight">Born in the alley. Raised by the street.</h1>
        <p className="mt-3 text-lg text-muted-foreground">A scrappy community memecoin on Solana. No suits, just cats.</p>
        <TgButton className="mt-6 w-full sm:w-auto" />
        <ContractBox />
        <div id="scene-3d" aria-hidden="true" className="mt-8 aspect-square w-full" />
      </section>

      <section className="py-10 border-t border-border">
        <h2 className="text-2xl font-extrabold">How to buy</h2>
        <ol className="mt-5 space-y-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-xl bg-card p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-black text-primary-foreground">{i + 1}</span>
              <div><p className="font-bold">{t}</p><p className="text-muted-foreground">{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-10 border-t border-border">
        <h2 className="text-2xl font-extrabold">Holder airdrop</h2>
        <table className="mt-5 w-full overflow-hidden rounded-xl bg-card text-left">
          <tbody>
            {rules.map(([k, v]) => (
              <tr key={k} className="border-b border-border last:border-0">
                <th scope="row" className="w-2/5 p-4 align-top font-semibold text-muted-foreground">{k}</th>
                <td className="p-4">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 rounded-xl border border-primary p-4 text-center text-lg font-bold" aria-live="polite">
          {status ? `${status.qualified.toLocaleString()} of ${status.target.toLocaleString()} wallets qualified` : "Loading…"}
        </p>
      </section>

      <footer className="py-10 border-t border-border text-center">
        <TgButton className="w-full sm:w-auto" />
        <p className="mt-6 text-sm text-muted-foreground">
          Not financial advice. Memecoins are highly risky and prices can fall, including to zero. Only spend what you can afford to lose.
        </p>
      </footer>
    </main>
  );
}
