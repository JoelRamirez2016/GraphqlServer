import { gql } from "apollo-server";
import { getClient } from "../client/service";
import { addTerminal, deleteTerminal, getTerminal, getTerminales, updateTerminal } from "./service";

export const typeDef = gql`
    type Terminal {
        id: String!
        name: String!        
        createAt: Date!       
        client: Client!
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
            clientId: String!
        ): Terminal!
        updateTerminal(
            name: String!       
        ): Terminal!
        deleteTerminal(
            id: String!       
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
        addTerminal: (_:any, args:any) => addTerminal(args),
        updateTerminal: (_: any, args: any) => updateTerminal(args),
        deleteTerminal: (_: any, args: any) => deleteTerminal(args.id)
    },
    Terminal: {
        client: (_: any) => getClient(_.id)
    }
}