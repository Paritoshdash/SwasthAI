"use client";

import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const scriptId = 'google-translate-script';

    const googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          // ✨ NEW: Comprehensive list of Indian language codes
          includedLanguages: 'en,hi,as,bn,bho,gu,kn,ks,kok,mai,ml,mni,mr,ne,or,pa,sa,sd,ta,te,ur',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      document.body.appendChild(script);
      (window as any).googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }}></div>;
};

export default GoogleTranslate;