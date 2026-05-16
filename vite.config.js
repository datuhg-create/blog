import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // ⚠️ 改成你的仓库名，例如 /blog/  如果是 username.github.io 则填 /
  base: '/blog/',
  server: { port: 5173, host: true }
})
