import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishLang from './lang/en.json';
import arabicLang from './lang/ar.json';

const resources = {
  ENG: {
    translation: englishLang,
  },
  العربية: {
    translation: arabicLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ENG', // default language to use
    

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
