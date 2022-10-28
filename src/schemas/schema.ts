import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, isLoggedInDirective } from '../directives/directives';
import * as client from './client'; 
import * as terminal from './terminal';
import * as user from './user';
import * as transaction from './transaction';

const dateTypeDef = `#graphql 
    scalar Date
`;

const directives = [
    isLoggedInDirective('isLoggedIn'),
    constraintDirective()
]

const typeDefs = mergeTypeDefs([
    client.typeDef, 
    terminal.typeDef, 
    user.typeDef,
    dateTypeDef,
    transaction.typeDef,
    ... directives.map((d) => d.typeDefs)
])

const resolvers = mergeResolvers([
    client.resolvers, 
    terminal.resolvers,
    user.resolvers,
    transaction.resolvers
])

export const schema = directives.map((d) => d.transformer)
    .reduce((curSchema, transformer) =>
        transformer(curSchema), makeExecutableSchema({typeDefs, resolvers,}));