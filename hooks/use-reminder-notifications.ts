"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { formatTimeToAMPM } from '@/lib/utils';

interface Reminder {
  name: string;
  time: string;
}

// The hook will now return an object with a function to unlock audio
export function useReminderNotifications(reminders: { mother: Reminder[], child: Reminder[] }) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false); // Track if user has interacted
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const remindersRef = useRef(reminders);
  remindersRef.current = reminders;

  // Initialize the Audio object once
  useEffect(() => {
    audioRef.current = new Audio('/alarm.mp3');
    audioRef.current.loop = false; // Ensure it only plays once per notification
  }, []);

  // Function to unlock audio context after a user click
  const unlockAudio = useCallback(() => {
    if (isAudioUnlocked || !audioRef.current) return;

    // This is the key part: play and immediately pause a silent sound on user interaction
    audioRef.current.muted = true;
    audioRef.current.play().then(() => {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
      audioRef.current!.muted = false;
      setIsAudioUnlocked(true);
      console.log("Audio unlocked by user interaction.");
    }).catch(e => console.error("Could not unlock audio:", e));
  }, [isAudioUnlocked]);

  // Request notification permission
  useEffect(() => {
    if (!('Notification' in window)) return;
    Notification.requestPermission((status) => setPermission(status));
  }, []);

  // The main interval for checking reminders
  useEffect(() => {
    if (permission !== 'granted') return;

    const intervalId = setInterval(() => {
      const now = new Date();
      // Check for the first second of the minute
      if (now.getSeconds() !== 0) return;

      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const allReminders = [...remindersRef.current.mother, ...remindersRef.current.child];

      for (const reminder of allReminders) {
        if (reminder.time === currentTime) {
          const formattedTime = formatTimeToAMPM(reminder.time);
          
          // Only play sound if audio has been unlocked by the user
          if (isAudioUnlocked) {
            audioRef.current?.play().catch(e => console.error("Audio play failed:", e));
          } else {
            console.warn("Audio is locked. Notification shown without sound.");
          }

          new Notification('Medicine Reminder', {
            body: `It's ${formattedTime}! Time to take: ${reminder.name}`,
            icon: '/placeholder-logo.png',
            requireInteraction: true // Keeps notification visible until dismissed
          });
        }
      }
    }, 1000); // Check every second for more accuracy

    return () => clearInterval(intervalId);
  }, [permission, isAudioUnlocked]);

  // Return the unlock function so the component can call it
  return { unlockAudio };
}