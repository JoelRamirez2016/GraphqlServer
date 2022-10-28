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
        value: Int!
        status: Status!
        createAt: Date!
    }

    type Query {
        transactions: [Transaction]!
        transaction(
            id: String!
        ): Transaction        
    }

    type Mutation {
        addTransaction(
            terminalId: String!
            value: Int!
            status: Status!
        ): Transaction!        
    }
`;

export const resolvers = {
    Query: {
        transactions: () => getTransactions(),
        transaction: (_:any, args:any) => getTransaction(args.id)            
    },    
    Mutation: {
        addTransaction: (_:any, { terminalId, value, status }:any) => 
            getTerminal(terminalId).then(terminal => 
                terminal ? addTransaction({ value, status, terminal }) : null),
    },
    Transaction: {
        terminal: (_: any) => getTerminal(_.id)
    }
}