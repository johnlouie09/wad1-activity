import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import mdi-icons CSS
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                // Define your light theme colors here
            },
            dark: {
                // Define your dark theme colors here
            },
        },
    },
    // Add this to specify mdi as the icon font
    icons: {
        iconfont: 'mdi',
    }
})

createApp(App).use(vuetify).mount('#app');
