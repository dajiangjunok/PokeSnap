'use client'

import { useAtom } from 'jotai'
import { stepAtom } from '@/store/atoms'
import StepIndicator from '@/components/StepIndicator'
import Step1Username from '@/components/Step1Username'
import Step3Pokemon from '@/components/Step3Pokemon'
import Step4Result from '@/components/Step4Result'
import Image from 'next/image'

export default function Home() {
  const [step] = useAtom(stepAtom)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-pokered/25 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-pokelavender/25 blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-52 h-52 rounded-full bg-pokeyellow/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-pokeblue/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center flex items-center gap-2">
          <Image src="/logo.gif" alt="monad" width={50} height={50} className="drop-shadow-lg" />
          <h1
            className="font-bangers text-6xl md:text-7xl tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #FF6BA8, #B89FF8, #FF9BC3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PokéSnap
          </h1>
        </div>
        <p className="text-dark/50 font-nunito font-semibold text-sm md:text-base -mt-3 tracking-wide">
          Your Pokémon avatar generator ✨
        </p>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Step content */}
        <div className="w-full">
          {step === 1 && <Step1Username />}
          {step === 2 && <Step3Pokemon />}
          {step === 3 && <Step4Result />}
        </div>

        {/* Footer */}
        <p className="text-dark/30 font-nunito text-xs text-center">
          Powered by GPT-4o + MS Paint™ chaos algorithm 🖱️
        </p>
      </div>
    </main>
  )
}
