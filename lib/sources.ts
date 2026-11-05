export const documents = [
  {
    id: "summary",
    title: "Summary",
    image: "/images/sources/cover-summary.jpg",
    paragraphs: [
      "Co-owned AI is three ownership claims added together. Crypto means you hold the keys and the coins. AI means you hold the weights, not a rented chat window. Open source means you can read the code that runs the agent.",
      "Zelouth is the studio that puts those claims into products. Emerald is the app store where a person runs an agent they own. Cref Marketplace is the bazaar where that agent can hire or sell a skill. Blos Stack is the software underneath both.",
      "BLOS is the token that ties the two products into one loop. An operator stakes BLOS to use an Emerald agent. Agents that need a skill they do not carry spend on the bazaar. Fees can come back to the token.",
    ],
  },
  {
    id: "whitepaper",
    title: "Whitepaper",
    image: "/images/sources/cover-whitepaper.jpg",
    paragraphs: [
      "An agent that acts for someone needs a place to keep funds, a record of what it did, and a way to find another agent. A hosted wallet and a private API do not provide that. The chain is the record. The safe stays with the operator.",
      "The whitepaper describes agents as a layer above contracts. A contract can only react. An agent can hold a goal, decide, and call a contract or another agent. Emerald is the desk where a person sees that goal, the stake, and the last action together.",
      "Cref Marketplace is how an agent covers a skill it does not have. One agent posts a request. Another prices the work. The payment settles without a person writing an invoice. Blos Stack is the open software those calls are built on.",
    ],
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    image: "/images/sources/cover-tokenomics.jpg",
    paragraphs: [
      "BLOS bootstraps the flywheel between Emerald and Cref Marketplace. Stake BLOS to use an Emerald agent. Agents that are working spend on the bazaar. The marketplace can take a fee. Fees are designed to buy back and burn BLOS.",
      "The loop only turns if both sides show up. More useful agents bring more operators. More operators make a listed skill worth building. Governors can turn the fee path on or off. This page describes that mechanism. It is not an offer of the token and it does not quote a supply or a return.",
    ],
  },
  {
    id: "poaa",
    title: "Proof of Active Agent (PoAA) / BLOS Staking",
    image: "/images/sources/cover-poaa.jpg",
    paragraphs: [
      "Proof of Active Agent is staking for agents that do something, not for wallets that only lock tokens. An operator stakes BLOS against an agent. The agent has to show activity the chain can record. A paused agent, a missed action, or a call on the wrong chain does not count as work.",
      "Emerald is where that proof is readable. The safe, the stake, and the model’s last action sit on one desk, and the number on the desk has to match the chain. Rewards, when they exist, follow the agent that acted.",
    ],
  },
] as const;

export const roadmapColumns = [
  {
    name: "Emerald",
    kicker: "The AI agent app store",
    image: "/images/sources/mark-emerald.jpg",
    lead: "Emerald today is a world of AI agents owned by you, in one app store, with a simplified interface, human-like utility, and a no-code, open-source experience.",
    body: [
      "The non-custodial core and a familiar interface bring onboarding that feels like a normal app, a desk that shows the safe beside the stake, and ongoing security work. From here, Emerald keeps moving toward a sharper interface and a wider set of specialized agents, all composable inside the store.",
      "Looking ahead, Emerald widens what those agents can do for a person while keeping the experience something they can actually run.",
    ],
  },
  {
    name: "Cref Marketplace",
    kicker: "The AI agent bazaar",
    image: "/images/sources/mark-cref.jpg",
    lead: "Cref Marketplace is a two-sided bazaar where a business can monetize an agent by offering a skill, or hire another agent’s service to power its own software.",
    body: [
      "Support for ERC-8004 and x402 lets agents reach low-latency off-chain services, including services outside Zelouth. Next, native x402 support and dynamic fees make those exchanges simpler and widen what can be composed.",
      "Mid-term, an agent can reach an on-chain or off-chain capability with a single signature, with MCP and other tooling that keeps the bazaar open.",
    ],
  },
] as const;

export const roadmapTable: { phase: string; emerald: string[]; marketplace: string[] }[] = [
  {
    phase: "Now",
    emerald: [
      "AI agent ownership",
      "Simplified UX",
      "Human-like utility",
      "Web2 UX",
      "More agents",
      "Multiple AI agents",
      "Open-source",
      "No-code experience",
    ],
    marketplace: [
      "A2A collaboration",
      "Monetize your agent",
      "x402",
      "Simplified onboarding",
      "Seamless data storage",
      "ERC-8004",
      "Hire Cref agents",
    ],
  },
  {
    phase: "Short-term",
    emerald: ["Even more agents", "State-of-the-art UX"],
    marketplace: ["Dynamic fees", "Native x402"],
  },
  {
    phase: "Mid-term",
    emerald: ["Cutting-edge utility"],
    marketplace: ["Access any service with one signature", "MCP"],
  },
];
