export interface Event {
    _id: string;
    name: string;
    description: string;
    date: Date;  // Changed from string to Date
    location: string;
    createdDate: Date;  // Changed from string to Date
    active: boolean;
    AuthorizedIds: string[];
    authorizedType: 'community' | 'neighborhood';
}