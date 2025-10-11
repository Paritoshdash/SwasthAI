import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * NEW FUNCTION: Converts a 24-hour time string (e.g., "17:30") 
 * to a 12-hour AM/PM format (e.g., "5:30 PM").
 * @param timeString The time string in "HH:mm" format.
 * @returns The formatted time string.
 */
export function formatTimeToAMPM(timeString: string) {
  // Return an empty string if the input is invalid
  if (!timeString || !timeString.includes(':')) return "";

  const [hourString, minute] = timeString.split(":");
  const hour = parseInt(hourString, 10);
  
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Converts "0" or "12" to "12"

  return `${formattedHour}:${minute} ${ampm}`;
}