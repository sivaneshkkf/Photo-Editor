/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          primary: "#121212",
          secondary: "#27272a",
          accent1: "#FF6500",
          accent2: "#813200",
          textHead: "#E4E3E3",
          textpara: "#7E7E7E",
          gradient1: "rgb(52, 52, 52,0.8)",
          gradient2: "rgba(63, 63, 63,0.95)",
          icon: "#C6C6C6",
          hoverIconBg: "#3a3a3e",
      }
    },
  },
  plugins: [],
}

