import { getClient } from "../services/client.service"
import { addTerminal, deleteTerminal, getTerminal, getTerminales, updateTerminal } from "../services/terminales.service";

export const typeDef = `#graphql
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
        terminalCount: () => getTerminales().then((ts) => ts.length) 
    },    
    Mutation: {
        addTerminal: (_:any, { clientId, name }:any) => getClient(clientId)
            .then(client => {
                if (!client) {
                    throw new Error("CLIENT NOT FOUND");                    
                }
                return addTerminal({name, client});
            }),
        updateTerminal: (_: any, args: any) => updateTerminal(args),
        deleteTerminal: (_: any, args: any) => deleteTerminal(args.id)
    },
    Terminal: {
        client: (_: any) => getClient(_.id)
    }
}