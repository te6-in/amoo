/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import ('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "",
    // not a component
    "^@/(?!.*/_components/)(?!components/.*$).*$",
    "",
    // component from _components
    "^@/.*/_components/.*$",
    "",
    // global components
    "^@/components/.*$",
    "",
    "^lucide-react$",
    "",
    "^next/",
    "",
    "^react$|^react-dom$",
    "",
    "<TYPES>",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
