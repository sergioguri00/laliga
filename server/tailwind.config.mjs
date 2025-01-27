/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'la-liga-font': ['laligafont', 'sans-serif']
      },
      colors: {
        mainblack: '#00001B',
        laligared: '#FF0000'
      }
    }
  },
  plugins: []
}
