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
          AI is cooking...
        </h2>
        <p className="text-gray-500 font-nunito text-sm">
          Fusing you with{' '}
          <span className="font-bold text-dark">{selectedPokemon?.nameEn}</span>
          , this may take 15–30 seconds ✨
        </p>
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-pokeyellow border-2 border-dark rounded-full"
              style={{
                animation: 'bounce 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <p className="text-gray-400 font-nunito text-xs mt-6">
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
        <p className="text-red-500 font-nunito text-sm mb-6">{error}</p>
        <button onClick={() => setStep(2)} className="btn-yellow px-8 py-3 text-xl">
          Try Again
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
      <p className="text-gray-500 font-nunito text-sm mb-5">Behold your magnificent Pokémon fusion</p>

      {/* Before / After comparison */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="text-center">
          <div className="text-xs text-gray-400 font-nunito mb-1.5">You</div>
          <div
            className="w-20 h-20 rounded-full overflow-hidden"
            style={{ border: '3px solid #1a1a2e', boxShadow: '3px 3px 0 #1a1a2e' }}
          >
            <img src={avatarUrl} alt="Original" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl animate-sparkle">⚡</span>
          <span className="text-2xl animate-sparkle" style={{ animationDelay: '0.4s' }}>⚡</span>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-400 font-nunito mb-1.5">{selectedPokemon?.nameEn}</div>
          <div
            className="w-20 h-20 rounded-full overflow-hidden bg-gray-50"
            style={{ border: '3px solid #1a1a2e', boxShadow: '3px 3px 0 #1a1a2e' }}
          >
            <img
              src={getPokemonImageUrl(selectedPokemon?.id ?? 25)}
              alt={selectedPokemon?.nameEn}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl animate-sparkle" style={{ animationDelay: '0.8s' }}>⚡</span>
          <span className="text-2xl animate-sparkle" style={{ animationDelay: '1.2s' }}>⚡</span>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-400 font-nunito mb-1.5">Result</div>
          <div
            className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100"
            style={{ border: '3px solid #1a1a2e', boxShadow: '3px 3px 0 #1a1a2e' }}
          >
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">?</div>
            )}
          </div>
        </div>
      </div>

      {/* Large preview */}
      {generatedImage && (
        <div className="mb-5 animate-bounce-in">
          <div
            className="w-52 h-52 mx-auto rounded-2xl overflow-hidden"
            style={{ border: '4px solid #1a1a2e', boxShadow: '6px 6px 0 #1a1a2e' }}
          >
            <img src={generatedImage} alt="Generated avatar" className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-gray-400 font-nunito mt-2">
            A genuine MS Paint™ masterpiece 🖱️
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {generatedImage && (
          <>
            <button onClick={handleDownload} className="btn-yellow w-full py-3.5 text-2xl">
              ⬇️ Download Avatar
            </button>
            <button onClick={handleShareX} className="btn-red w-full py-3.5 text-2xl">
              𝕏 Share on X
            </button>
          </>
        )}
        <button
          onClick={() => setStep(1)}
          className="text-gray-400 font-bangers text-lg hover:text-dark transition-colors py-2"
        >
          Start Over ↺
        </button>
      </div>
    </div>
  )
}
