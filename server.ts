import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { context } from './src/context';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import schema from './src/schemas';

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({  
    schema,
    formatError: ({message, locations, path}) => {
        return { message, locations, path }      
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
        async serverWillStart() {
            return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
                };
            },
        }
    ]
});  

export const starServer = async (port: number) => {
    await server.start();
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));  

    app.use('/', cors<cors.CorsRequest>(), json(), expressMiddleware(server, {
        context
    }));

    return { server, url: `http://localhost:${port}/`};
}