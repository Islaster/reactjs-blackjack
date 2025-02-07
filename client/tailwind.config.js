/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenFelt: "#00FF80", // Vibrant neon green, perfect for casino table accents
        richBlack: "#000000", // Deep black for elegant, high-contrast backgrounds
        gold: "#FFD700", // Bright and luxurious gold for accents and highlights
        silver: "#C0C0C0", // Neutral silver for subtle secondary highlights
        emeraldGreen: "#50C878", // Bright and fresh green for success and buttons
        royalPurple: "#6A0DAD", // Vibrant purple with a premium feel for exclusive features
        deepBlue: "#1E3A8A", // Rich, calm blue for headers and secondary elements
        electricBlue: "#00FFFF", // Striking neon blue for glowing effects and text
        burntOrange: "#FF4500", // Bright neon orange for call-to-action elements
      },
      boxShadow: {
        "leaderboard-glow":
          "0 6px 10px -4px rgba(30, 58, 138, 0.6), 0 8px 20px -6px rgba(255, 215, 0, 0.8)",
        "neon-red":
          "0 0 8px rgba(255, 0, 0, 0.8), 0 0 16px rgba(255, 0, 0, 0.5)", // Neon glow for "LOST" sign
      },
      keyframes: {
        fadeShake: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.8) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1) rotate(5deg)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1) rotate(-5deg)",
          },
        },
      },
      animation: {
        "fade-shake": "fadeShake 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
