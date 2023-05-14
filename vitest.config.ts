import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        setupFiles: ['./mongo-memory-server.ts'],
    },
});