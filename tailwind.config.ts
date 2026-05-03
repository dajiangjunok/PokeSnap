import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bangers: ['var(--font-bangers)', 'cursive'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      colors: {
        dark: '#4A2060',
        pokeyellow: '#FFD93D',
        pokered: '#FF6BA8',
        pokeblue: '#7CDBB5',
        pokepink: '#FF9BC3',
        pokelavender: '#B89FF8',
      },
      borderWidth: {
        '3': '3px',
        '3.5': '3.5px',
      },
      boxShadow: {
        neo: '0 8px 24px rgba(255, 105, 157, 0.12), 0 2px 6px rgba(0,0,0,0.04)',
        'neo-sm': '0 4px 16px rgba(255, 105, 157, 0.12), 0 1px 4px rgba(0,0,0,0.03)',
        'neo-lg': '0 12px 40px rgba(255, 105, 157, 0.18), 0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
