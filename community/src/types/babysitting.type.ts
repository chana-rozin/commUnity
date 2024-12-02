export interface Babysitting{
    _id: string;
    requesterId: string;
    babysitterId: string;
    date: Date;
    location: string;
    childrenNumber: number;
    ages: number[];
    AuthorizedIds: string[];
}

/*
Babysitter Request:
Requester ID
Babysitter ID
Date
Location
Number of children
Ages
Viewing permissions - A list of groups that can view the event
*/