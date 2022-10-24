import { ApolloServer } from 'apollo-server'
import config from '../config/config';
import { sc } from './models';

const server = new ApolloServer({
    schema: sc,
    formatError: (err) => {
        console.log(err)
        return new Error("INTERNAL SERVER ERROR");
    }
});

server.listen(config.PORT).then(({url}) => {
    console.log(`Server listening in port ${url}`);
})