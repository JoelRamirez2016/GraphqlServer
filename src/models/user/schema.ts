import { gql } from "apollo-server";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "./service";
import { v4 } from 'uuid';
import { getTerminalesByUser } from "../terminales/service";

export const typeDef = gql`
    type User {
        id: String!
        username: String!
        createAt: Date!
        terminales: [Terminal]!
    }

    type Query {
        users: [User]!
        user(
            id: String!
        ): User
        userCount: Int!
    }
    type Mutation {
        addUser(
            username: String!
        ): User!
        updateUser(
            id: String!
            username: String!
        ): User
        deleteUser(
            id: String!
        ): User
    }
`;

export const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_:any, args:any) => getUser(args.id),  
        userCount: () => getUsers().then((users) => users.length)
    },
    Mutation: {
        addUser: (_:any, args:any) => addUser(args),
        updateUser: (_:any, args:any) => getUser(args.id).then((u) => 
            u ? updateUser({ ... u, ... args }) : null
        ),
        deleteUser: (_:any, args:any) => deleteUser(args.id)
    },
    User: {
        terminales: (_:any) => getTerminalesByUser(_.id)
    }        
};