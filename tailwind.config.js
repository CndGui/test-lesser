/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/routes/**/*.{js,ts,jsx,tsx,mdx,svelte}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,svelte}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}