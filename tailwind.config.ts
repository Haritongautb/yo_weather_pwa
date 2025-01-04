import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        card_column: "1fr 1fr",
      },
      gridAutoRows: {
        card_column: "minmax(135px, 140px)",
      },
      boxShadow: {
        current_location_btn_shadow: "0 4px 40px 0 rgba(0, 0, 0, 0.25)",
        search_dark_mode_shadow: " 0 4px 40px 0 rgba(0, 0, 0, 0.25)",
        search_light_mode_shadow: "0 4px 40px 0 rgba(0, 0, 0, 0.25)",
        card_shadow: "10px 10px 4px 0 rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        dark_mode:
          "linear-gradient(131deg, #383838 0%, rgba(158, 158, 158, 0) 100%)",
        white_mode:
          "linear-gradient(135deg, #fff 0%, rgba(70, 97, 115, 0) 100%)",
        hourly_forecast_card:
          "linear-gradient(145deg, #f88508 0%, rgba(246, 250, 217, 0) 100%)",
        hourly_forecast_card_evening:
          "linear-gradient(155deg, #443d64 0%, rgba(101, 130, 198, 0) 100%)",
        location_icon: "linear-gradient(135deg, #ff7eb3, #ff758c)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
