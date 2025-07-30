/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Databricks Official Brand Colors
        databricks: {
          lava: {
            50: '#FFF5F4',
            100: '#FFE8E6',
            200: '#FFD1CC',
            300: '#FFB3AB',
            400: '#FF8A7A',
            500: '#FF6B52',
            600: '#FF3621', // Primary Lava 600
            700: '#E62E1A',
            800: '#CC2917',
            900: '#B32314',
          },
          navy: {
            50: '#F8F9FA',
            100: '#E9ECEF',
            200: '#DEE2E6',
            300: '#CED4DA',
            400: '#6C757D',
            500: '#495057',
            600: '#343A40',
            700: '#212529',
            800: '#131A29', // Primary Navy 800
            900: '#0A0E14',
          },
          oat: {
            light: '#F8F6F3',
            medium: '#F0EDE8',
            dark: '#E8E3DC',
          }
        },
        // Keep primary/secondary mapped to Databricks colors
        primary: {
          50: '#FFF5F4',
          100: '#FFE8E6',
          200: '#FFD1CC',
          300: '#FFB3AB',
          400: '#FF8A7A',
          500: '#FF6B52',
          600: '#FF3621', // Databricks Lava
          700: '#E62E1A',
          800: '#CC2917',
          900: '#B32314',
        },
        secondary: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#6C757D',
          500: '#495057',
          600: '#343A40',
          700: '#212529',
          800: '#131A29', // Databricks Navy
          900: '#0A0E14',
        },
        // Neutral colors using oat tones
        neutral: {
          50: '#F8F6F3', // Oat Light
          100: '#F0EDE8', // Oat Medium
          200: '#E8E3DC',
          300: '#D4CFC6',
          400: '#A8A29A',
          500: '#7C766E',
          600: '#5A544C',
          700: '#3E3832',
          800: '#2A251F',
          900: '#1A1612',
          950: '#0F0D0A',
        },
        // Keep existing success, warning, error colors but adjust to be more Databricks-friendly
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
      fontFamily: {
        // Databricks Official Typography
        sans: [
          'DM Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'DM Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(19, 26, 41, 0.1), 0 2px 4px -1px rgba(19, 26, 41, 0.06)',
        dropdown: '0 10px 15px -3px rgba(19, 26, 41, 0.1), 0 4px 6px -2px rgba(19, 26, 41, 0.05)',
        databricks: '0 10px 25px -5px rgba(255, 54, 33, 0.1), 0 4px 6px -2px rgba(255, 54, 33, 0.05)',
        'databricks-navy': '0 10px 25px -5px rgba(19, 26, 41, 0.15), 0 4px 6px -2px rgba(19, 26, 41, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'databricks-glow': 'databricksGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        databricksGlow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 54, 33, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 54, 33, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};