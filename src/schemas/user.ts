import { PubSub } from '@apollo/server'
import { addUser, deleteUser, getUser, getUsers, login, updateUser } from "../services/user.service";

export const typeDef = `#graphql
    type User {
        id: String!
        name: String!
        email: String!
        username: String!
        password: String!
        createAt: Date!
    }

    type Token {
        value: String!
    }

    type Query {
        users: [User]! @isLoggedIn
        user(
            id: String!
        ): User
        userCount: Int!
        me: User
    }
    type Mutation {
        addUser(
            name: String!
            email: String!
            username: String!
            password: String!
        ): User!
        updateUser(
            id: String!
            name: String!
            email: String!
            username: String!
            password: String!
        ): User!
        deleteUser(
            id: String!
        ): User! #@auth(role: "ADMIN")
        login(
            username: String!
            password: String!
        ): Token
    }
`;

export const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_:any, args:any) => getUser(args.id),  
        userCount: () => getUsers().then((users) => users.length),
        me: (_:any, _args:any, {currentUser}:any) => currentUser
    },
    Mutation: {
        addUser: (_:any, args:any) => addUser(args),
        updateUser: (_:any, args:any) => updateUser(args),
        deleteUser: (_:any, args:any) => deleteUser(args.id),
        login: (_:any, args:any) => login(args)
    },    
    Subscription:{
        userConsulted:{
            subscribe: () => pubSub.asyncIterator
        }
    },  
};