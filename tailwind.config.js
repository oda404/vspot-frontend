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
        'vspot-text-hovered': '#dddddd',
        'vspot-text-error': '#ff0000',
        'vspot-green': '#00ff01',
        'vspot-link': '#0055EE',
        'vspot-link-hover': '#0000EE'
      },
      'animation': {
        'gradient': 'gradient 5s ease infinite',
        'simple': 'simple 1s linear',

      },
      'keyframes': {
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
      }
    },
  },
  plugins: [],
}

