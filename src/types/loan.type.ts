export interface Loan{
    _id: string;
    lenderId?: string;
    borrowerId: string;
    item: string;
    createdDate: Date;
    LoanDate: Date;
    active: boolean;
    AuthorizedIds: string[];
}
/*
השאלה:
ID משאיל?
ID שואל
פריט
תאריך פרסום
תאריך השאלה
פעיל

*/