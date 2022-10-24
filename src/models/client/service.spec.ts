import { addClient, deleteClient, getClient, getClients, updateClient } from "./service";

describe("Test Client Service", () => {     
    test("Test client create", () => {        
        const name = "test u";
        return addClient({name})
            .then((c) => {
                expect(c.name).toEqual(name)
                return getClient(c.id)
            })
            .then((c) => {
                expect(c?.name).toEqual(name)
                expect(getClients()).resolves.toContain(c)
            });
    }, 30000);
    test("Test client update", () => {        
        const name1 = "test u1";
        const name2 = "test u2";

        return addClient({name: name1})
            .then((c) => updateClient({ ...c, name: name2 }))
            .then((c) => expect(c?.name).toEqual(name2));
    }, 30000);
    test("Test client delete", () => {
        const name = "test u";
        return addClient({name})
            .then((c) => deleteClient(c.id))
            .then((c) => expect(c?.name).toEqual(name));
    }, 30000);
    test("Test client update fail", () => {        
        const name1 = "test u1";
        const name2 = "test u2";

        return addClient({name: name1})
            .then((c) => updateClient({ ...c, name: name2, id: ""}))
            .then((c) => expect(c).toBeNull());
    }, 30000);
    test("Test client delete fail", () => {                
        return expect(deleteClient("")).resolves.toBeNull();
    }, 30000);
})