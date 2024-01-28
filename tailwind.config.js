/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contents/content.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
