import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import config from '../config/config';
import { context } from './app';
import schema from './schemas';

const server = new ApolloServer({  
  schema  
});  

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context
}).then(({url}) => console.log(`🚀 Server ready at: ${url}`));    