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
- `/careers` — open roles and an application saved on the server
- `/sources` — whitepaper and roadmap
- `/whitepaper` — summary, protocol, tokenomics, and Proof of Active Agent
- `/roadmap` — Emerald, Cref Marketplace, and the BLOS flywheel
- `/news` — journal
- `/privacy` and `/terms`

Career applications are emailed to `info@zelouth.xyz` through Namecheap Private Email (`smtp.privateemail.com`, port 465). The mailbox login is `info@zelouth.xyz`. Set `SMTP_PASSWORD` to that mailbox password so Nodemailer can send. `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_FROM` can override those defaults. The browser only remembers the application id so the form can load that file again.

Locally, the file is written to `data/applications/<id>.json`. On Vercel, connect a Blob store to the project. Vercel then provides `BLOB_READ_WRITE_TOKEN`, and each application is stored as a private blob. Without that store, Vercel can still accept the form, but its disk is temporary.

## Deploy on Vercel

Import this repository. Vercel should detect Next.js. Use Node.js 22, install with `npm install`, and build with `next build`. The site root is the repository root.

Set these environment variables on the Vercel project:

- `SMTP_PASSWORD` — password for the `info@zelouth.xyz` mailbox
- `NEXT_PUBLIC_SITE_URL` — the public address, such as `https://zelouth.xyz`

Then open Storage, create a Blob store, and connect it to this project.
