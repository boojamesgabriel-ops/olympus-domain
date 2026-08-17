import { HephaestusStatusOutput } from "@/lib/ai/tool-types";

type HephaestusStatusCardProps = {
  status: HephaestusStatusOutput;
};

export default function HephaestusStatusCard({
  status,
}: HephaestusStatusCardProps) {
  return (
    <div className="w-full max-w-xl rounded-xl border border-white/15 bg-white/10 p-4 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-sky-300">
            Hephaestus Status
          </p>
          <h3 className="mt-1 text-lg font-medium">{status.currentTask}</h3>
          <p className="mt-1 text-sm text-white/60">{status.summary}</p>
        </div>

        <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs text-yellow-100">
          {status.status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-white/50">
          <span>Rendering progress</span>
          <span>{status.progress}%</span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-sky-400"
            style={{ width: `${status.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-white/70">
        <span>Estimated completion</span>
        <span>{status.estimatedCompletion}</span>
      </div>

      {status.requiresApproval && (
        <div className="mt-4 flex gap-3">
          <button className="rounded-full border border-sky-300/40 bg-sky-400/15 px-4 py-2 text-sm text-sky-100">
            Approve render
          </button>
          <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
            Request changes
          </button>
        </div>
      )}
    </div>
  );
}