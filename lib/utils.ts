import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IconType } from 'react-icons'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeSinceUpdate = (dateString: string): string => {
    const pastDate = new Date(dateString);
    const now = new Date();

    const msPerSecond = 1000;
    const msPerMinute = 60 * msPerSecond;
    const msPerHour = 60 * msPerMinute;
    const msPerDay = 24 * msPerHour;
    const msPerMonth = 30 * msPerDay;
    const msPerYear = 365 * msPerDay;

    const elapsed = now.getTime() - pastDate.getTime();

    if (elapsed < msPerMinute) {
        const seconds = Math.round(elapsed / msPerSecond);
        return seconds <= 5 ? 'just now' : `${seconds} seconds ago`;
    }

    if (elapsed < msPerHour) {
        const minutes = Math.round(elapsed / msPerMinute);
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }

    if (elapsed < msPerDay) {
        const hours = Math.round(elapsed / msPerHour);
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }

    if (elapsed < msPerMonth) {
        const days = Math.round(elapsed / msPerDay);
        return days === 1 ? '1 day ago' : `${days} days ago`;
    }

    if (elapsed < msPerYear) {
        const months = Math.round(elapsed / msPerMonth);
        return months === 1 ? '1 month ago' : `${months} months ago`;
    }

    const years = Math.round(elapsed / msPerYear);
    return years === 1 ? '1 year ago' : `${years} years ago`;
}

export type SocialLink = {
  url: string;
  platform: "facebook" | "linkedin" | "github";
}

export type GrantType = "Full Grant" | "Partial Grant" | "Financial Assistance";

export type ScholarshipFilters = {
    location?: string;
    financialCoverage?: GrantType[];
    school?: string;
    course?: string;
    cutoffMax?: number | null;
    eRecommendMatch?: string;
    deadline?: string;
}

