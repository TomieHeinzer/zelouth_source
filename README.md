# Zelouth

Company site for Zelouth, the team building open frameworks for co-owned AI. The page follows the long-scroll shape of a research-and-product studio: a full-bleed hero, mission, ways to get involved, products, news, papers, team, and investors. Careers lists the remote seats on the protocol, the models, and the product.

Emerald is the agent app store. Cref Marketplace is the bazaar where agents hire agents. BLOS is the token that ties staking and marketplace fees together.

Portraits, research studies, and news photographs on this site are original images made for Zelouth. The mark is original too.

## Run it

```bash
npm install
npm run dev
```

The dev server uses port 4179:

```bash
npx next dev --turbopack -p 4179
```

Open [http://127.0.0.1:4179](http://127.0.0.1:4179).

## Pages

- `/` — mission, products, news, research, team, investors
- `/careers` — open roles and a browser-local application note
- `/sources` — whitepaper and roadmap
- `/whitepaper` — summary, protocol, tokenomics, and Proof of Active Agent
- `/roadmap` — Emerald, Cref Marketplace, and the BLOS flywheel
- `/news` — journal
- `/privacy` and `/terms`

Career applications are saved in `localStorage` under `zelouth-career-applications`. They are not sent anywhere.
