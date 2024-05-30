import { BrazilTheme, MyDarkTheme, MyLightTheme } from "./components/MyTheme"

export default {
    AppName: 'BJJ Universe',
    API_SECRET: 'AQIp+raLdMi0r0EuMbss1lXf66sCe36/8q4gc/h40uw=',
    ServerBaseURL: 'https://web.bjjuniverse.app',
    DeepLink: 'bjjuniverse://',
    APIEndpoint: '/api',
    environment: 'DEVELOPMENT',
    debug: true,
    default_lang: 'en',
    defaultParticipantAvatar: 'https://web.bjjuniverse.app/assets/img/participant.jpg',
    defaultUserAvatar: 'https://web.bjjuniverse.app/assets/img/user.png',
    maxPlaylistQueue: 10,
    themeFile: '/theme.config',
    themes: {
        'DARK': MyDarkTheme,
        'LIGHT': MyLightTheme,
        'BRAZIL': BrazilTheme,
    },
}

Global = {
    theme: 'DARK'
}