import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import WindiCSS from 'vite-plugin-windicss';
import Pages from 'vite-plugin-pages';
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        WindiCSS(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Icons({
            autoInstall: true,
        }),
        Components({
            resolvers: [IconsResolver({}), ElementPlusResolver()],
        }),
        Pages({
            extendRoute(route, parent) {
                if (route.name != undefined && route.name.indexOf('admin') != -1) {
                    const title = route.name.replace('admin-', '');
                    return {
                        ...route,
                        meta: {admin: true, auth: true, title: title},
                    };
                }
                if (route.path.indexOf('/profile') == -1) {
                    return route;
                }

                // Augment the route with meta that indicates that the route requires authentication.
                return {
                    ...route,
                    meta: {auth: true, admin: false},
                };
            },
        }),
    ],
    server: {
        fs: {
            strict: false,
        },
        host: '127.0.0.1',
        port: 3000,
        open: true,
        proxy: {
            '/baiduApi': {
                target: 'https://aip.baidubce.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/baiduApi/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
