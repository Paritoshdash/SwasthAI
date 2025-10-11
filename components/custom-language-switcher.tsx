'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";

// ✨ NEW: Expanded list with all major Indian languages
const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'as', name: 'অসমীয়া (Assamese)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'bho', name: 'भोजपुरी (Bhojpuri)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ks', name: 'कश्मीरी (Kashmiri)' },
    { code: 'kok', name: 'कोंकणी (Konkani)' },
    { code: 'mai', name: 'मैथिली (Maithili)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'mni', name: 'মৈতৈলোন্ (Manipuri)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ne', name: 'नेपाली (Nepali)' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'sa', name: 'संस्कृतम् (Sanskrit)' },
    { code: 'sd', name: 'सिन्धी (Sindhi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ur', name: 'اردو (Urdu)' },
];

export function CustomLanguageSwitcher() {
  const changeLanguage = (langCode: string) => {
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onSelect={() => changeLanguage(lang.code)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}