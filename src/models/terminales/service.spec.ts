import { 
    addTerminal, 
    deleteTerminal, 
    getTerminal, 
    getTerminales,
    getTerminalesByUser, 
    updateTerminal 
} from "./service";
import { addUser } from "../user/service";

describe("Test Terminales Service", () => {    

    const userPromise = addUser({username: "user test"});
    
    test("Test terminal create", () => {        
        const name = "test t";

        return userPromise.then((u) => addTerminal({name, user: u}))
        .then((t) => {
            expect(t.name).toEqual(name)
            expect(getTerminalesByUser(t.user.id)).resolves.toContain(t) 
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

        return userPromise.then((u) => addTerminal({name: name1, user: u}))
            .then((t) => updateTerminal({ ...t, name: name2 }))
            .then((t) => {
                if (t) {
                    expect(t.name).toEqual(name2)
                    expect(getTerminalesByUser(t.user.id)).resolves.toContain(t);
                } else {                
                    fail('terminal not found');
                }
            });
    }, 30000);
    test("Test terminal delete", () => {        
        const name = "test t";
        return userPromise.then((u) => addTerminal({name, user: u}))
            .then((t) => deleteTerminal(t.id))
            .then((t) => {                                
                if (t) {
                    expect(t.name).toEqual(name);
                    expect(getTerminalesByUser(t.user.id)).resolves.not.toContain(t)   
                } else {                
                    fail('terminal not found');
                }
            });
    }, 30000);
    test("Test terminal update fail", () => {        
        const name1 = "test t1";
        const name2 = "test t2";

        return userPromise.then((u) => addTerminal({name: name1, user: u}))
            .then((t) => updateTerminal({ ...t, name: name2, id: ""}))
            .then((t) => expect(t).toBeNull());
    }, 30000);
    test("Test terminal delete fail", () => {                              
        return expect(deleteTerminal("")).resolves.toBeNull();
    }, 30000);            
})