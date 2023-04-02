import Provider from '@/layouts/Provider.vue';
import {setupRouter} from '@/router';
import {createApp} from 'vue';
import 'virtual:windi.css';
import {setupStore} from '@/store';
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(Provider);
setupRouter(app);
setupStore(app);
app.use(ElementPlus)
app.mount('#app');
