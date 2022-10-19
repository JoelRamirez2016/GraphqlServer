import { ApolloServer } from 'apollo-server'
// import { schema } from './models';
import { typeDefs, resolvers } from './models';

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    console.log(`Server listening in port ${url}`);
})