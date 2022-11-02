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
const CREATE_TERMINAL_DATA = {
    query: `mutation AddTerminal($terminalName: String!, $clientId: String!) {
        addTerminal(name: $terminalName, clientId: $clientId) {
            id
            name
        }
    }`,
    variables: { terminalName: "test", clientId: "test "}
}
const DELETE_CLIENT_DATA = {
    query:`mutation DeleteClient($deleteClientId: String!) {
        deleteClient(id: $deleteClientId) {
            id
            name                  
        }
    }`,
    variables: { deleteClientId: "test" },
};
const UPDATE_CLIENT_DATA = {
    query: `mutation UpdateClient($updateClientId: String!, $name: String!) {
        updateClient(id: $updateClientId, name: $name) {
            id
            name
        }
    }`,
    variables: { updateClientId: "test", name: "test" },
}

const QUERY_CLIENTS = {
    query: `query Clients {
        clients {
            id
        }
    }`
}
const QUERY_CLIENT = {
    query: `query Client($clientId: String!) {
        client(id: $clientId) {
            id
            name
            terminales {
                id
            }
        }      
    }`,
    variables: { clientId: "test" },
}
const QUERY_CLIENTCOUNT = {
    query: `query ClientCount {
        clientCount
    }`,    
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
        expect(response.body.data?.login).toBeNull();
    });
    test('client operations success', async () => {
        // send our request to the url of the test server
        let response = await request(url).post('/').send(CREATE_CLIENT_DATA);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.addClient.id).toBeDefined();

        const idClient = response.body.data?.addClient.id

        CREATE_TERMINAL_DATA.variables.clientId = idClient;

        response = await request(url).post('/').send(CREATE_TERMINAL_DATA);
        
        expect(response.error).toBeFalsy();
        expect(response.body.data?.addTerminal.id).toBeDefined();
        

        QUERY_CLIENT.variables.clientId = idClient;

        response = await request(url).post('/').send(QUERY_CLIENT);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.client).toBeDefined();
        expect(response.body.data?.client.terminales).toHaveLength(1);
        
        response = await request(url).post('/').send(QUERY_CLIENTCOUNT);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.clientCount).toBe(1);
        
        response = await request(url).post('/').send(QUERY_CLIENTS);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.clients).toHaveLength(1);

        const newName = "updated";

        UPDATE_CLIENT_DATA.variables.updateClientId = idClient;
        UPDATE_CLIENT_DATA.variables.name = newName;

        response = await request(url).post('/').send(UPDATE_CLIENT_DATA);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.updateClient).toHaveProperty("name", newName);        

        DELETE_CLIENT_DATA.variables.deleteClientId = idClient;

        response = await request(url).post('/').send(DELETE_CLIENT_DATA);

        expect(response.error).toBeFalsy();
        expect(response.body.data?.deleteClient).toHaveProperty("name", newName);

    }, 30000);
});