const path = require('path');
const i18n = require('i18n');

i18n.configure({
  locales: [
    'pt-BR',
    'en-US',
  ],
  fallbacks: {
    pt: 'pt-BR',
    en: 'en-US',
  },
  defaultLocale: 'pt-BR',
  directory: path.join(__dirname, 'locales'),
  register: global,
});

module.exports = i18n;
