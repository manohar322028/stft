import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

server_url = import.meta.env.VITE_SERVER_URL;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": { server_url },
    },
  },
  plugins: [react()],
});
