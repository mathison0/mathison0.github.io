import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * GitHub Pages는 SPA 라우팅을 모르기 때문에 /projects 같은 경로로 직접 들어오면
 * 404.html을 내려준다. index.html을 404.html로 복사해 두면 그 경우에도
 * 같은 앱 셸이 로드되고 React Router가 경로를 해석한다.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const index = resolve(process.cwd(), 'dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(process.cwd(), 'dist/404.html'))
      }
    },
  }
}

export default defineConfig({
  // mathison0.github.io는 user site이므로 루트 경로에 배포된다.
  base: '/',
  plugins: [react(), spaFallback()],
})
