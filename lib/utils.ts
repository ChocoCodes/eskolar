import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mapRecommendMatch: Record<string, string> = {
    strong: 'border-gold text-gold',
    good: 'border-blue-500 text-blue-600',
    fair: 'border-emerald-500 text-emerald-600',
    low: 'border-red-400 text-red-500'
};

export const mapStatus: Record<string, string> = {
    ongoing: 'bg-green-800',
    closed: 'bg-red-500'
};

export const formatDeadlineWithLocale = (dateString: string): string => {
    if (!dateString) return "N/A";

    const [year, month, day] = dateString.split('-').map(Number);
    
    // month - 1 because JavaScript months run from 0 (January) to 11 (December)
    const localDate = new Date(year, month - 1, day);

    return localDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

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

export type Scholarship = {
    programImg: string;
    programName: string;
    issuer: string;
    financialCoverage: string;
    status: string;
    eligibility: string;
    awardValue: number;
    deadline: string;
    cutoff: number;
    slots: number;
    tags: string[];
    eRecommendMatch: string;
};

export const toTitleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export type Message = {
    id?: string;
    session_id: string;
    sender: 'skolar' | 'bot';
    message: string;
    sent_at: string;
}