/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f8ff',
        primary: {
          DEFAULT: '#007bff',
          hover: '#0056b3',
        },
      },
    },
  },
  plugins: [],
}
