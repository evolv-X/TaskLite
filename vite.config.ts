import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Замените на имя вашего репозитория
const repoName = 'TaskLite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Важно для GitHub Pages
  base: `/${repoName}/`,
})
