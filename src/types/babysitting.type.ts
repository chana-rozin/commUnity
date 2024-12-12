import { Address } from "./general.type";

export interface Babysitting{
    _id: string;
    requester: {id: string, name: string};
    babysitter: {id: string, name: string};
    date: Date;
    time: {start: string, end: string}
    address: Address;
    childrenNumber: number;
    ageRange: string;
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