const { i18n } = require('./next-i18next.config');

module.exports = {
    i18n,
    basePath: process.env.NODE_ENV === 'production' ? '' : '',
    trailingSlash: true,
    env: {
        PUBLIC_URL: process.env.NODE_ENV === 'production' ? `/` : '/',
        APP_URL:
            process.env.NODE_ENV === 'production'
                ? 'http://localhost:3000/'
                : 'http://localhost:3000/',
        // APP_URL: process.env.NODE_ENV === 'production' ? 'https://d-themes.com/react/molla/' : 'http://localhost/'
    },
};
