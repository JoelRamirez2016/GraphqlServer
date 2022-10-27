import { addUser, deleteUser, getUser, getUsers, login, updateUser } from "../services/user.service";
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub();
const USER_CONSULTED = "userConsulted";

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

    type Subscription {
        userConsulted: User!
    }
`;

export const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_:any, args:any) => getUser(args.id)
            .then((u) => {
                if (u) {
                    pubsub.publish(USER_CONSULTED, { userConsulted: u });
                }
                return u;
            }),
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
            subscribe: () => pubsub.asyncIterator(USER_CONSULTED),
        }
    },  
};