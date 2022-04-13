import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
// import { VitePWA } from 'vite-plugin-pwa';
// import tdocPlugin from './plugin-tdoc';
// import pwaConfig from './pwaConfig';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
        '@docs': path.resolve(__dirname, './docs'),
        '@components': path.resolve(__dirname, './src/components'),
        '@common': path.resolve(__dirname, '../src/_common'),
      },
    },
    build: {
      outDir: '../_site',
    },
    server: {
      host: '0.0.0.0',
      port: 8892,
      open: '/',
      https: false,
      fs: {
        strict: false,
      },
    },
    plugins: [
      createVuePlugin({
        include: /(\.md|\.vue)$/,
        jsx: true,
      }),
      // tdocPlugin(),
      // VitePWA(pwaConfig),
    ],
  });
};
