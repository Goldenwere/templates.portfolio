import { createApp } from 'vue'
import { createPinia } from 'pinia'
import hljs from 'highlight.js'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import { headingSectionsExtension } from '@/src/utilities/marked'
import './main.sass'
import App from './main.vue'
import router from './router'

marked
.use(headingSectionsExtension() as any)
.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    console.log(language)
    return hljs.highlight(code, { language }).value;
  },
}))

createApp(App)
.use(router)
.use(createPinia())
.mount('#app')
