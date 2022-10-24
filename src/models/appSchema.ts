import * as client from './client/schema'; 
import * as terminal from './terminales/schema';
import * as user from './users/schema';
import jwt from 'jsonwebtoken';
import { getUser } from './users/service';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'apollo-server';
import config from '../../config/config';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = mergeTypeDefs([
    client.typeDef, 
    terminal.typeDef, 
    user.typeDef,
    gql`scalar Date`,
    gql`
        directive @auth(
            role: String
        ) on FIELD_DEFINITION

    `
])
export const resolvers = mergeResolvers([
    client.resolvers, 
    terminal.resolvers,
    user.resolvers
])

export const context = ({ req }: any) => {
    const auth = req ? req.headers.authorization : null;

    if (!auth || !auth.toLocaleLowerCase().startsWith("bearer ")) {
        return null;
    }

    const decodeToken = jwt.verify(auth.substring(7), config.JWT_SECERT);
    const currentUser = getUser((<jwt.JwtPayload>decodeToken).id);
    return { currentUser };    
}

const authDirectiveTransformer = (schema: any, directiveName: any) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig: any) => {
            const authDirective = getDirective(schema, fieldConfig, directiveName);

            if (authDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig;
                const { role } = authDirective[0];
                
                fieldConfig.resolve = (_: any, args: any, context: any, info: any ) => {
                    const { currentUser } = context;

                    if (!currentUser) { 
                        throw new Error("Unauthenticated");                    
                    }
                    if (role !== "SUPERADMIN" && !currentUser.hasRole(role)) {
                        throw new Error("Unauthorized");                    
                    }
                    return resolve(_, args, context, info);
                }
            }
            return null;
        }
    })
};

export const schema = authDirectiveTransformer(
    makeExecutableSchema({typeDefs, resolvers}),
    "auth"
);