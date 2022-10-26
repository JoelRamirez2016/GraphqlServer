import { getTerminal } from "../services/terminales.service";
import { addTransaction, getTransaction, getTransactions } from "../services/transaction.service";

export const typeDef = `#graphql
    enum Status {
        OK,
        REFUSED
    }
    type Transaction {
        id: String!
        terminal: Terminal!
        value: number!
        status: Status!
        createAt: Date!
    }

    type Query {
        Transactions: [Transaction]!
        Transaction(
            id: String!
        ): Transaction        
    }

    type Mutation {
        addTransaction(
            terminal: Terminal!
            value: number!
            status: Status!
        ): Transaction!        
    }
`;

export const resolvers = {
    Query: {
        terminales: () => getTransactions(),
        terminal: (_:any, args:any) => getTransaction(args.id),
    },    
    Mutation: {
        addTransactions: (_:any, args:any) => addTransaction(args),
    },
    Transactions: {
        terminal: (_: any) => getTerminal(_.id)
    }
}