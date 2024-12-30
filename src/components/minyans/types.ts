export interface MinyanCardProps {
    location: string;
    time: string;
    attendeeCount: number;
    totalCount: number;
    hasMinyan: boolean;
    iconSrc: string;
    type:MinyanTypes
}

export interface PrayerSectionProps {
    title: string;
    minyans: MinyanCardProps[];
    type: MinyanTypes;
}
export enum MinyanTypes{
    regular = 'קבוע',
    temporary = 'מזדמן'
}