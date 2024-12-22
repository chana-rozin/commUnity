import { UserInLoan } from './general.type'
export interface Loan{
    _id: string;
    lender?: UserInLoan;
    borrower: UserInLoan;
    item: string;
    createdDate: Date;
    LoanDate: Date | null;
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