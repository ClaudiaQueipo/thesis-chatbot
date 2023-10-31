// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: [
        '"Inter var", sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32'
        },
      ],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [    nextui({
    themes: {
      light: {
        colors: {
          primary: "#FFD600",
          secondary: "#5E17EB",
          //default: "#000000",
        }
      },
      dark: {
        colors: {
          // primary: "#5E17EB",
          // secondary: "#FFD600",
          //default: "#5E17EB",
        }
      },
    },
  }),
]
}