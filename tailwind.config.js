/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius:{
        '1p':"1%",
        '3p':'3%',
        "7p":"7p",
        '50p':'50%',
        '10p':'10%'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width:{
        '50p':'50%',
        '70p':'70%',
        '90p':'90%',
        '30p':'30%'

      },
      height:{
        '95p':'95%',
        '55p':'55%',
        '70p':'70%'
      }
    },
  },
  plugins: [],
};
