/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "800px",
      lg: "1240px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
        alata: ["Alata"],
      },
      keyframes: {
        headShake: {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-6px) rotateY(-9deg)",
          },

          "18.5%": {
            transform: "translateX(5px) rotateY(7deg)",
          },

          "31.5%": {
            transform: "translateX(-3px) rotateY(-5deg)",
          },

          "43.5%": {
            transform: "translateX(2px) rotateY(3deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        rubberBand: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },

          "30%": {
            transform: "scale3d(1.25, 0.75, 1)",
          },

          "40%": {
            transform: "scale3d(0.75, 1.25, 1)",
          },

          "50%": {
            transform: "scale3d(1.15, 0.85, 1)",
          },

          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },

          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
        flash: {
          "25%, 40%": { opacity: "0" },
          "50%": { opacity: "1" },
          "75%": { opacity: "0" },
        },
        heartBeat: {
          "0%": { transform: "scale(1);" },
          "14%": { transform: "scale(1.3);" },
          "28%": { transform: "scale(1);" },
          "42%": { transform: "scale(1.3);" },
          "70%": { transform: "scale(1);" },
        },
      },
      animation: {
        headShake: "headShake 2s 5",
        wiggle: "wiggle 1s ease-in-out 2",
        rubberBand: "rubberBand 1s 2",
        flash: "flash 2s 2",
        heartBeat: "heartBeat 1.5s 1",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
