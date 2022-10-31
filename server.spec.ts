// we import a function that we wrote to create a new instance of Apollo Server
import { starServer } from './server';
import request from 'supertest';
import { ApolloServer } from '@apollo/server';

// this is the query for our test
const LOGIN_DATA = {
    query: `mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        } 
    }`,
    variables: { username: "test", password: "test" },
};
const CREATE_CLIENT_DATA = {
    query: `mutation AddClient($addClientName: String!){
        addClient(name: $addClientName) {
            id
        }
    }`,
    variables: { addClientName: "test" },
}
const QUERY_CLIENTS = {
    query: `query Clients {
        clients {
            id
        }
    }`
}
describe('e2e demo', () => {
    let server: ApolloServer;
    let url: string;

    // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
        ({ server, url } = await starServer(5000));
    });

    // after the tests we'll stop the server
    afterAll(async () => {
        await server?.stop();
    });

    test('login', async () => {
        // send our request to the url of the test server
        const response = await request(url).post('/').send(LOGIN_DATA);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.login.value).toBeNull();
    });
    test('create client', async () => {
        // send our request to the url of the test server
        const response = await request(url).post('/').send(CREATE_CLIENT_DATA);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.addClient.id).toBeDefined();
    });
    test('query clients', async () => {
        // send our request to the url of the test server
        const response = await request(url).post('/').send(QUERY_CLIENTS);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.clients).toBeDefined();
    });
});