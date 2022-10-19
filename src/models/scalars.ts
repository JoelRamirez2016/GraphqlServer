import { GraphQLScalarType, Kind } from "graphql";

export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize: (value: any) : string => {
        return value.toLocaleDateString("en-US"); // Convert outgoing Date to integer for JSON
    },
    parseValue: (value: any): Date => {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral: (ast: any): Date | null =>{
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});
