module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mw: {
          canvas: '#0a0b0f',
          surface: '#12141a',
          raised: '#181b24',
          border: '#252a36',
          muted: '#8b92a3',
          up: '#4ade80',
          down: '#f87171',
        },
      },
      boxShadow: {
        card: '0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
