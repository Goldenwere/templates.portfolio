import { createApp } from 'vue'
import { createPinia } from 'pinia'
import hljs from 'highlight.js'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import { headingSectionsExtension } from '@/src/utilities/marked'
import './main.sass'
import App from './main.vue'
import router from './router'
import { ModalService } from './components/services/modal'

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

createApp(App)
.use(router)
.use(createPinia())
.mount('#app')
