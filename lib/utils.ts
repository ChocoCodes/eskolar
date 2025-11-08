import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IconType } from 'react-icons'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type SocialLink = {
  url: string;
  platform: "facebook" | "linkedin" | "github";
}