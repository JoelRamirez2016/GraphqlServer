import * as user from './user/schema'; 
import * as terminal from './terminales/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'apollo-server';

export const typeDefs = mergeTypeDefs([
    user.typeDef, 
    terminal.typeDef, 
    gql`scalar Date`
])
export const resolvers = mergeResolvers([
    user.resolvers, 
    terminal.resolvers
])