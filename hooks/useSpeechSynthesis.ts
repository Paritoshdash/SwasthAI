"use client";

import { useState, useEffect, useCallback } from 'react';

// This function will be our single source of truth for getting voices
const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise(resolve => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    };
  });
};


export const useSpeechSynthesis = () => {
  const [isSupported, setIsSupported] = useState(false);
  // We no longer need to store voices in state here, we'll get them on demand.

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback(async (text: string, lang = 'en-US') => {
    if (!isSupported || !text) return;

    // Stop any speech that is currently happening
    window.speechSynthesis.cancel();

    // Get the list of voices, waiting if necessary
    const voices = await getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    // Find the best possible voice for the requested language
    const targetVoice = 
      voices.find(voice => voice.lang === lang) || // Exact match (e.g., 'hi-IN')
      voices.find(voice => voice.lang.startsWith(lang.split('-')[0])); // Partial match (e.g., 'hi')

    if (targetVoice) {
      utterance.voice = targetVoice;
    } else {
      console.warn(`No voice found for language: ${lang}. Using browser default.`);
    }

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  return { isSupported, speak };
};