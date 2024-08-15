/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'vspot-purple': '#e802f7',
        'vspot-blue': '#871be1',
        'vspot-primary-bg': '#181a1b',
        'vspot-secondary-bg': '#313131',
        'vspot-text-pimary': '#eeeeee',
        'vspot-text-hovered': '#cccccc',
        'vspot-text-error': '#dd1111',
        'vspot-green': '#00ff01',
        'vspot-link': '#5555DD',
        'vspot-link-hover': '#0000EE',
        'vspot-warn': '#fcba03'
      },
      'animation': {
        'devcolors': 'devcolors 5s linear infinite'
      },
      'keyframes': {
        'devcolors': {
          '0%, 100%': {
            'color': '#00ff01',
            'border-color': '#00ff01'
          },
          '50%': {
            'color': '#e802f7',
            'border-color': '#e802f7'
          }
        }
      }
    },
  },
  plugins: [],
}

