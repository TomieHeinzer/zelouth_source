import { CareersBoard } from "@/components/careers-board";

const principles = [
  {
    title: "On-chain",
    body: "Stakes, fees, and agent-to-agent payments settle in contracts. The chain is the record.",
  },
  {
    title: "Models beside the safe",
    body: "Prediction and portfolio agents run on hardware the operator controls, not a rented API.",
  },
  {
    title: "One desk",
    body: "Emerald shows the safe, the stake, and the model’s last action in the same place.",
  },
];

export function CareersSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Title = heading;

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <p className="kicker text-xs text-neutral-600">Zelouth</p>
        <Title className={heading === "h1" ? "display mt-3" : "section-title mt-3"}>Careers</Title>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-800 md:text-xl">
          Blockchain seats on the protocol and the bazaar. AI seats on the models and the agent runtime. All remote.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 md:grid-cols-3">
        {principles.map((item) => (
          <article key={item.title} className="rounded-lg bg-blush p-6">
            <h2 className="font-display text-2xl font-medium tracking-tight">{item.title}</h2>
            <p className="mt-3 text-sm leading-6">{item.body}</p>
          </article>
        ))}
      </div>

      <CareersBoard />
    </>
  );
}
