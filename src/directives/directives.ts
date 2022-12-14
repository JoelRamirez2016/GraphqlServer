import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import ConstraintDirective  from 'graphql-constraint-directive'

interface Directive {
    typeDefs: string
    transformer: Function
}
export const isLoggedInDirective = (directiveName: string) : Directive => {
    return {
        typeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
        transformer: (schema: GraphQLSchema) => mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                const directive = getDirective(schema, fieldConfig, directiveName);

                if (directive) {
                    const { resolve = defaultFieldResolver } = fieldConfig;
                    
                    fieldConfig.resolve = async (_: any, args: any, context: any, info: any ) => {                        
                        const u = await context.currentUser;

                        if (!u) { 
                            throw new GraphQLError("USER NOT FOUND");                    
                        }
                        
                        return resolve(_, args, context, info);
                    }
                }
                return fieldConfig;
            }
        })
    }
}

export const constraintDirective = () : Directive => {
    return {
        typeDefs: ConstraintDirective.constraintDirectiveTypeDefs,
        transformer: ConstraintDirective.constraintDirective()
    }
}
// export const CanDirective = (directiveName: string) : Directive => {
//     return {
//         typeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
//         transformer: (schema: GraphQLSchema) => mapSchema(schema, {
//             [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
//                 const directive = getDirective(schema, fieldConfig, directiveName);
//                 const permission = null
//                 console.log(directive);
//                 if (directive) {
//                     const { resolve = defaultFieldResolver } = fieldConfig;
                    
//                     fieldConfig.resolve = (_: any, args: any, context: any, info: any ) => {                        
//                         if (!context.currentUser.hasPermission(permission)) { 
//                             throw new GraphQLError("Unauthorized");                    
//                         }
//                         return resolve(_, args, context, info);
//                     }
//                 }
//                 return fieldConfig;
//             }
//         })
//     }
// }