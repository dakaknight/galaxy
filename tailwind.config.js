/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { swangz: { gold: "#b78e3c" } },
      fontFamily: { inter: ["Inter", "sans-serif"] }
    },
  },
  plugins: [],
}
