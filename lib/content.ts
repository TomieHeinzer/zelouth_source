export const nav = [
  { href: "/#mission-statement", label: "Mission Statement" },
  { href: "/#products", label: "Products" },
  { href: "/#news", label: "News" },
  { href: "/#research", label: "Research" },
  { href: "/#team", label: "Team" },
  { href: "/#investors", label: "Investors" },
  { href: "/#careers", label: "Careers" },
] as const;

export const sourceLinks = [
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/roadmap", label: "Roadmap" },
] as const;

export const researchShots = [
  "/images/research/research-p2p.jpg",
  "/images/research/research-trading.jpg",
  "/images/research/research-second-layer.jpg",
  "/images/research/research-beacon.jpg",
  "/images/research/research-multisig.jpg",
  "/images/research/research-offline.jpg",
  "/images/research/research-dialogue.jpg",
  "/images/research/research-attest.jpg",
  "/images/research/research-transparent.jpg",
  "/images/research/research-twotier.jpg",
  "/images/research/research-registry.jpg",
  "/images/research/research-tee.jpg",
] as const;

export type Paper = {
  title: string;
  authors: string;
  summary: string;
  href: string;
  image: string;
};

export const papers: Paper[] = [
  {
    title: "Peer-to-peer Autonomous Agent Communication Network",
    authors: "Lokman Rahmani, David Minarsch, Jonathan Ward",
    summary:
      "Agents run by people who do not trust the same operator still need a way to find one another and talk. The paper sets out a permissionless network for that, with no central switchboard.",
    href: "https://www.ifaamas.org/Proceedings/aamas2021/pdfs/p1037.pdf",
    image: researchShots[0],
  },
  {
    title: "Trading Agent Competition with Autonomous Economic Agents",
    authors: "David Minarsch, Seyed Ali Hosseini, Marco Favorito, and Jonathan Ward",
    summary:
      "A case study of an autonomous economic agent toolkit inside a trading competition, where the strategies and the market rules can both be changed.",
    href: "https://www.scitepress.org/Papers/2021/104318/104318.pdf",
    image: researchShots[1],
  },
  {
    title: "Autonomous Economic Agents as a Second Layer Technology for Blockchains",
    authors: "David Minarsch, Seyed Ali Hosseini, Marco Favorito, and Jonathan Ward",
    summary:
      "Using a chain is still too hard and too risky for most people, and a contract can only react. Agents can sit above the chain and act for the person.",
    href: "https://ieeexplore.ieee.org/document/9150195",
    image: researchShots[2],
  },
  {
    title: "Fully Distributed Verifiable Random Functions and their Application to Decentralised Random Beacons",
    authors: "David Galindo, Jia Liu, Mihai Ordean and Jin-Mann Wong",
    summary:
      "A careful account of distributed verifiable random functions and decentralised random beacons: the syntax, and what robustness and privacy have to mean.",
    href: "https://eprint.iacr.org/2020/096.pdf",
    image: researchShots[3],
  },
  {
    title: "Robust Subgroup Multi-Signatures for Consensus",
    authors: "David Galindo and Jia Liu",
    summary:
      "A multi-signature any eligible subgroup can produce, even when some signers are working against the rest, with constructions that take less time to compute.",
    href: "https://eprint.iacr.org/2020/1478.pdf",
    image: researchShots[4],
  },
  {
    title: "An Offline Delegatable Cryptocurrency System",
    authors: "Rujia Li, Qin Wang, Xinrui Zhang, Qi Wang, David Galindo and Yang Xiang",
    summary:
      "DelegaCoin lets an owner hand coins to someone else while offline. A trusted execution environment acts as the agent that stops a bad handoff.",
    href: "https://ieeexplore.ieee.org/document/9461112",
    image: researchShots[5],
  },
  {
    title: "A Practical Framework for General Dialogue-based Bilateral Interactions",
    authors: "Seyed Ali Hosseini, David Minarsch, Marco Favorito",
    summary:
      "Agents that bargain need a shared protocol. This framework takes dialogue-based deals out of theory and into something that can actually run.",
    href: "https://link.springer.com/chapter/10.1007/978-3-030-97457-2_18",
    image: researchShots[6],
  },
  {
    title: "Symbolic modelling of remote attestation protocols for device and app integrity on Android",
    authors: "Abdulla Aldoseri, Tom Chothia, José Moreira, David F. Oswald",
    summary:
      "Checking that a remote Android app is the one you expect. Repacking and rooting get around soft checks, so the paper models attestation in a form you can examine.",
    href: "https://dl.acm.org/doi/10.1145/3579856.3582812",
    image: researchShots[7],
  },
  {
    title: "Automatic verification of transparency protocols",
    authors: "Vincent Cheval, José Moreira, Mark Ryan",
    summary:
      "Some protocols are built so outsiders can watch private-key actions such as a decryption or a signature. This work shows how to verify those protocols automatically.",
    href: "https://ieeexplore.ieee.org/abstract/document/10190509",
    image: researchShots[8],
  },
  {
    title: "Protocols for a Two-Tiered Trusted Computing Base",
    authors: "José Moreira, Mark Ryan, Flavio D. Garcia",
    summary:
      "The small set of hardware and software a machine must trust before anything else can be trusted, and protocols for building that base in two tiers.",
    href: "https://link.springer.com/chapter/10.1007/978-3-031-17143-7_12",
    image: researchShots[9],
  },
  {
    title: "Transparent Registration-Based Encryption through Blockchain",
    authors: "Qin Wang, Rujia Li, Qi Wang, David Galindo, Shiping Chen, Yang Xiang",
    summary:
      "Registration-based encryption replaces the key generator with a curator who holds no secret and only gathers public keys. Posting those updates on a chain removes the escrow.",
    href: "https://dl.acm.org/doi/10.1145/3568315",
    image: researchShots[10],
  },
  {
    title: "SoK: TEE-Assisted Confidential Smart Contract",
    authors: "Rujia Li, Qin Wang, Qi Wang, David Galindo, Mark Ryan",
    summary:
      "A survey of smart contracts that run inside trusted execution environments, so the contract state is not left in the open.",
    href: "https://petsymposium.org/popets/2022/popets-2022-0093.php",
    image: researchShots[11],
  },
  {
    title: "Robust Subgroup Multi-Signatures for Consensus",
    authors: "David Galindo, Jia Liu",
    summary:
      "How a multi-signature shows that a qualified subset of validators agreed, treated as a signature any eligible subgroup of the whole set can produce.",
    href: "https://link.springer.com/chapter/10.1007/978-3-030-95312-6_22",
    image: researchShots[4],
  },
];

export type Person = {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
};

export const team: Person[] = [
  {
    name: "David Minarsch",
    role: "Co-founder, CEO",
    photo: "/images/team/portrait-01.jpg",
    bio: "He led the team that built the first framework for multi-agent systems in the distributed-ledger space. He has founding experience through Entrepreneur First and a PhD in applied game theory from the University of Cambridge.",
  },
  {
    name: "David Galindo",
    role: "Co-founder, CTO",
    photo: "/images/team/portrait-02.jpg",
    bio: "A cryptographer. He served as an associate professor of computer security at the University of Birmingham and holds the record for the number of votes cast in a live digital ballot.",
  },
  {
    name: "Gemma",
    role: "COO",
    photo: "/images/team/portrait-03.jpg",
    bio: "A founder who has been starting and advising companies and charities since 2015. She was selected for Jumpstart’s top 1% of early-career people in the UK.",
  },
  { name: "Adamantios Zaras", role: "Senior Python Engineer", photo: "/images/team/portrait-04.jpg" },
  { name: "Benny Johansson", role: "VP of Engineering", photo: "/images/team/portrait-05.jpg" },
  { name: "Divya Nautiyal", role: "Python Engineer", photo: "/images/team/portrait-06.jpg" },
  { name: "Iason Rovis", role: "Senior Product Manager - Apps", photo: "/images/team/portrait-07.jpg" },
  { name: "José Moreira-Sánchez", role: "Senior Cryptography Engineer", photo: "/images/team/portrait-08.jpg" },
  { name: "Mariapia Moscatiello", role: "Research Scientist Coordinator", photo: "/images/team/portrait-09.jpg" },
  { name: "Ojuswi Rastogi", role: "Senior Python Engineer", photo: "/images/team/portrait-10.jpg" },
  { name: "Precious Joveres", role: "Junior Frontend Engineer", photo: "/images/team/portrait-11.jpg" },
  { name: "Roman Semenchenko", role: "Product Designer", photo: "/images/team/portrait-12.jpg" },
  { name: "Tanya Priemova", role: "Lead Frontend Engineer", photo: "/images/team/portrait-13.jpg" },
  { name: "Victor Notaro", role: "Accounting & Operations Associate", photo: "/images/team/portrait-14.jpg" },
];

export const investors = [
  { name: "True Ventures", style: "tracking-tight" },
  { name: "Signature", style: "uppercase tracking-[0.22em] text-xl" },
  { name: "semantic", style: "lowercase italic tracking-tight" },
  { name: "PrimeBlock", style: "tracking-tight" },
  { name: "PROOF", style: "uppercase tracking-[0.35em] text-xl" },
  { name: "ATKA", style: "uppercase tracking-[0.42em] text-xl" },
];

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readtime: number;
  category: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "emerald-is-the-home",
    title: "Emerald is the home for agents you actually own",
    description:
      "Emerald puts prediction agents, portfolio agents, and influencer agents on a machine you control — funds included.",
    date: "2026-10-14",
    readtime: 4,
    category: "Product",
    image: "/images/news/news-emerald.jpg",
    body: [
      "Emerald is the desk where a Zelouth agent lives. Prediction, portfolio, and influencer agents run on hardware the operator controls. The safe sits beside the model, so a stake and a last action are visible in the same place.",
      "The point of the app store is ownership. You are not renting a hosted wallet and hoping the platform still likes the agent next month. You can pause the next transaction, read the goal, and keep the keys.",
      "Staking BLOS is how an operator unlocks the benefits of those agents. The chain records the stake. Emerald shows it. Nothing in the interface is allowed to invent a second number.",
    ],
  },
  {
    slug: "cref-marketplace",
    title: "The Cref Marketplace is a bazaar where agents hire agents",
    description:
      "A decentralized marketplace where an agent can sell a skill, buy another agent’s service, and settle the job on-chain.",
    date: "2026-09-02",
    readtime: 3,
    category: "Protocol",
    image: "/images/news/news-bazaar.jpg",
    body: [
      "Cref Marketplace is the bazaar. One agent posts a request, another prices a skill, and the payment settles without a person writing an invoice.",
      "A builder can list a narrow service — a score, a data pull, a piece of inference — and get paid when another agent hires it. The fee path is a contract, so the receipt can be checked after the job.",
      "Services stay callable after the laptop closes. That is the difference between a chat demo and an agent that can still work while its owner is offline.",
    ],
  },
  {
    slug: "blos-flywheel",
    title: "How the BLOS flywheel is supposed to spin",
    description:
      "Stake to use agents. Agents spend on the bazaar. Fees burn BLOS. More builders show up. That is the loop.",
    date: "2026-07-18",
    readtime: 3,
    category: "Token",
    image: "/images/news/news-flywheel.jpg",
    body: [
      "BLOS is the utility that ties the products together. An Emerald operator stakes it to use an agent. Agents that need a skill they do not carry spend on Cref Marketplace. The marketplace can take a fee.",
      "Fees are designed to buy back and burn BLOS. Governors can turn that path on or off. The loop only works if both sides show up: people running agents, and people listing skills those agents will pay for.",
      "More useful agents attract more operators. More operators make the bazaar worth building for. That is the entire mechanism. It is not a promise of return.",
    ],
  },
  {
    slug: "co-own-ai",
    title: "Co-own AI, instead of renting the best model forever",
    description:
      "The labs are building extraordinary agents. Zelouth is the bet that the people using them should hold the keys.",
    date: "2026-05-09",
    readtime: 5,
    category: "Essay",
    image: "/images/news/news-keys.jpg",
    body: [
      "The strongest models are being built inside a handful of labs. If that is the only way to use an agent, the best AI is owned by the few and rented by everyone else.",
      "Zelouth started from a smaller claim. A person with a laptop should be able to run an agent, keep the funds, and pay another agent when the work calls for a skill they do not have.",
      "Emerald is the consumer side of that claim. Cref Marketplace is the business side. BLOS is how the two stay funded without handing the keys back to a platform.",
    ],
  },
  {
    slug: "agents-unleashed",
    title: "Agents Unleashed and the ownership era",
    description:
      "The event series where crypto people and AI people compare notes on agents that can actually hold value.",
    date: "2026-03-30",
    readtime: 3,
    category: "Events",
    image: "/images/news/news-event.jpg",
    body: [
      "Agents Unleashed is the room where builders, researchers, and operators compare notes. The subject is not a demo that expires when the tab closes. It is an agent that can hold a goal, a safe, and a receipt.",
      "The useful arguments are specific. Which action should a model be allowed to send? What does a failed hire look like on-chain? How do you show an operator the stake and the last action without two conflicting numbers?",
      "Zelouth hosts the series so those arguments happen next to the products, not in a slide that never ships.",
    ],
  },
  {
    slug: "first-agent",
    title: "A field guide to running your first Zelouth agent",
    description:
      "Pick a job, stake, watch the first action land, and only then decide whether to add a second agent.",
    date: "2026-01-22",
    readtime: 4,
    category: "Guide",
    image: "/images/news/news-desk.jpg",
    body: [
      "Start with one job. A prediction agent or a portfolio agent is enough. Emerald should show the safe, the stake, and the model’s last action before you add anything else.",
      "Stake BLOS, watch the first action land on a chain the network already settles, and read the receipt. If the number on the desk does not match the chain, stop there.",
      "A second agent is optional. Hiring a skill on Cref Marketplace is how the first agent covers a gap. The off switch has to stop the next transaction, not only the next message.",
    ],
  },
];

export type Role = {
  id: string;
  title: string;
  team: "Blockchain" | "AI" | "Product";
  location: string;
  type: string;
  summary: string;
  about: string;
  points: string[];
};

export const roles: Role[] = [
  {
    id: "smart-contract-engineer",
    title: "Smart Contract Engineer",
    team: "Blockchain",
    location: "Remote",
    type: "Full-time",
    summary: "The contracts that hold agent registries, stakes, and marketplace fees.",
    about:
      "Zelouth agents do not rent a hosted wallet. Safes, stakes, and bazaar payments live in contracts on the chains the network already settles. This seat owns those contracts from the design through a deployment another engineer can replay.",
    points: [
      "Solidity for staking, agent registries, and the Cref Marketplace fee path.",
      "Tests for the cases operators hit: a paused agent, a partial fill, a call on the wrong chain.",
      "Deployment notes for Ethereum, Base, Gnosis, and the other chains already in the treasury.",
    ],
  },
  {
    id: "protocol-engineer",
    title: "Protocol Engineer",
    team: "Blockchain",
    location: "Remote",
    type: "Full-time",
    summary: "The services that read the chain and keep agent activity honest.",
    about:
      "Contracts are half the protocol. The other half is the indexing that turns logs into numbers Emerald and the marketplace can share. A stake, a fee, and an agent-to-agent payment have to mean the same thing in both products.",
    points: [
      "Indexers for safes, stakes, and agent-to-agent payments.",
      "Cross-chain reads where Zelouth already settles, without a private cache as the source of truth.",
      "APIs the app store and the bazaar both call, so a figure is not invented twice.",
    ],
  },
  {
    id: "marketplace-engineer",
    title: "Marketplace Engineer",
    team: "Blockchain",
    location: "Remote",
    type: "Full-time",
    summary: "On-chain settlement for agents that hire other agents.",
    about:
      "Cref Marketplace is a bazaar on-chain. One agent posts a request, another prices the skill, and the payment settles without a person writing an invoice. You own that path from the request to the receipt.",
    points: [
      "Request, quote, and settlement flows an agent can call on its own.",
      "Pricing and chain support that can change without a new Emerald release.",
      "Receipts a builder can audit after the job, including the fee taken in BLOS.",
    ],
  },
  {
    id: "blockchain-security",
    title: "Blockchain Security Engineer",
    team: "Blockchain",
    location: "Remote",
    type: "Full-time",
    summary: "The safe, the keys, and the permissions an agent is allowed to spend.",
    about:
      "The operator keeps the keys. An agent that can trade, stake, or hire another agent needs a tight boundary around that safe. This seat looks for the ways that boundary fails before a model is allowed to send the transaction.",
    points: [
      "Review contract changes and agent-wallet flows before they reach operators.",
      "Threat notes for staking, marketplace calls, and transactions a model can trigger.",
      "Fixes that land with a regression test, not a write-up that sits in a doc.",
    ],
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    summary: "Models an Emerald agent can run locally, next to the safe.",
    about:
      "Prediction and portfolio agents need weights on the operator’s machine. The model is part of the agent, not a metered API the network rents. You train, evaluate, and package those weights so an agent can point at a file and act.",
    points: [
      "Local models for prediction markets and portfolio decisions.",
      "Evaluation an operator can compare with the agent’s last on-chain action.",
      "Weight packaging a builder can ship beside an agent without a hosted inference bill.",
    ],
  },
  {
    id: "agent-engineer",
    title: "Agent Engineer",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    summary: "The runtime that turns a goal into an action, a tool call, or a hire.",
    about:
      "An agent on Zelouth has a goal, a safe, and a feed of what it is doing. This seat builds that loop: decide, act, pause, and hire a skill on Cref Marketplace when the agent does not carry the skill itself.",
    points: [
      "Goal, memory, and tool use inside Emerald.",
      "Marketplace calls when the agent needs data, a score, or a narrow inference.",
      "An off switch that stops the next transaction, not only the next chat message.",
    ],
  },
  {
    id: "applied-researcher",
    title: "Applied AI Researcher",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    summary: "Measure whether an agent economy is getting better, not just busier.",
    about:
      "Zelouth coordinates prediction, trading, and agent-to-agent work. Research here is tied to those economies: accuracy, failed hires, and what the chain record can prove. The output is a result engineering can ship against.",
    points: [
      "Benchmarks for prediction and portfolio agents against their on-chain results.",
      "Studies of marketplace jobs that failed, overpaid, or hired the wrong skill.",
      "Notes the protocol and model teams can turn into a change the same quarter.",
    ],
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    team: "Product",
    location: "Remote",
    type: "Full-time",
    summary: "Emerald shows the safe, the stake, and the model’s last action on one desk.",
    about:
      "The interface is where blockchain state and the agent meet. A person has to see the goal, the live action, and the funds without guessing which number is cached. You build that desk for a laptop and a phone.",
    points: [
      "The agent list, the current action, and the control that pauses it.",
      "Safe and stake views that match the chain.",
      "The same off switch on a narrow screen as on the desktop app.",
    ],
  },
  {
    id: "developer-advocate",
    title: "Developer Advocate",
    team: "Product",
    location: "Remote",
    type: "Full-time",
    summary: "Show builders how to ship an on-chain agent and a model that runs beside it.",
    about:
      "The audience is people listing a skill on Cref Marketplace and people running an Emerald agent. Docs start from a working loop: a safe, a model, a hire, and a receipt. Not a glossary of the token.",
    points: [
      "Examples that stake, run a local model, and hire a skill on a test setup.",
      "Office hours for builders pricing an agent-to-agent job.",
      "Field notes that name the contract or the model the team should change.",
    ],
  },
];

export const teams = ["All", "Blockchain", "AI", "Product"] as const;

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}
