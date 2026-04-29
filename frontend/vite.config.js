import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      '/api':{
        // target:"http://127.0.0.1:8000/api/v1/",
        target:"http://localhost:8000/api/v1/",
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

// import { defineConfig } from 'vite'
// export default defineConfig({
//   plugins: [
//     ,
//   ],
// })