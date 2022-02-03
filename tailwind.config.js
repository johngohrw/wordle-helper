module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "360px",
      sm: "450px",
      md: "540px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {},
  },
  variants: {
    borderWidth: ["first", "last"],
  },
  plugins: [],
};
