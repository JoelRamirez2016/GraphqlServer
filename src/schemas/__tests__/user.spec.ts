import { resolvers } from "../user";

describe("Test User Rosolvers", () => {     
    const Query = resolvers.Query;
    const Mutation = resolvers.Mutation;

    Query.users;
    Query.user
    Query.userCount
    Query.me 
    Mutation.addUser
    Mutation.updateUser
    Mutation.deleteUser
    Mutation.login
})