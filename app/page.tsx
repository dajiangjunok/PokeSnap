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
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-pokered/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-pokeblue/10 blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 rounded-full bg-pokeyellow/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center flex items-center">
            <Image src="/logo.gif" alt="monad" width={50} height={50} className='mr-2' /> 
          <h1 className="font-bangers text-6xl md:text-7xl text-pokeyellow tracking-widest drop-shadow-[0_4px_0px_rgba(0,0,0,0.9)]">
            PokéSnap
          </h1>
         
        </div>
         <p className="text-white/60 font-nunito text-sm md:text-base mt-1 tracking-wide">
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
        <p className="text-white/20 font-nunito text-xs text-center">
          Powered by GPT-4o + MS Paint™ chaos algorithm 🖱️
        </p>
      </div>
    </main>
  )
}
