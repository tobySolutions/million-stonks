import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite(), react(), Inspect()],
})
