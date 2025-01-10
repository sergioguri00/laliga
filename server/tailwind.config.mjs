/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'la-liga-font': ['laligafont', 'sans-serif'], // Aquí defines tu fuente
			  },
		},
	},
	plugins: [],
}
