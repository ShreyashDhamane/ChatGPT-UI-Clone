/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "custom-sans": [
          "ui-sans-serif",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Helvetica",
          "Apple Color Emoji",
          "Arial",
          "sans-serif",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      colors: {
        bg: {
          primary: "#212121",
          secondary: "#171717",
          tertiary: "#303030",
          popup: "#343434",
        },
        text: {
          primary: "#B4B4B4",
          secondary: "#B3B3B3",
          tertiary: "#808080",
          four: "#9B9B9B",
          link: "#ECECEC",
        },
      },
      borderRadius: {
        "4xl": "28px",
      },
      screens: {
        xs: "512px",
      },
    },
  },
  plugins: [],
  safelist: [
    "text-xs",
    "block",
    "hidden",
    "flex",
    "font-semibold",
    "px-2",
    "px-3",
    "font-bold",
    "font-normal",
    "text-xs",
    "text-sm",
    "text-text-primary",
    "text-white",
    "text-black",
    "border",
    "justify-start",
    "justify-end",
  ],
};
