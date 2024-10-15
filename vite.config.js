import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/efolio-w12/" : "/",
};
