import { Address } from "./general.type";

export interface Babysitting{
    _id: string;
    requester: {_id: string, first_name: string, last_name: string};
    babysitter?: {_id: string, first_name: string, last_name: string};
    date: Date;
    time: {start: string, end: string}
    address: Address;
    childrenNumber: number;
    ageRange: string;
    notes: string;
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