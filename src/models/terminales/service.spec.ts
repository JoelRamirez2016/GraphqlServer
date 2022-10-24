import { 
    addTerminal, 
    deleteTerminal, 
    getTerminal, 
    getTerminales,
    getTerminalesByClient, 
    updateTerminal 
} from "./service";
import { addClient } from "../client/service";

describe("Test Terminales Service", () => {    

    const clientPromise = addClient({name: "client test"});
    
    test("Test terminal create", () => {        
        const name = "test t";

        return clientPromise.then((u) => addTerminal({name, client: u}))
        .then((t) => {
            expect(t.name).toEqual(name)
            expect(getTerminalesByClient(t.client.id)).resolves.toContain(t) 
            return getTerminal(t.id)
        })
        .then((t) => {
            expect(t?.name).toEqual(name)      
            expect(getTerminales()).resolves.toContain(t)                                   
        });
        
    }, 30000);
    test("Test terminal update", () => {        
        const name1 = "test t1";
        const name2 = "test t2";

        return clientPromise.then((u) => addTerminal({name: name1, client: u}))
            .then((t) => updateTerminal({ ...t, name: name2 }))
            .then((t) => {
                if (t) {
                    expect(t.name).toEqual(name2)
                    expect(getTerminalesByClient(t.client.id)).resolves.toContain(t);
                } else {                
                    fail('terminal not found');
                }
            });
    }, 30000);
    test("Test terminal delete", () => {        
        const name = "test t";
        return clientPromise.then((u) => addTerminal({name, client: u}))
            .then((t) => deleteTerminal(t.id))
            .then((t) => {                                
                if (t) {
                    expect(t.name).toEqual(name);
                    expect(getTerminalesByClient(t.client.id)).resolves.not.toContain(t)   
                } else {                
                    fail('terminal not found');
                }
            });
    }, 30000);
    test("Test terminal update fail", () => {        
        const name1 = "test t1";
        const name2 = "test t2";

        return clientPromise.then((u) => addTerminal({name: name1, client: u}))
            .then((t) => updateTerminal({ ...t, name: name2, id: ""}))
            .then((t) => expect(t).toBeNull());
    }, 30000);
    test("Test terminal delete fail", () => {                              
        return expect(deleteTerminal("")).resolves.toBeNull();
    }, 30000);            
})