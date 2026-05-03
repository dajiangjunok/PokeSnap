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
        <h2 className="font-bangers text-3xl md:text-4xl text-dark tracking-wide items-center flex ">
        Enter your Twitter handle
        </h2>
        <p className="text-gray-500 font-nunito text-sm mt-1">
          We'll grab your profile picture as the base
        </p>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg select-none">
            @
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePreview()}
            placeholder="pokemonmaster"
            className="w-full pl-9 pr-4 py-3.5 border-3 border-dark rounded-xl font-nunito text-dark text-lg focus:outline-none focus:ring-2 focus:ring-pokeyellow transition-all"
            style={{ border: '3px solid #1a1a2e', boxShadow: '3px 3px 0 #1a1a2e' }}
          />
        </div>
        <button
          onClick={handlePreview}
          disabled={loading || !input.trim()}
          className="btn-yellow px-5 py-3 text-xl"
        >
          {loading ? '...' : 'Fetch'}
        </button>
      </div>

      {error && (
        <p className="text-red-500 font-nunito text-sm mb-3 animate-slide-up">{error}</p>
      )}

      {preview && (
        <div className="mt-5 animate-pop-in">
          <div className="flex flex-col items-center gap-3 p-5 bg-yellow-50 rounded-xl border-2 border-yellow-300">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-3 border-dark"
                style={{ border: '3.5px solid #1a1a2e', boxShadow: '4px 4px 0 #1a1a2e' }}
              >
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={() => setError('Failed to load avatar — please check the username')}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-pokeyellow border-2 border-dark rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                ✓
              </div>
            </div>
            <p className="font-nunito text-gray-600 text-sm font-semibold">
              @{input.replace('@', '').trim()}
            </p>
          </div>

          <button
            onClick={() => setStep(2)}
            className="btn-yellow w-full py-4 mt-4 text-2xl"
          >
            Pick a Pokémon →
          </button>
        </div>
      )}
    </div>
  )
}
