'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { usernameAtom, avatarUrlAtom, stepAtom } from '@/store/atoms'

export default function Step1Username() {
  const [, setUsername] = useAtom(usernameAtom)
  const [, setAvatarUrl] = useAtom(avatarUrlAtom)
  const [, setStep] = useAtom(stepAtom)

  const [input, setInput] = useState('')
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePreview = () => {
    const clean = input.replace('@', '').trim()
    if (!clean) return
    setLoading(true)
    setError('')
    setPreview('')

    const url = `https://unavatar.io/twitter/${clean}`
    const img = new window.Image()
    img.onload = () => {
      setPreview(url)
      setUsername(clean)
      setAvatarUrl(url)
      setLoading(false)
    }
    img.onerror = () => {
      const fallback = `https://unavatar.io/${clean}`
      setPreview(fallback)
      setUsername(clean)
      setAvatarUrl(fallback)
      setLoading(false)
    }
    img.src = url
  }

  return (
    <div className="card p-6 md:p-8 animate-pop-in">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2 animate-float inline-block">🐦</div>
        <h2 className="font-bangers text-3xl md:text-4xl text-dark tracking-wide">
          Enter your Twitter handle
        </h2>
        <p className="text-dark/50 font-nunito font-semibold text-sm mt-1">
          We&apos;ll grab your profile picture as the base
        </p>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pokepink font-bold text-lg select-none">
            @
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePreview()}
            placeholder="pokemonmaster"
            className="w-full pl-9 pr-4 py-3.5 rounded-2xl font-nunito font-semibold text-dark text-lg focus:outline-none focus:ring-2 focus:ring-pokepink/40 transition-all"
            style={{
              border: '1.5px solid rgba(255, 145, 186, 0.40)',
              boxShadow: '0 2px 8px rgba(255, 105, 157, 0.08)',
              background: 'rgba(255, 255, 255, 0.9)',
            }}
          />
        </div>
        <button
          onClick={handlePreview}
          disabled={loading || !input.trim()}
          className="btn-yellow px-5 py-3 text-base"
        >
          {loading ? '...' : 'Fetch ✨'}
        </button>
      </div>

      {error && (
        <p className="text-pokered font-nunito font-semibold text-sm mb-3 animate-slide-up">{error}</p>
      )}

      {preview && (
        <div className="mt-5 animate-pop-in">
          <div
            className="flex flex-col items-center gap-3 p-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,155,195,0.10), rgba(184,159,248,0.10))',
              border: '1.5px solid rgba(255, 145, 186, 0.30)',
            }}
          >
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full overflow-hidden"
                style={{
                  border: '2.5px solid rgba(255, 107, 168, 0.55)',
                  boxShadow: '0 4px 20px rgba(255, 107, 168, 0.22)',
                }}
              >
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={() => setError('Failed to load avatar — please check the username')}
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #FF9BC3, #B89FF8)' }}
              >
                ✓
              </div>
            </div>
            <p className="font-nunito text-dark/60 text-sm font-bold">
              @{input.replace('@', '').trim()}
            </p>
          </div>

          <button
            onClick={() => setStep(2)}
            className="btn-yellow w-full py-4 mt-4 text-lg"
          >
            Pick a Pokémon 🌸
          </button>
        </div>
      )}
    </div>
  )
}
