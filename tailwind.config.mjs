/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'club-black': '#121212',
        'club-green': {
          dark: '#1a5f3f',
          light: '#2a7f5f',
        },
      },
      backgroundColor: {
        'glass': 'rgba(26, 95, 63, 0.2)',
      },
    },
  },
  plugins: [],
}
