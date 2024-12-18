export interface MinyanCardProps {
    location: string;
    time: string;
    attendeeCount: number;
    totalCount: number;
    hasMinyan: boolean;
    iconSrc: string;
}

export interface PrayerSectionProps {
    title: string;
    minyans: MinyanCardProps[];
}