import { addClient, deleteClient, getClient, getClients, updateClient } from "./service";

describe("Test Client Service", () => {     
    test("Test client create", () => {        
        const clientname = "test u";
        return addClient({clientname})
            .then((c) => {
                expect(c.clientname).toEqual(clientname)
                return getClient(c.id)
            })
            .then((c) => {
                expect(c?.clientname).toEqual(clientname)
                expect(getClients()).resolves.toContain(c)
            });
    }, 30000);
    test("Test client update", () => {        
        const clientname1 = "test u1";
        const clientname2 = "test u2";

        return addClient({clientname: clientname1})
            .then((c) => updateClient({ ...c, clientname: clientname2 }))
            .then((c) => expect(c?.clientname).toEqual(clientname2));
    }, 30000);
    test("Test client delete", () => {
        const clientname = "test u";
        return addClient({clientname})
            .then((c) => deleteClient(c.id))
            .then((c) => expect(c?.clientname).toEqual(clientname));
    }, 30000);
    test("Test client update fail", () => {        
        const clientname1 = "test u1";
        const clientname2 = "test u2";

        return addClient({clientname: clientname1})
            .then((c) => updateClient({ ...c, clientname: clientname2, id: ""}))
            .then((c) => expect(c).toBeNull());
    }, 30000);
    test("Test client delete fail", () => {                
        return expect(deleteClient("")).resolves.toBeNull();
    }, 30000);
})