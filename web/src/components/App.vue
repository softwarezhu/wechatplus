<template>
    <div id="app">
        <router-view>
            123123
        </router-view>
    </div>

</template>

<script>
    import Login from './LoginView.vue'

    export default {
        name: 'app',
        data() {
            return {
                name: 'wechat+',
            }
        },

        events: {},

        components: [Login]
    }

</script>
