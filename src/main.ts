import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import{ElUpload,ElButton}from 'element-plus'
import * as ElementPlusIconsVue from'@element-plus/icons-vue'


const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(ElementPlus)// 引用ElemenyPlus
app.use(ElUpload)
app.use(ElButton)
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}
app.mount('#app')
