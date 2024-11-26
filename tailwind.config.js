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
        '70':'7%',
        '50p':'50%',
        '10p':'10%'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width:{
        '20p':'20%',
        '30p':'30%',
        '40p':'40%',
        '50p':'50%',
        '70p':'70%',
        '90p':'90%',
        '30p':'30%',
        '42p':'42%',
        '52.5p':'52.5%'
      },
      height:{
        '95p':'95%',
        '55p':'55%',
        '70p':'70%'
      },
      maxWidth: {
        '90p': '90%', // 새로운 max-width 설정
        '300p':'300px',
        '500p':'500px'
      },
      minHeight:{
        '40p':'40px'
      },      
      minWidth:{
        '100p':'100px',
        '150p':'150px',
        '300p':'300px'
      },
      right:{
        '40p':'40%',
        '60p':'60%',
        '20ps':'20%'
      }
    },
  },
  plugins: [],
};
