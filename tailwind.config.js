// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#fdfcf9",
          100: "#f9f6ef",
          200: "#f1ebdc",
          300: "#e8e0ca",
          400: "#d6c7a6",
          500: "#c4ae82",
        },
        sage: {
          50: "#f3f7f4",
          100: "#dfe9e3",
          300: "#a9c1af",
          400: "#8fb89a",
          500: "#7aa683",
          600: "#6b8f71",
          700: "#4a6651",
          800: "#2f4a36",
          900: "#1e3224",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        serif: ['"Merriweather"', "serif"],
      },
      animation: {
        gradient: 'gradient 10s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
