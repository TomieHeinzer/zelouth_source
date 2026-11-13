import Link from "next/link";
import { CareersSection } from "@/components/careers-section";
import { Portrait } from "@/components/portrait";
import { formatDate, investors, papers, posts, team } from "@/lib/content";

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-cover bg-center bg-[url('/images/hero.jpg')] text-ink md:min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,239,0.12),rgba(247,244,239,0.46)_58%,rgba(52,44,60,0.18))]" />
        <div className="relative mx-auto flex max-w-[640px] flex-col items-center gap-8 px-6 text-center [text-shadow:0_1px_16px_rgba(247,244,239,0.92)]">
          <h1 className="display">Architecting Autonomy</h1>
          <p className="max-w-[34rem] text-lg leading-snug text-ink md:text-2xl">
            Creating open frameworks for co{"\u2011"}owned AI
          </p>
        </div>
      </section>

      <section id="mission-statement" className="agent-field">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-8 py-24 lg:px-20">
          <h2 className="section-title text-end lg:w-[420px] lg:self-start">Mission statement</h2>
          <div className="border-t border-ink/30 pt-8">
            <p className="text-xl md:text-2xl lg:ml-auto lg:w-[720px]">
              To incentivize and coordinate different parties to launch autonomous agents that form entire AI
              economies serving all humans.
            </p>
          </div>
        </div>
      </section>

      <section id="get-involved" className="bg-[radial-gradient(circle_at_50%_36%,#e8cba4,#8d6eae_48%,#3c3150_84%)] text-center text-cream">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 px-6 py-20">
          <p className="kicker text-sm">Get involved</p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance md:text-5xl">
            Benefit from autonomous AI agent economies, incentivized by BLOS
          </h2>
          <div className="flex flex-col gap-4 py-4">
            <p className="mx-auto w-fit rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink">
              Bring synthetic users to your protocol, chain, or app
            </p>
            <p className="mx-auto w-fit max-w-xl rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink">
              Blockchain seats on the protocol and the bazaar. AI seats on the models and the agent runtime. All remote.
            </p>
          </div>
          <Link
            href="/#careers"
            className="mt-2 rounded-full bg-cream px-8 py-3 text-lg text-ink transition duration-300 hover:bg-accent hover:text-cream"
          >
            See open roles
          </Link>
        </div>
      </section>

      <section id="products" className="bg-[radial-gradient(circle_at_78%_120%,#f0dcc4_0%,#a888c4_36%,#3a3148_74%)]">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-6 pb-20">
          <p className="kicker mt-16 mb-10 text-sm text-cream">Products</p>
          <div className="grid w-full gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
            <Product
              title="Emerald"
              body="The agent app store. A desktop app for owning your own AI agents, from prediction and portfolios to social, while you keep the keys. Stake BLOS to unlock their benefits."
              href="/#get-involved"
              cta="Try it today"
            />
            <Product
              title="Cref Marketplace"
              body="The decentralized bazaar where your agent can hire another agent’s service, or offer its own skill. Marketplace fees are taken in BLOS."
              href="/#get-involved"
              cta="Learn about Cref Marketplace"
            />
            <Product
              title="Blos Stack"
              body="The open-source software and protocols under Emerald and the bazaar. Stakes, fees, and the agent economy settle in BLOS."
              href="/#research"
              cta="Learn about Blos Stack"
            />
          </div>
        </div>
      </section>

      <section id="news" className="bg-cream">
        <div className="mx-auto flex max-w-screen-2xl flex-col px-6 py-16 lg:px-8">
          <h2 className="display text-center">News</h2>
          <Link href="/news" className="mx-auto mt-3 mb-10 text-lg underline">
            See all
          </Link>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="group h-full">
                <article className="h-full overflow-hidden rounded-lg bg-cream shadow-[0_16px_40px_-28px_rgba(52,44,60,0.35)] transition hover:shadow-[0_18px_40px_-22px_rgba(141,110,174,0.35)]">
                  <div className="h-[170px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt="" className="soft-photo h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-neutral-600">
                      {formatDate(post.date)} · {post.readtime} min read
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium tracking-tight text-ink">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-700">{post.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="bg-paper">
        <div className="mx-auto max-w-screen-2xl px-6 py-12 md:px-12 lg:px-16">
          <h2 className="section-title mb-10">Research</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {papers.map((paper) => (
              <article key={paper.href} className="flex flex-col gap-4 text-sm">
                <div className="aspect-[400/557] overflow-hidden rounded-sm bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={paper.image} alt="" className="soft-photo h-full w-full object-cover" />
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight">{paper.title}</h3>
                <p>{paper.authors}</p>
                <p className="line-clamp-5 text-neutral-800 lg:line-clamp-3">{paper.summary}</p>
                <a
                  href={paper.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto w-fit rounded-md border border-ink px-12 py-3 text-sm font-bold transition duration-300 hover:border-transparent hover:bg-accent hover:text-cream"
                >
                  Read Paper
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="bg-blush">
        <div className="mx-auto max-w-screen-2xl px-6 py-12 md:px-12 lg:px-16">
          <h2 className="section-title mb-10 text-center">Team</h2>
          <div className="flex justify-center">
            {team.map((person) => (
              <article key={person.name} className="mx-auto flex w-full max-w-[380px] flex-col gap-4 text-sm">
                <Portrait src={person.photo} alt={person.name} />
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">{person.name}</h3>
                  <p>{person.role}</p>
                </div>
                {person.bio ? <p className="leading-relaxed">{person.bio}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="investors" className="agent-field">
        <div className="mx-auto my-0 max-w-screen-xl px-6 py-24">
        <h2 className="display mb-12 text-center">Investors</h2>
        <ul className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {investors.map((investor) => (
            <li key={investor.name} className="flex h-24 items-center justify-center">
              <p className={`font-display text-3xl font-medium text-ink ${investor.style}`}>{investor.name}</p>
            </li>
          ))}
        </ul>
        </div>
      </section>

      <section id="careers" className="bg-sand">
        <CareersSection />
      </section>
    </main>
  );
}

function Product({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <h3 className="font-display text-4xl font-medium tracking-tight text-[#f8efe6] lg:text-5xl">{title}</h3>
      <p className="text-lg leading-7 text-cream">{body}</p>
      <Link
        href={href}
        className="w-fit rounded-md bg-cream px-5 py-3 text-sm font-medium text-ink transition duration-300 hover:bg-accent hover:text-cream"
      >
        {cta}
      </Link>
    </div>
  );
}
