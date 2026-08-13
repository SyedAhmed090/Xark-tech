import type { Metadata } from "next";
import { noindexPage } from "@/lib/site";

/** Interactive prop for the case study — deliberately kept out of search. */
export const metadata: Metadata = noindexPage("/demo/loop-health");

/* Screenshot target for the Loop Health case study. Rendered at phone
   viewport size (390x844) so the capture is a full-screen app shot, not a
   device mockup. */

const MEDS = [
  { name: "Metformin", dose: "500mg · with food", done: true },
  { name: "Lisinopril", dose: "10mg · morning", done: true },
  { name: "Atorvastatin", dose: "20mg · evening", done: false },
];

export default function LoopHealthDemo() {
  return (
    <div className="flex h-[844px] w-[390px] flex-col bg-paper px-6 pb-6 pt-14 font-sans text-ink">
      <p className="text-sm text-ink/50">Good morning, Dana</p>
      <h1 className="mt-1 text-2xl font-medium">How are you feeling today?</h1>

      <div className="mt-6 flex justify-between gap-2">
        {["😩", "😕", "😐", "🙂", "😀"].map((face, i) => (
          <div
            key={face}
            className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl ${
              i === 3 ? "bg-[#0f8a5f] text-paper" : "bg-white"
            }`}
          >
            {face}
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-2xl bg-[#0f8a5f] py-4 text-center text-base font-medium text-paper">
        Log today&apos;s check-in
      </button>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-ink/60">Today&apos;s medications</p>
        <div className="flex flex-col gap-3">
          {MEDS.map((med) => (
            <div
              key={med.name}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${
                  med.done ? "bg-[#0f8a5f] text-paper" : "border-2 border-ink/15"
                }`}
              >
                {med.done ? "✓" : ""}
              </div>
              <div>
                <p className="text-base">{med.name}</p>
                <p className="text-sm text-ink/40">{med.dose}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-tint p-5">
        <p className="text-sm font-medium">New message from Dr. Alvarez</p>
        <p className="mt-1 text-sm text-ink/50">
          Your last two check-ins look great — keep it up. See you Thursday.
        </p>
      </div>

      <div className="mt-auto flex items-center justify-around rounded-2xl bg-white py-4 shadow-sm">
        {["Check-in", "Medications", "Messages"].map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className={`h-6 w-6 rounded-full ${i === 0 ? "bg-[#0f8a5f]" : "bg-ink/15"}`}
            />
            <span
              className={`text-[11px] ${i === 0 ? "text-[#0f8a5f]" : "text-ink/40"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
