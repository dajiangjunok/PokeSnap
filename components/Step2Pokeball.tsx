'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { stepAtom, selectedPokeballAtom } from '@/store/atoms'
import { POKEBALL_LIST, type Pokeball } from '@/lib/pokeball'

export default function Step2Pokeball() {
  const [, setStep] = useAtom(stepAtom)
  const [selected, setSelected] = useAtom(selectedPokeballAtom)
  const [shaking, setShaking] = useState<string | null>(null)

  const handleSelect = (ball: Pokeball) => {
    if (shaking) return
    setShaking(ball.id)
    setTimeout(() => {
      setShaking(null)
      setSelected(ball)
    }, 950)
  }

  return (
    <div className="card p-6 md:p-8 animate-pop-in">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3 animate-float inline-block">⚾</div>
        <h2 className="font-bangers text-3xl md:text-4xl text-dark tracking-wide">
          选择你的精灵球
        </h2>
        <p className="text-gray-500 font-nunito text-sm mt-1">哪个球是你的幸运球？</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {POKEBALL_LIST.map((ball, idx) => {
          const isSelected = selected?.id === ball.id
          const isShaking = shaking === ball.id
          return (
            <button
              key={ball.id}
              onClick={() => handleSelect(ball)}
              className={`
                relative p-4 rounded-2xl text-center transition-all duration-200
                border-3 border-dark
                ${isSelected
                  ? 'scale-95 shadow-neo-sm'
                  : 'hover:scale-95 hover:shadow-neo-sm shadow-neo'
                }
                ${isShaking ? 'animate-shake' : ''}
              `}
              style={{
                border: '3px solid #1a1a2e',
                boxShadow: isSelected ? '3px 3px 0 #1a1a2e' : '4px 4px 0 #1a1a2e',
                background: isSelected ? ball.bgColor : '#fff',
                animationDelay: `${idx * 0.04}s`,
              }}
            >
              <div className="text-4xl mb-1.5 leading-none">{ball.emoji}</div>
              <div
                className="font-bangers text-base leading-tight"
                style={{ color: ball.accentColor }}
              >
                {ball.nameZh}
              </div>
              <div className="text-[10px] text-gray-400 font-nunito mt-0.5 leading-tight">
                {ball.nameEn}
              </div>
              <div className="text-[10px] text-gray-400 font-nunito mt-1 leading-tight hidden md:block">
                {ball.description}
              </div>
              {isSelected && (
                <div
                  className="absolute -top-2 -right-2 bg-pokeyellow border-2 border-dark rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce-in"
                >
                  ✓
                </div>
              )}
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="mt-4 p-3 rounded-xl border-2 border-yellow-300 bg-yellow-50 flex items-center gap-3 animate-slide-up">
          <span className="text-2xl">{selected.emoji}</span>
          <div>
            <span className="font-bangers text-lg text-dark">{selected.nameZh}</span>
            <span className="text-gray-400 font-nunito text-sm ml-2">· {selected.description}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-5">
        <button onClick={() => setStep(1)} className="btn-ghost px-5 py-3 text-xl">
          ← 返回
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!selected}
          className="btn-yellow flex-1 py-3 text-2xl"
        >
          选择宝可梦 →
        </button>
      </div>
    </div>
  )
}
