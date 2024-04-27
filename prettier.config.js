/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import ('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/(?!components/).*$",
    "^@/components/.*$",
    "^next/",
    "^react$|^react-dom$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
};

export default config;
