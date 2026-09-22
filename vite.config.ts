import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, Plugin } from 'vite';

function entryFallbackPlugin(): Plugin {
  return {
    name: 'entry-fallback-plugin',
    enforce: 'pre',
    resolveId(id) {
      if (id === '/src/main.tsx' || id === './src/main.tsx' || id.endsWith('src/main.tsx')) {
        const filePath = path.resolve(process.cwd(), 'src/main.tsx');
        if (!fs.existsSync(filePath)) {
          return '\0virtual:src/main.tsx';
        }
      }
      return null;
    },
    load(id) {
      if (id === '\0virtual:src/main.tsx') {
        const appPath = path.resolve(process.cwd(), 'src/App.tsx');
        const cssPath = path.resolve(process.cwd(), 'src/index.css');
        return `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from ${JSON.stringify(appPath)};
import ${JSON.stringify(cssPath)};

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
`;
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [entryFallbackPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
