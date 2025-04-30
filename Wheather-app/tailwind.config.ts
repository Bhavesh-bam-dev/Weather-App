import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,html}', // update path based on your project structure
      ],
    darkMode: "class",
    theme: {
        extend: {
        colors: {
            brand: "var(--accent-color)",
            card: "var(--card-bg)",
            bg: "var(--bg-color)",
            text: "var(--text-color)",
            secondary: "var(--secondary-color)",
            border: "var(--border-color)",
            toggle: "var(--toggle-bg-color)"
        },
        },
    },
    plugins: [],
}

export default config
