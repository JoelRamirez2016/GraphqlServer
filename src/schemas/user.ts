import { addUser, deleteUser, getUser, getUsers, login, updateUser } from "../services/user.service";
import { pub, PUB_KEYS, register } from "./publisher";

export const typeDef = `#graphql
    type User {
        id: String!
        name: String!
        email: String! 
        username: String!
        password: String!
        createAt: Date!
    }
    input UserInput {
        id: String @constraint(minLength: 5)
        name: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 150)
        email: String! @constraint(format: "email", maxLength: 100)
        username: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 100)
        password: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 100)      
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
            input: UserInput!
        ): User! @isLoggedIn
        updateUser(
            id: String!
            name: String!
            email: String!
            username: String!
            password: String!
        ): User!
        deleteUser(
            id: String!
        ): User! 
        login(
            username: String!
            password: String!
        ): Token
    }
    type Subscription {
        userConsulted: User!
    }
`;

export const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_:any, args:any) => pub(PUB_KEYS.USER_CONSULTED, getUser(args.id)),
        userCount: () => getUsers().then((users) => users.length),
        me: (_:any, _args:any, {currentUser}:any) => currentUser
    },
    Mutation: {
        addUser: (_:any, {input}:any) => addUser(input),
        updateUser: (_:any, args:any) => updateUser(args),
        deleteUser: (_:any, args:any) => deleteUser(args.id),
        login: (_:any, args:any) => login(args)
    },    
    Subscription:{
        userConsulted:{
            subscribe: () => register(PUB_KEYS.USER_CONSULTED),
        }
    },  
};