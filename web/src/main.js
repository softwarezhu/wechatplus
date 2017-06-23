import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';

import router from './router'
import store from './store'

import App from './components/App.vue'

Vue.use(BootstrapVue)

let vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        console.log('started')
        this.$store.dispatch('wechatStart');
    }
})
