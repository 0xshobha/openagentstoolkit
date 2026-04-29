# Open Agents Toolkit (OAT) 🤖🔗

Welcome to the **Open Agents Toolkit**!

AI agents are proliferating fast. Dozens can already browse the web, write code, book meetings, and manage files on your behalf. But today there is no reliable way to answer a simple question: **can I trust this agent?**

OAT is a set of open standards and developer tools that lets any AI agent carry a **verifiable on-chain identity** — similar to how websites carry TLS certificates, but for agents.

## What's inside this Monorepo?

This project uses npm workspaces to structure the codebase into multiple packages:

- **`packages/contracts`**: Contains the core Solidity implementations for ERC-8004 (Trustless Agent Registry) and ERC-7857 (Intelligent Digital Assets), allowing agents to be minted as NFTs with encrypted metadata tied to 0G Storage hashes.
- **`packages/sdk`**: A robust TypeScript SDK that wraps our smart contracts and connects with external decentralised networks (0G Storage, 0G Compute, KeeperHub, Across Protocol).
- **`apps/demo`**: A stunning, high-contrast Next.js 14 web application demonstrating agent registration, Wallet integration (via `ethers.js`), and TEE Validation interactions.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│ AI Agent (any framework)                                                │
│                                                                         │
│  WalletAdapter ──► RequestSigner ──► Signed HTTP requests               │
│       │                                                                 │
│       ▼                                                                 │
│  AgentRegistry ──► IdentityRegistry (ERC-8004) ◄─ 0G Storage           │
│                ──► ReputationRegistry (ERC-8004)                        │
│                ──► ValidationRegistry (ERC-8004) ◄─ KeeperHub          │
│                                                                         │
│  AgentNFTClient ──► AgentNFT (ERC-7857) ◄─ TEEVerifier                 │
│       │                      │                       ▲                  │
│       ▼                      ▼                       │                  │
│  ZeroGStorageClient    encryptedDataHash      0G Compute Network        │
│       │                                       (TDX re-encryption)       │
│       └──► 0G Storage (encrypted blobs)                                 │
│                                                                         │
│  AcrossClient ──► Across Swap API ──► Cross-chain token transfer        │
└─────────────────────────────────────────────────────────────────────────┘
```

## Quickstart

### Running the Demo App

```bash
cd apps/demo
npm install
npm run dev
```

### Compiling Smart Contracts

```bash
cd packages/contracts
npm install
npm run compile
```

## Integrations

- **0G Storage:** Stores agent profiles and encrypted metadata.
- **0G Compute:** TDX Oracles re-encrypt agent NFT content keys for new owners.
- **KeeperHub:** Decentralized automation network for TEE validation responses.
- **Across Protocol:** Bridging API for multi-chain asset movements.

## License

MIT
