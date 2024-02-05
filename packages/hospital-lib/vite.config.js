// vite.config.js
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        tsconfigPaths(), // This plugin automatically resolves imports based on your tsconfig.json paths
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'index',
            fileName: (format) => `${format}/index.js`
        },
        rollupOptions: {
            // specify any other external dependencies here
            external: [],
            output: {
                // specify the global variable names for your external dependencies here
                globals: {},
                // specify the format of the output bundle
                format: 'es'
            }
        },
        outDir: 'dist'
    }
})