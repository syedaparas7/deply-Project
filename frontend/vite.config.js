import { defineConfig } from "vite"; 
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://deploy-mybackend-production-api.up.railway.app/",
        changeOrigin: true,
        secure: false, // If using HTTPS without a valid SSL certificate
      },
    },
  },
});
