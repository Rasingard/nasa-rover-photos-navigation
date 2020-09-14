import Vue from 'vue'
import App from './components/App'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/scss/main.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  el: document.querySelector('#app') as Element,
  components: {App},
  render(h) {
    return h('App' /*, {attrs: {start: 100}}*/)
  }
})