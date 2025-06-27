/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'Georgia', 'serif'],
        'typewriter': ['Courier Prime', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

