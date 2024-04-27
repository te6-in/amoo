import { te6TailwindPreset } from "@te6/ui";
import { type Config } from "tailwindcss";
import { amber, blue, neutral } from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx", "./node_modules/@te6/ui/dist/index.js"],
  presets: [te6TailwindPreset],
  theme: {
    colors: {
      body: {
        DEFAULT: "#f7f7f7",
        dark: "#1f1f1f",
      },
      base: neutral,
      "base-dark": neutral,
      primary: blue,
      accent: amber,
    },
    extend: {
      minHeight: {
        // @ts-expect-error this can be an array
        screen: ["100vh", "100dvh"],
      },
      height: {
        // @ts-expect-error this can be an array
        screen: ["100vh", "100dvh"],
      },
      fontFamily: {
        sans: ["Pretendard\\ Variable", "Pretendard", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
