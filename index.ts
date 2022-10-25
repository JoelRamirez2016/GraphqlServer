import { ApolloServer } from 'apollo-server'
import { context } from './src/app';
import config from './config/config';
import schema from './src/schemas';

const server = new ApolloServer({
    schema,
    context,
    formatError: ({message, locations, path}) => {
        return {message, locations, path}
    }
});

server.listen(config.PORT).then(({url}) => {
    console.log(`Server listening in port ${url}`);
})