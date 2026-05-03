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
          <div className="flex flex-col items-center gap-0.5 transition-all duration-300">
            <div
              className={`
                w-9 h-9 rounded-full font-nunito font-bold text-sm
                flex items-center justify-center transition-all duration-300
                ${current > s.num
                  ? 'text-white shadow-neo-sm'
                  : current === s.num
                  ? 'text-white shadow-neo-sm animate-pulse-ring'
                  : 'bg-white border border-pink-100 text-purple-200'
                }
              `}
              style={current >= s.num ? {
                background: 'linear-gradient(135deg, #FF9BC3, #B89FF8)',
              } : {}}
            >
              {current > s.num ? '✓' : s.num}
            </div>
            <span
              className={`text-[10px] font-nunito font-bold transition-colors duration-300 ${
                current >= s.num ? 'text-pokepink' : 'text-purple-200'
              }`}
            >
              {s.label}
            </span>
          </div>

          {i < STEPS.length - 1 && (
            <div
              className={`w-10 h-0.5 mx-1 mb-4 rounded-full transition-all duration-500 ${
                current > s.num ? 'bg-pokepink/50' : 'bg-pink-100'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
