import { gql } from "apollo-server";
import { addTerminal, getTerminal, getTerminales } from "./service";

export const typeDef = gql`
    type Terminal {
        id: String!
        name: String!        
        createAt: Date!       
        User: User!
    }

    type Query {
        terminales: [Terminal]!
        terminal(
            id: String!
        ): Terminal
        terminalCount: Int!
    }

    type Mutation {
        addTerminal(
            name: String!,
            userId: String!
        ): Terminal!
    }
`;

export const resolvers = {
    Query: {
        terminales: () => getTerminales(),
        terminal: (_:any, args:any) => getTerminal(args.id),
        terminalCount: () => getTerminales().then((terminales) => terminales.length) 
    },    
    Mutation: {
        addTerminal: (_:any, args:any) => addTerminal(args)
    }
}