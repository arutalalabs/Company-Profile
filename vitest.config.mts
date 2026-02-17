import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/components/test-setup.ts'],
        coverage: {
            exclude: [
                'next.config.ts',
                'postcss.config.mjs',
                '**/*.e2e.tsx',
                'eslint.config.mjs',
                'playwright.config.ts',
                'vitest.config.mts',
                'next-env.d.ts',
                '.next'
            ]
        }
    }
})
