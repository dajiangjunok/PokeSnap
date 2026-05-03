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
        dark: '#1a1a2e',
        pokeyellow: '#FFE800',
        pokered: '#FF1744',
        pokeblue: '#00B4D8',
      },
      borderWidth: {
        '3': '3px',
        '3.5': '3.5px',
      },
      boxShadow: {
        neo: '4px 4px 0px #1a1a2e',
        'neo-sm': '3px 3px 0px #1a1a2e',
        'neo-lg': '6px 6px 0px #1a1a2e',
      },
    },
  },
  plugins: [],
}

export default config
