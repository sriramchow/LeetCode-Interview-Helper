/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan:  '#06b6d4',
          blue:  '#3b82f6',
          glow:  '#22d3ee',
        },
        dark: {
          950: '#050510',
          900: '#0a0a1a',
          800: '#0d1117',
          700: '#111827',
          600: '#1a2035',
        }
      },
      boxShadow: {
        'neon-sm':  '0 0 10px rgba(6,182,212,0.3)',
        'neon':     '0 0 20px rgba(6,182,212,0.5)',
        'neon-lg':  '0 0 40px rgba(6,182,212,0.6), 0 0 80px rgba(6,182,212,0.2)',
        'neon-blue':'0 0 20px rgba(59,130,246,0.5)',
        'card':     '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'glow-pulse':  'glowPulse 2s ease-in-out infinite',
        'slide-up':    'slideUp 0.5s ease-out forwards',
        'float':       'float 6s ease-in-out infinite',
        'fade-in':     'fadeIn 0.4s ease-out forwards',
        'count-up':    'countUp 1s ease-out forwards',
        'scan-line':   'scanLine 3s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 10px rgba(6,182,212,0.3)' },
          '50%':     { boxShadow: '0 0 30px rgba(6,182,212,0.8), 0 0 60px rgba(6,182,212,0.3)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6,182,212,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(10,10,26,0.95) 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}
