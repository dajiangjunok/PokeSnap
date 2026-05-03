'use client'

import Image from 'next/image'
import { useAtom } from 'jotai'
import {
  stepAtom, generatedImageAtom, isGeneratingAtom,
  selectedPokemonAtom, avatarUrlAtom, usernameAtom, generateErrorAtom,
} from '@/store/atoms'
import { getPokemonImageUrl } from '@/lib/pokemon'

export default function Step4Result() {
  const [, setStep] = useAtom(stepAtom)
  const [generatedImage] = useAtom(generatedImageAtom)
  const [isGenerating] = useAtom(isGeneratingAtom)
  const [selectedPokemon] = useAtom(selectedPokemonAtom)
  const [avatarUrl] = useAtom(avatarUrlAtom)
  const [username] = useAtom(usernameAtom)
  const [error] = useAtom(generateErrorAtom)

  const handleDownload = () => {
    if (!generatedImage) return
    const a = document.createElement('a')
    a.href = generatedImage
    a.download = `pokesnap-${username}-${selectedPokemon?.nameEn ?? 'pokemon'}.png`
    a.target = '_blank'
    a.click()
  }

  const handleShareX = () => {
    const text = `Just fused my Twitter avatar with ${selectedPokemon?.nameEn ?? 'a Pokémon'} using PokéSnap 🎨⚡\n\nThe AI drew it in MS Paint style and honestly... it's a masterpiece 🖱️\n\n#PokéSnap @buildanythingso`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (isGenerating) {
    return (
      <div className="card p-8 animate-pop-in text-center">
        <div className="mb-4 animate-bounce inline-block">
          <Image src="/pokeball.svg" alt="Pokéball" width={80} height={80} />
        </div>
        <h2 className="font-bangers text-3xl md:text-4xl text-dark mb-2 tracking-wide">
          AI is cooking... 🍳
        </h2>
        <p className="text-dark/55 font-nunito font-semibold text-sm">
          Fusing you with{' '}
          <span className="font-bold text-pokepink">{selectedPokemon?.nameEn}</span>
          , this may take 15–30 seconds ✨
        </p>
        <div className="mt-8 flex justify-center gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #FF9BC3, #B89FF8)',
                animation: 'bounce 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
                boxShadow: '0 2px 8px rgba(255, 107, 168, 0.35)',
              }}
            />
          ))}
        </div>
        <p className="text-dark/35 font-nunito text-xs mt-6">
          Running the MS Paint™ masterpiece algorithm 🖱️
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card p-8 animate-pop-in text-center">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="font-bangers text-3xl text-dark mb-2">Something went wrong</h2>
        <p className="text-pokered font-nunito font-semibold text-sm mb-6">{error}</p>
        <button onClick={() => setStep(2)} className="btn-yellow px-8 py-3 text-base">
          Try Again ✨
        </button>
      </div>
    )
  }

  return (
    <div className="card p-6 md:p-8 animate-pop-in text-center">
      <div className="text-5xl mb-2 animate-bounce inline-block">🎉</div>
      <h2 className="font-bangers text-3xl md:text-4xl text-dark mb-1 tracking-wide">
        Your avatar is ready!
      </h2>
      <p className="text-dark/50 font-nunito font-semibold text-sm mb-5">
        Behold your magnificent Pokémon fusion 💖
      </p>

      {/* Before / After comparison */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="text-center">
          <div className="text-xs text-dark/45 font-nunito font-bold mb-1.5">You</div>
          <div
            className="w-20 h-20 rounded-full overflow-hidden"
            style={{
              border: '2px solid rgba(255, 145, 186, 0.50)',
              boxShadow: '0 4px 14px rgba(255, 107, 168, 0.18)',
            }}
          >
            <img src={avatarUrl} alt="Original" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xl animate-sparkle">💕</span>
          <span className="text-xl animate-sparkle" style={{ animationDelay: '0.4s' }}>✨</span>
        </div>

        <div className="text-center">
          <div className="text-xs text-dark/45 font-nunito font-bold mb-1.5">{selectedPokemon?.nameEn}</div>
          <div
            className="w-20 h-20 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255,240,250,0.8)',
              border: '2px solid rgba(184, 159, 248, 0.50)',
              boxShadow: '0 4px 14px rgba(184, 159, 248, 0.20)',
            }}
          >
            <img
              src={getPokemonImageUrl(selectedPokemon?.id ?? 25)}
              alt={selectedPokemon?.nameEn}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xl animate-sparkle" style={{ animationDelay: '0.8s' }}>✨</span>
          <span className="text-xl animate-sparkle" style={{ animationDelay: '1.2s' }}>💕</span>
        </div>

        <div className="text-center">
          <div className="text-xs text-dark/45 font-nunito font-bold mb-1.5">Result</div>
          <div
            className="w-20 h-20 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,240,250,0.8)',
              border: '2px solid rgba(255, 107, 168, 0.40)',
              boxShadow: '0 4px 14px rgba(255, 107, 168, 0.15)',
            }}
          >
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-pokepink/40 text-2xl">?</div>
            )}
          </div>
        </div>
      </div>

      {/* Large preview */}
      {generatedImage && (
        <div className="mb-5 animate-bounce-in">
          <div
            className="w-52 h-52 mx-auto rounded-3xl overflow-hidden"
            style={{
              border: '2px solid rgba(255, 145, 186, 0.45)',
              boxShadow: '0 16px 48px rgba(255, 107, 168, 0.22), 0 4px 16px rgba(0, 0, 0, 0.06)',
            }}
          >
            <img src={generatedImage} alt="Generated avatar" className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-dark/40 font-nunito font-semibold mt-2">
            A genuine MS Paint™ masterpiece 🖱️
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {generatedImage && (
          <>
            <button onClick={handleDownload} className="btn-yellow w-full py-3.5 text-base">
              ⬇️ Download Avatar
            </button>
            <button onClick={handleShareX} className="btn-red w-full py-3.5 text-base">
              𝕏 Share on X
            </button>
          </>
        )}
        <button
          onClick={() => setStep(1)}
          className="text-pokepink/60 font-nunito font-bold text-base hover:text-pokered transition-colors py-2"
        >
          Start Over ↺
        </button>
      </div>
    </div>
  )
}
