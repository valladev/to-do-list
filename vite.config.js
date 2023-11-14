import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import VitePluginWindicss from 'vite-plugin-windicss';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePluginWindicss()],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
