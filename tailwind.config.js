/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'lg-background': "url('/assets/images/bg-sidebar-desktop.svg')",
        'sm-background': "url('/assets/images/bg-sidebar-mobile.svg')",
      }),
    },
  },
  plugins: [],
}

