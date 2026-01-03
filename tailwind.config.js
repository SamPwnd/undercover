/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'background': '#050505',
                'surface': '#151515',
                'surface-highlight': '#252525',
                'deep-purple': '#240b36', // Dark background
                'neon-blue': '#03e9f4',   // Glow
                'hot-pink': '#ff0055',    // Accent
                'orange': '#ff9100',      // Secondary accent
            },
        },
    },
    plugins: [],
}
