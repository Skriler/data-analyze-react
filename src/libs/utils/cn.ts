import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for combining and merging class names.
 *
 * @param inputs - A list of class values (strings, objects, arrays, etc.)
 * @returns A single, merged class string with conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
