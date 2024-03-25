import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 兼容低版本浏览器
    legacy({
      targets: ['Chrome 63'],
      modernPolyfills: true
    }),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src') + '/'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/mixin.scss";` // 此处全局的scss文件
      }
    }
  },
  server: {
    cors: true,
    proxy: {
      // '/api/ws':{
      //   target: 'http://127.0.0.1:8080',
      //   changeOrigin:true,
      //   rewrite: (path) => path.replace('/^/api/ws','/api/ws')
      // },
      // '/api': {
      //   target: "http://120.27.12.238:8090",
      //   changeOrigin: true,
      //   logLevel: 'debug', //查看请求地址
      //   xfwd: false,
      //   pathRewrite: {
      //     '^/api': '/api'
      //   },
      // }
    },
  }
})
