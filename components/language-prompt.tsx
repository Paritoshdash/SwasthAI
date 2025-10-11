'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// ✨ NEW: Expanded map of supported languages for the prompt
const supportedLangs = {
    'hi': 'हिन्दी (Hindi)',
    'as': 'অসমীয়া (Assamese)',
    'bn': 'বাংলা (Bengali)',
    'bho': 'भोजपुरी (Bhojpuri)',
    'gu': 'ગુજરાતી (Gujarati)',
    'kn': 'ಕನ್ನಡ (Kannada)',
    'ks': 'कश्मीरी (Kashmiri)',
    'kok': 'कोंकणी (Konkani)',
    'mai': 'मैथिली (Maithili)',
    'ml': 'മലയാളം (Malayalam)',
    'mni': 'মৈতৈলোন্ (Manipuri)',
    'mr': 'मराठी (Marathi)',
    'ne': 'नेपाली (Nepali)',
    'or': 'ଓଡ଼ିଆ (Odia)',
    'pa': 'ਪੰਜਾਬੀ (Punjabi)',
    'sa': 'संस्कृतम् (Sanskrit)',
    'sd': 'सिन्धी (Sindhi)',
    'ta': 'தமிழ் (Tamil)',
    'te': 'తెలుగు (Telugu)',
    'ur': 'اردو (Urdu)',
};

export function LanguagePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [detectedLang, setDetectedLang] = useState<{ code: string; name: string } | null>(null);

  useEffect(() => {
    const promptShown = localStorage.getItem('languagePromptShown');
    if (promptShown) {
      return;
    }

    const userLangCode = navigator.language.split('-')[0];

    if (userLangCode in supportedLangs) {
      setDetectedLang({
        code: userLangCode,
        name: supportedLangs[userLangCode as keyof typeof supportedLangs],
      });
      setShowPrompt(true);
    } else {
      localStorage.setItem('languagePromptShown', 'true');
    }
  }, []);

  const handleLanguageChange = () => {
    if (!detectedLang) return;
    document.cookie = `googtrans=/en/${detectedLang.code}; path=/`;
    localStorage.setItem('languagePromptShown', 'true');
    setShowPrompt(false);
    window.location.reload();
  };

  const handleClose = () => {
    localStorage.setItem('languagePromptShown', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt || !detectedLang) {
    return null;
  }

  return (
    <AlertDialog open={showPrompt} onOpenChange={setShowPrompt}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Language?</AlertDialogTitle>
          <AlertDialogDescription>
            It looks like you prefer {detectedLang.name}. Would you like to switch the site to this language?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>No, Stay in English</AlertDialogCancel>
          <AlertDialogAction onClick={handleLanguageChange}>
            Yes, Switch Language
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}