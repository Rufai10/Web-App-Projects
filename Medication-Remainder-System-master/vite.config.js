import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Medication-Remainder-System/', // 👈 Your GitHub repo name
  plugins: [tailwindcss(), react()]
});
