import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import JSConfetti from 'js-confetti'

const app = createApp(App)

app.use(router)


app.mount('#app')

export async function showConfetti() {
    const jsConfetti = new JSConfetti()
    
    jsConfetti.addConfetti().then(() => {
      jsConfetti.clearCanvas()
    })
}
