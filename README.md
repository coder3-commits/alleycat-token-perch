# Alleycat Token Perch

Build a single-page, mobile-first website for a memecoin called $ALLEYCAT (street-smart alley cat theme). English only. Dark theme, bold but clean, readable on cheap Android phones over slow connections.

Sections, in order:

1. Hero: headline, one-line hook, a "Join our Telegram" button linking to [TELEGRAM_URL], and a contract address box with a copy button. The contract box stays hidden until a config value MINT_ADDRESS is set. Leave an empty container for a 3D scene to be added later.

2. How to buy: four short steps. (1) Install a Solana wallet such as Phantom or Solflare. (2) Get SOL and send it to your wallet. (3) Open pump.fun or PumpSwap and paste the contract address. (4) Buy $ALLEYCAT.

3. Holder airdrop: a rules table with minimum hold [X] tokens, one random snapshot per day for 7 days, qualify by holding the minimum in at least 5 of 7 snapshots, per-wallet cap [max], and excluded addresses (dev, team, liquidity). Add a counter that reads "X of [target] wallets qualified".

4. Footer: Telegram link, and a short notice that this is not financial advice and prices can fall.

Constraints:

- Put every data call in one file, src/api/client.ts, using a VITE_API_BASE_URL variable. For now it returns mock data for the counter and status.

- No wallet connection, no backend, no database, no authentication, and no private keys or secrets anywhere in the code.

- No profit claims, no fake "live buyers" tickers, no countdowns that reset.

- Keep initial JavaScript around 200 KB or less, lazy-load images, and use compressed images.

- Large tap targets, good color contrast, and fast first paint.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6f6bca4c-3f5c-4573-ab69-5029ad124526).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
