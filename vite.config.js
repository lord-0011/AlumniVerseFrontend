import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Server configuration to proxy API requests
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://alumniversebackend.onrender.com', // Your backend server URL
  //       changeOrigin: true,
  //     },
  //   },
  // },
});