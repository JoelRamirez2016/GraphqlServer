import * as client from './client'; 
import * as terminal from './terminal';
import * as user from './user';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { isLoggedInDirective } from '../directives/directives';

const directives = [
    isLoggedInDirective('isLoggedIn'),
]

const typeDefs = mergeTypeDefs([
    client.typeDef, 
    terminal.typeDef, 
    user.typeDef,
    gql`scalar Date`,    
    ... directives.map((d) => d.typeDefs)
])

const resolvers = mergeResolvers([
    client.resolvers, 
    terminal.resolvers,
    user.resolvers
])

export const schema = directives.map((d) => d.transformer)
    .reduce((curSchema, transformer) =>
        transformer(curSchema), makeExecutableSchema({typeDefs, resolvers}));