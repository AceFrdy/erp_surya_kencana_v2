import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        chunkSizeWarningLimit: 500, // Atur batas ukuran chunk
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Jika ingin menetapkan manual chunks berdasarkan kondisi tertentu
                    if (id.includes('node_modules')) {
                        return 'vendor'; // Menghasilkan chunk terpisah untuk node_modules
                    }
                },
            },
        },
    },
});
