import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTranslation = (initialLang = 'en') => {
  const [lang, setLang] = useState(initialLang);
  const [translations, setTranslations] = useState({});

  const translate = async (text) => {
    if (lang === 'en') return text;
    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text,
        target: lang
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  return { lang, setLang, translate };
};
