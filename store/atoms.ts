import { atom } from 'jotai'
import type { Pokemon } from '@/lib/pokemon'
import type { Pokeball } from '@/lib/pokeball'

export const stepAtom = atom<number>(1)
export const usernameAtom = atom<string>('')
export const avatarUrlAtom = atom<string>('')
export const selectedPokeballAtom = atom<Pokeball | null>(null)
export const selectedPokemonAtom = atom<Pokemon | null>(null)
export const generatedImageAtom = atom<string>('')
export const isGeneratingAtom = atom<boolean>(false)
export const generateErrorAtom = atom<string>('')
