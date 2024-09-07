/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "translate-x-[70vw]",
    "-translate-x-[70vw]",
    "translate-y-[70vh]",
    "-translate-y-[70vh]",
  ],
};
