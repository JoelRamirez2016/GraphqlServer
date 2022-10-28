import { delay, lastValueFrom, of } from "rxjs";
import { v4 } from "uuid";
import { Transaction, TransactionCreateParams } from "../models/transaction"

const data: Transaction[] = [];

export const getTransactions = () => {
    return lastValueFrom(of(data).pipe(delay(3000)));
}
export const getTransaction = (id: string) => {
    return lastValueFrom(of(data.find((t) => t.id === id)).pipe(delay(3000)));
}
export const addTransaction = (tParams: TransactionCreateParams) => {
    const t = {... tParams, id: v4(), createAt: new Date()};
    
    data.push(t);

    return lastValueFrom(of( t ).pipe(delay(3000)));
}