/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./screens/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
