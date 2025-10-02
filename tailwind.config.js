// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      // colors
      colors: {
        mainColor: "#28A745",
        // greenColor: "#4CAF50",
        bgColor: "#F7F7F7",
        halfWhite: "#FFFFFF80",
        stockColor: "#DBDBDB",
        whiteColor: "#FFFFFF",
        redColor: "#E53935",
        yellowColor: "#FFC107",
        blackColor: "#151515",
        descColor: "#15151580",
      
      },

      //font family
      fontFamily: {
        custom: ['"Poppins", sans-serif'], //font family
      },

      // font sizes
      fontSize: {
        h1: "26px",
        h2: "24px",
        h3: "20px",
        h4: "16px",
        h6: "12px",
        text1: "14px",
        text2: "10px",
        text3: "28px",
      },

      // font weight
      fontWeight: {
        b4: "400",
        b5: "500",
        b6: "600",
        b7: "700",
        b8: "800",
      },

      // border radius
      borderRadius: {
        custom: "10px",
      },

      borderColor: {
        custom: "#DBDBDB",
      },
    },
  },
  plugins: [],

};
