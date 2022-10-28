import { Status } from "../../models/transaction";
import { addClient } from "../client.service";
import { addTerminal } from "../terminales.service";
import { addTransaction, getTransaction, getTransactions } from "../transaction.service";

describe("Test Transaction Service", () => {     
    const TerminalPromise = addClient({name: "transaction test"})
        .then(c => addTerminal({name:"test t", client: c}));

    test("Test transaction create", () => {        
        const value = 100;
        const status = Status.OK;
        
        return TerminalPromise.then(terminal => {
                const promise = addTransaction({value, status, terminal});
                expect(promise).resolves.toMatchObject(
                    {value, status, terminal}
                );
                return promise;
            }).then(t => {                
                expect(getTransaction(t.id)).resolves.toEqual(t);
                return expect(getTransactions()).resolves.toContain(t);                
            });                
    }, 30000);
})