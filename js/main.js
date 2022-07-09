import { router } from './router.js'
import { store } from './store/store.js'

import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'

const options = {
  template: `
        <section class="main" :style="appStyles">
            <app-header/>
            <router-view/>
            <app-footer/>
        </section>
    `,
  created() {},
  components: {
    appHeader,
    appFooter,
  },
  computed: {
    appStyles() {
      return {
        backgroundColor: this.prefs.bgColor,
        color: this.prefs.color,
      }
    },
    prefs() {
      return this.$store.state.user.prefs
    },
  },
}

const app = Vue.createApp(options)
app.use(router)
app.use(store)
app.mount('#app')
