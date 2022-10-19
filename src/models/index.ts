// import { userQuery, userMutation } from './user/schema';
// import { terminalQuery, terminalMutation } from './terminales/schema';
// import { GraphQLSchema } from 'graphql';
// import { mergeSchemas } from '@graphql-tools/schema';
import * as user from './user/schema'; 
import * as terminal from './terminales/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'apollo-server';

// const userSchema = new GraphQLSchema({
//     query: userQuery,
//     mutation: userMutation
// });
// const terminalSchema = new GraphQLSchema({
//     query: terminalQuery,
//     mutation: terminalMutation
// });

// export const schema = mergeSchemas({
//     schemas: [userSchema, terminalSchema]
// });

export const typeDefs = mergeTypeDefs([user.typeDef, terminal.typeDef, gql`scalar Date`])
export const resolvers = mergeResolvers([user.resolvers, terminal.resolvers])