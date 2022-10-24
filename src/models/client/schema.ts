import { gql } from "apollo-server";
import { addClient, deleteClient, getClient, getClients, updateClient } from "./service";
import { getTerminalesByClient } from "../terminales/service";

export const typeDef = gql`
    type Client {
        id: String!
        name: String!
        createAt: Date!
        terminales: [Terminal]!
    }

    type Query {
        clients: [Client]! 
        client(
            id: String!
        ): Client
        clientCount: Int!
    }
    type Mutation {
        addClient(
            name: String!
        ): Client!
        updateClient(
            id: String!
            name: String!
        ): Client
        deleteClient(
            id: String!
        ): Client
    }
`;

export const resolvers = {
    Query: {
        clients: () => getClients(),
        client: (_:any, args:any) => getClient(args.id),  
        clientCount: () => getClients().then((clients) => clients.length)
    },
    Mutation: {
        addClient: (_:any, args:any) => addClient(args),
        updateClient: (_:any, args:any) => updateClient(args),
        deleteClient: (_:any, args:any) => deleteClient(args.id)
    },
    Client: {
        terminales: (_:any) => getTerminalesByClient(_.id)
    }        
};