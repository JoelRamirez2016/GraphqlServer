import { v4 } from "uuid";
import { Status, Transaction, TransactionCreateParams } from "../models/transaction"

const data: Transaction[] = [
    {
        id:"2",
        status: Status.OK,
        value: 200,
        terminal: {
            client:{
                id:"2",
                name: "2",
                createAt: new Date()
            },
            id: "2",
            name: "2",
            createAt: new Date()
        },
        createAt: new Date()
    },
    {
        id:"2",
        status: Status.OK,
        value: 200,
        terminal: {
            client:{
                id:"2",
                name: "2",
                createAt: new Date()
            },
            id: "2",
            name: "2",
            createAt: new Date()
        },
        createAt: new Date()
    },
    {
        id:"2",
        status: Status.OK,
        value: 200,
        terminal: {
            client:{
                id:"2",
                name: "2",
                createAt: new Date()
            },
            id: "2",
            name: "2",
            createAt: new Date()
        },
        createAt: new Date()
    },
]

export const getTransactions = () => {
    return data;
}
export const getTransaction = (id: string) => {
    return data.find((t) => t.id === id)
}
export const addTransaction = (tParams: TransactionCreateParams) => {
    const t = {... tParams, id: v4(), createAt: new Date()};
    
    data.push(t);

    return t;
}