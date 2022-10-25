import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { gql } from 'apollo-server';
import { defaultFieldResolver, DocumentNode, GraphQLError, GraphQLSchema } from 'graphql';

interface Directive {
    typeDefs: DocumentNode
    transformer: Function
}
export const isLoggedInDirective = (directiveName: string) : Directive => {
    return {
        typeDefs: gql`directive @${directiveName} on FIELD_DEFINITION`,
        transformer: (schema: GraphQLSchema) => mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                const directive = getDirective(schema, fieldConfig, directiveName);

                if (directive) {
                    const { resolve = defaultFieldResolver } = fieldConfig;
                    
                    fieldConfig.resolve = (_: any, args: any, context: any, info: any ) => {                        
                        if (!context.currentUser) { 
                            throw new GraphQLError("Unauthenticated");                    
                        }
                        return resolve(_, args, context, info);
                    }
                }
                return fieldConfig;
            }
        })
    }
}
  