'use client'

const STEPS = [
  { num: 1, label: 'Username' },
  { num: 2, label: 'Pokémon' },
  { num: 3, label: 'Generate' },
]

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div
            className={`
              flex flex-col items-center gap-0.5 transition-all duration-300
            `}
          >
            <div
              className={`
                w-9 h-9 rounded-full border-2 border-dark font-bangers text-sm
                flex items-center justify-center transition-all duration-300
                ${current > s.num
                  ? 'bg-pokeyellow text-dark shadow-neo-sm'
                  : current === s.num
                  ? 'bg-pokeyellow text-dark shadow-neo-sm animate-pulse-ring'
                  : 'bg-white/10 text-white/40 border-white/20'
                }
              `}
            >
              {current > s.num ? '✓' : s.num}
            </div>
            <span
              className={`text-[10px] font-nunito font-bold transition-colors duration-300 ${
                current >= s.num ? 'text-pokeyellow' : 'text-white/30'
              }`}
            >
              {s.label}
            </span>
          </div>

          {i < STEPS.length - 1 && (
            <div
              className={`w-10 h-0.5 mx-1 mb-4 rounded-full transition-all duration-500 ${
                current > s.num ? 'bg-pokeyellow' : 'bg-white/15'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
