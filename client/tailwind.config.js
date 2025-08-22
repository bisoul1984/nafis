/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50, #f0f9f4)',
          100: 'var(--color-primary-100, #dcf2e3)',
          200: 'var(--color-primary-200, #bce5cc)',
          300: 'var(--color-primary-300, #8dd1a8)',
          400: 'var(--color-primary-400, #5bb57e)',
          500: 'var(--color-primary-500, #7C9885)', // Main brand green
          600: 'var(--color-primary-600, #5a8a6a)',
          700: 'var(--color-primary-700, #4a6f56)',
          800: 'var(--color-primary-800, #3f5a47)',
          900: 'var(--color-primary-900, #354a3c)',
        },
        secondary: {
          50: 'var(--color-secondary-50, #f8f7ff)',
          100: 'var(--color-secondary-100, #f0effe)',
          200: 'var(--color-secondary-200, #e6e6fa)', // Main lavender
          300: 'var(--color-secondary-300, #d1d0f7)',
          400: 'var(--color-secondary-400, #b3b1f2)',
          500: 'var(--color-secondary-500, #9b98ed)',
          600: 'var(--color-secondary-600, #8a87e8)',
          700: 'var(--color-secondary-700, #7a77d8)',
          800: 'var(--color-secondary-800, #6663c0)',
          900: 'var(--color-secondary-900, #56539b)',
        },
        accent: {
          50: '#fefefc',
          100: '#fdfcf9',
          200: '#faf8f2',
          300: '#f5f5dc', // Main beige
          400: '#f0f0d0',
          500: '#e8e8c0',
          600: '#d8d8a0',
          700: '#c0c080',
          800: '#a8a860',
          900: '#909040',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'Times New Roman', 'serif'],
        'body': ['Inter', 'Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'accent': ['Montserrat', 'Inter', 'sans-serif'],
        'amharic': ['Noto Sans Ethiopic', 'Inter', 'sans-serif'],
        'sans': ['Inter', 'Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['Playfair Display', 'Times New Roman', 'serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '9xl': ['8rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        // Enhanced typography sizes
        'display-1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-2': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'display-3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '0em' }],
        'lead': ['1.25rem', { lineHeight: '1.75', letterSpacing: '0em' }],
        'body-large': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0em' }],
        'body-small': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
        'extra-loose': '2.5',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(124, 152, 133, 0.3)',
        'glow-lg': '0 0 40px rgba(124, 152, 133, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'text-reveal': 'textReveal 0.8s ease-out forwards',
        'text-slide-in-left': 'textSlideInLeft 0.6s ease-out forwards',
        'text-slide-in-right': 'textSlideInRight 0.6s ease-out forwards',
        'text-fade-in': 'textFadeIn 1s ease-out forwards',
        'text-scale-in': 'textScaleIn 0.6s ease-out forwards',
        'typewriter': 'typewriter 3s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textSlideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        textSlideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        textFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        textScaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        textGlow: {
          'from': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
          'to': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%237C9885\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom typography plugin
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-readable': {
          lineHeight: theme('lineHeight.relaxed'),
          letterSpacing: theme('letterSpacing.normal'),
          textWrap: 'pretty',
          maxWidth: '65ch',
        },
        '.text-readable-wide': {
          lineHeight: theme('lineHeight.loose'),
          letterSpacing: theme('letterSpacing.wide'),
          textWrap: 'pretty',
          maxWidth: '75ch',
        },
        '.text-readable-narrow': {
          lineHeight: theme('lineHeight.normal'),
          letterSpacing: theme('letterSpacing.tight'),
          textWrap: 'pretty',
          maxWidth: '55ch',
        },
        '.text-heading': {
          fontFamily: theme('fontFamily.display'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
          letterSpacing: theme('letterSpacing.tight'),
          textWrap: 'balance',
        },
        '.text-body': {
          fontFamily: theme('fontFamily.body'),
          fontWeight: theme('fontWeight.normal'),
          lineHeight: theme('lineHeight.relaxed'),
          letterSpacing: theme('letterSpacing.normal'),
          textWrap: 'pretty',
        },
        '.text-accent': {
          fontFamily: theme('fontFamily.accent'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.normal'),
          letterSpacing: theme('letterSpacing.wide'),
        },
        '.text-amharic': {
          fontFamily: theme('fontFamily.amharic'),
          fontWeight: theme('fontWeight.normal'),
          lineHeight: theme('lineHeight.relaxed'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.font-features': {
          fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "dlig" 1, "ss01" 1, "ss02" 1',
        },
        '.font-features-display': {
          fontFeatureSettings: '"kern" 1, "liga" 1, "dlig" 1, "swsh" 1, "salt" 1',
        },
        '.text-balance': {
          textWrap: 'balance',
        },
        '.text-pretty': {
          textWrap: 'pretty',
        },
        '.text-nowrap': {
          textWrap: 'nowrap',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 