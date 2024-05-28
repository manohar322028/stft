import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config();

const server_url = process.env.VITE_SERVER_URL;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": server_url,
    },
  },
  plugins: [react()],
});
