import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv("mock", process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: {
      host: env.VITE_HOST,
      port: parseInt(env.VITE_PORT),
      strictPort: true,
    },
    base: ''
  });
}
