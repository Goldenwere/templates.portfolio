import { createApp } from 'vue'
import { createPinia } from 'pinia'

import hljs from 'highlight.js'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import { headingSectionsExtension } from 'src/utilities/marked'
import './main.sass'
import App from './main.vue'
import { createRouter, pushAppRoutes } from './router'
import { ModalService } from './components/services/modal'
import { useStore } from './store'

marked
.use(headingSectionsExtension() as any)
.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
}))

ModalService.init(window)

const init = async () => {
  const router = createRouter()
  const instance = createApp(App)
    .use(createPinia())

  const store = useStore()
  const appData = await store.getAppData()
  pushAppRoutes(router, appData.routes)
  
  instance.use(router)
  instance.mount('#app')
}

init()
