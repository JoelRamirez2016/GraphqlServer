import * as client from './client/schema'; 
import * as terminal from './terminales/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'apollo-server';

export const typeDefs = mergeTypeDefs([
    client.typeDef, 
    terminal.typeDef, 
    gql`scalar Date`
])
export const resolvers = mergeResolvers([
    client.resolvers, 
    terminal.resolvers
])