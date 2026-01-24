import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Import des icônes

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#582900',   // Ton marron bois (Barre de navigation)
                    secondary: '#2E7D32', // Vert forêt (Boutons positifs)
                    accent: '#FBC02D',    // Jaune Or (Highlights)
                    background: '#F5F5F0', // Crème (Fond de page)
                    surface: '#FFFFFF',    // Blanc pur pour les cartes
                    error: '#D32F2F',
                },
            },
        },
    },
})

export default vuetify