export interface Loan{
    id: string;
    lenderID: string;
    borrowerID: string;
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