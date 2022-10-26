// npm install @apollo/server graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { context } from './app';
import schema from './schemas';

const server = new ApolloServer({  
  schema  
});  


startStandaloneServer(server, {
  listen: { port: 4000 },
  context
}).then(({url}) => console.log(`🚀 Server ready at: ${url}`));    