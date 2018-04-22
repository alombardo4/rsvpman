export interface Party {
    _id?: string;
    key: string;
    hasRSVPd: boolean;
    people: Person[];
    rsvpNote?: string;
}

export interface Person {
    firstName: string;
    lastName: string;
    attending: boolean;
    _id?: string;
    rehearsal?: {
        invited: boolean,
        attending: boolean
    };
}
