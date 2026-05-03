'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import {
  stepAtom, selectedPokemonAtom, isGeneratingAtom,
  generatedImageAtom, avatarUrlAtom, generateErrorAtom,
} from '@/store/atoms'
import { getPokemonByType, getPokemonImageUrl, type PokemonType } from '@/lib/pokemon'

const TABS: { type: PokemonType; label: string; emoji: string; bg: string; active: string; text: string }[] = [
  { type: 'grass',  label: 'Grass',  emoji: '🌿', bg: '#fff', active: '#D8F3DC', text: '#2D6A4F' },
  { type: 'fire',   label: 'Fire',   emoji: '🔥', bg: '#fff', active: '#FFE8E0', text: '#C1440E' },
  { type: 'water',  label: 'Water',  emoji: '💧', bg: '#fff', active: '#D6EAF8', text: '#1B4F72' },
  { type: 'random', label: 'All-Star', emoji: '✨', bg: '#fff', active: '#F3E8FF', text: '#6B2FA0' },
]

export default function Step3Pokemon() {
  const [, setStep] = useAtom(stepAtom)
  const [selected, setSelected] = useAtom(selectedPokemonAtom)
  const [, setIsGenerating] = useAtom(isGeneratingAtom)
  const [, setGeneratedImage] = useAtom(generatedImageAtom)
  const [avatarUrl] = useAtom(avatarUrlAtom)
  const [, setGenerateError] = useAtom(generateErrorAtom)

  const [activeTab, setActiveTab] = useState<PokemonType>('grass')

  const list = getPokemonByType(activeTab)
  const activeTabMeta = TABS.find((t) => t.type === activeTab)!

  const handleGenerate = async () => {
    if (!selected) return
    setIsGenerating(true)
    setGeneratedImage('')
    setGenerateError('')
    setStep(3)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatarUrl,
          pokemonName: selected.nameEn,
          pokemonNameZh: selected.nameZh,
          pokemonId: selected.id,
        }),
      })
      const data = await res.json()
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
      } else {
        setGenerateError(data.error || 'Generation failed, please try again')
      }
    } catch {
      setGenerateError('Network error, please try again')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="card p-6 md:p-8 animate-pop-in">
      <div className="text-center mb-5">
        <div className="text-5xl mb-3 animate-float inline-block">🎯</div>
        <h2 className="font-bangers text-3xl md:text-4xl text-dark tracking-wide">
          Pick Your Favorite Pokémon
        </h2>
        <p className="text-gray-500 font-nunito text-sm mt-1">Who&apos;s your forever NO.1?</p>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className="flex-1 py-2.5 px-1 rounded-xl border-2 border-dark font-bangers text-sm transition-all duration-200"
            style={{
              border: '2.5px solid #1a1a2e',
              background: activeTab === tab.type ? tab.active : tab.bg,
              color: activeTab === tab.type ? tab.text : '#888',
              boxShadow: activeTab === tab.type ? '2px 2px 0 #1a1a2e' : '3px 3px 0 #1a1a2e',
              transform: activeTab === tab.type ? 'translate(1px,1px)' : '',
            }}
          >
            <span className="mr-1">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pokemon grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-0.5">
        {list.map((pokemon, idx) => {
          const isSelected = selected?.id === pokemon.id
          return (
            <button
              key={pokemon.id}
              onClick={() => setSelected(pokemon)}
              className={`
                relative p-2 rounded-2xl border-2 text-center transition-all duration-150
                ${isSelected
                  ? 'scale-95 border-dark'
                  : 'border-gray-200 hover:border-dark hover:scale-95'
                }
              `}
              style={{
                background: isSelected ? activeTabMeta.active : '#fafafa',
                boxShadow: isSelected ? '2px 2px 0 #1a1a2e' : 'none',
                animationDelay: `${idx * 0.04}s`,
              }}
            >
              <img
                src={getPokemonImageUrl(pokemon.id)}
                alt={pokemon.nameEn}
                className="w-14 h-14 mx-auto object-contain"
                loading="lazy"
              />
              <div className="font-bangers text-[11px] text-dark leading-tight mt-1">
                {pokemon.nameEn}
              </div>
              <div className="text-[9px] text-gray-400 font-nunito">
                #{String(pokemon.id).padStart(3, '0')}
              </div>
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 bg-pokeyellow border-2 border-dark rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold animate-bounce-in">
                  ♥
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected preview */}
      {selected && (
        <div className="mt-3 p-3 rounded-xl border-2 border-yellow-300 bg-yellow-50 flex items-center gap-3 animate-slide-up">
          <img
            src={getPokemonImageUrl(selected.id)}
            alt={selected.nameEn}
            className="w-12 h-12 object-contain"
          />
          <div className="flex-1">
            <div className="font-bangers text-xl text-dark leading-tight">{selected.nameEn}</div>
            <div className="text-xs text-gray-500 font-nunito">
              #{String(selected.id).padStart(3, '0')}
              {selected.generation ? ` · Gen ${selected.generation}` : ''}
            </div>
          </div>
          <span className="text-2xl animate-float">♥</span>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button onClick={() => setStep(1)} className="btn-ghost px-5 py-3 text-xl">
          ← Back
        </button>
        <button
          onClick={handleGenerate}
          disabled={!selected}
          className="btn-red flex-1 py-3 text-2xl"
        >
          🎨 Generate!
        </button>
      </div>
    </div>
  )
}
